const Review = require("../models/review");
const User = require("../models/user");
const Token = require("../models/token");

// get express-validator, to validate user data in forms
const expressValidator = require("express-validator");
const jwt = require("jsonwebtoken");
const { deserializeUser } = require("passport");
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
        // 500 error
        const error = new Error("An Error occurred");
        return next(error);
      } else if (!user) {
        const error = new Error("No user was found with the given user/email");
        return next(error);
      } else {
        req.logIn(user, { session: false }, async error => {
          if (error) return next(error);

          const { _id, email, username, bio, theme, profileImage } = user;
          const body = { _id, email, username, bio, theme, profileImage };

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
      return next(error);
    }
  })(req, res, next);
};

const signupUser = async (req, res, next) => {
  passport.authenticate("local-signup", async (err, user, info) => {
    try {
      if (err) {
        const error = new Error("An Error occurred");
        return next(error);
      }
      if (!user) {
        const error = new Error("That username is already taken");
        return next(error);
      }
      // if there is message describing error
      if (user.message) {
        return res.json(user);
      }
      res.status(200).json({
        success: true
      });
    } catch (error) {
      return next(error);
    }
  })(req, res, next);
};

const getTokenUser = async (req, res) => {
  try {
    const token = req.headers["x-auth-token"];
    if (!token) return res.json(false);
    const decoded = jwt.verify(token, process.env.PASSPORT_KEY);

    res.status(200).json({
      success: true,
      data: decoded
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
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
      return res.status(400).send({ message: error.details[0].message });

    const user = await User.findOne({ _id: req.params.id });
    if (!user)
      return res.status(400).send({ message: "Invalid userId in link" });

    const token = await Token.findOne({
      _id: user._id,
      token: req.params.token
    });
    if (!token)
      return res.status(400).send({ message: "Invalid token in link" });

    if (!user.verified) user.verified = true;

    const salt = await bcrypt.genSalt(Number(process.env.SALT));
    const hashPassword = await bcrypt.hash(req.body.password, salt);

    user.password = hashPassword;
    await user.save();

    res.status(200).send({ message: "Password reset successfully" });
  } catch (error) {
    res.status(500).send({ message: "Internal server error " });
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
    if (error) return res.status(400).send(error.details[0].message);

    const user = await User.findOne({ email: req.body.email });
    if (!user)
      return res.status(400).send("user with given email doesn't exist");

    let token = await Token.findOne({ userId: user._id });
    if (!token) {
      token = await new Token({
        userId: user._id,
        token: crypto.randomBytes(32).toString("hex")
      }).save();
    }

    const link = `${process.env.SERVER_URL}/password-reset/${user._id}/${token.token}`;
    await sendEmail(user.email, "Password reset", link);

    res.send("password reset link sent to your email account");
  } catch (error) {
    res.send("An error occured");
  }
};

module.exports = {
  loginUser,
  signupUser,
  getTokenUser,
  resetPassword,
  forgotPassword
};