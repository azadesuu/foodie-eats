const Review = require("../models/review");
const User = require("../models/user");
const Token = require("../models/token");

// get express-validator, to validate user data in forms
const expressValidator = require("express-validator");
const jwt = require("jsonwebtoken");
const passport = require("passport");
require("../config/passport")(passport);

const Joi = require("joi");
const sendEmail = require("../sendEmail.js");
const crypto = require("crypto");
const passwordComplexity = require("joi-password-complexity");
const bcrypt = require("bcrypt");

const loginUser = async (req, res, next) => {
  passport.authenticate("login", async (err, user, info) => {
    try {
      if (err) {
        res.status(500).json({
          success: false,
          message: "Error occured while logging in user."
        });
        return;
      } else if (!user) {
        return res.status(400).json({
          message: "No user was found with the given user/email"
        });
      } else {
        req.logIn(user, { session: false }, async error => {
          if (error) return next(error);

          const { _id, email, username, theme } = user;
          const body = { _id, email, username, theme };

          // sign the JWT token and populate the payload with the user details
          const token = jwt.sign({ body }, process.env.PASSPORT_KEY);

          return res
            .status(200)
            .cookie("jwt", token, {
              httpOnly: false,
              sameSite: false,
              secure: true,
              domain: process.env.SERVER_URL
            })
            .json(token);
        });
      }
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Error occured while logging in." });
    }
  })(req, res, next);
};

const signupUser = async (req, res, next) => {
  passport.authenticate("local-signup", async (err, user, info) => {
    try {
      if (err) {
        res.status(500).json({
          success: false,
          message: "Error occured while registering user."
        });
        return;
      } else if (!user) {
        const error = new Error("That email/username is already taken");
        res.status(400).json({
          success: false,
          message: "That email/username is already taken",
          err: error
        });
        return;
      }
      // if there is message describing error
      else if (user.message) {
        res.status(400).json({
          success: false,
          message: user.message
        });
        return;
      } else {
        res.status(200).json({
          success: true,
          message: "Successfully signed up",
          data: user
        });
        return;
      }
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Error occured while registering user."
      });
    }
  })(req, res, next);
};

const getTokenUser = async (req, res) => {
  try {
    const token = req.headers["authorization"];
    if (!token) return res.status(204).json(false);
    const decoded = jwt.verify(token, process.env.PASSPORT_KEY);

    res.status(200).json({
      success: true,
      data: decoded.body
    });
    return;
  } catch (err) {
    return res.status(500).json({
      message: "Error occured while validating token",
      error: err.message
    });
  }
};

const resetPassword = async (req, res) => {
  try {
    const passwordSchema = Joi.object({
      password: passwordComplexity()
        .required()
        .label("Password")
    });
    const { error } = passwordSchema.validate(req.body);
    if (error)
      return res
        .status(400)
        .send({ success: false, message: error.details[0].message });

    const user = await User.findOne({ _id: req.params.id });
    if (!user)
      return res
        .status(400)
        .send({ success: false, message: "Invalid userId in link" });

    const token = await Token.findOne({
      userId: user._id,
      token: req.params.token
    });
    if (!token)
      return res
        .status(400)
        .send({ success: false, message: "Invalid token in link" });

    if (!user.verified) user.verified = true;

    const salt = await bcrypt.genSalt(Number(process.env.SALT));
    const hashPassword = await bcrypt.hash(req.body.password, salt);

    user.password = hashPassword;
    await user.save();

    res
      .status(200)
      .send({ success: true, message: "Password reset successfully" });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "An error has occurred trying to reset password.",
      err: error
    });
  }
};

const forgotPassword = async (req, res) => {
  try {
    const schema = Joi.object({
      email: Joi.string()
        .email()
        .required()
    });

    const { error } = schema.validate(req.body);
    if (error)
      return res
        .status(400)
        .send({ success: false, message: error.details[0].message });

    const user = await User.findOne({ email: req.body.email });
    if (!user)
      return res.status(400).send({
        success: false,
        message: "User with given email doesn't exist",
        data: undefined
      });

    let token = await Token.findOne({ userId: user._id });
    if (!token) {
      token = await new Token({
        userId: user._id,
        token: crypto.randomBytes(32).toString("hex")
      }).save();
    }

    const link = `${process.env.SERVER_URL}reset-password/${user._id}/${token.token}`;
    await sendEmail(user.email, "Password reset", link);
    res.status(200).send({
      success: true,
      message: "password reset link sent to your email account",
      data: link
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "An error occured while resetting password."
    });
  }
};

module.exports = {
  loginUser,
  signupUser,
  getTokenUser,
  resetPassword,
  forgotPassword
};
