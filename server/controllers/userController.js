const User = require("../models/user");
const jwt = require("jsonwebtoken");
const passport = require("passport");
require("../config/passport")(passport);
const Joi = require("joi");
const sendEmail = require("../sendEmail.js");
const generatePassword = require("genepass");

const loginUser = async (req, res, next) => {
  passport.authenticate("login", async (err, user, info) => {
    try {
      if (err) {
        return res.status(500).json({
          success: false,
          message: "Error occured while logging in."
        });
      } else if (info?.message) {
        return res.status(400).json({
          success: false,
          message: info.message
        });
      } else if (!user) {
        return res.status(400).json({
          success: false,
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
      }
      // if there is message describing error
      if (info?.message) {
        res.status(400).json({
          success: false,
          message: info.message
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

const getTokenUser = async (req, res, next) => {
  passport.authenticate("jwt", async (err, user, info) => {
    // if some error has been encountered while verifying JWT
    try {
      if (err) {
        return res.status(401).json({
          message: "Authentication unsuccessful",
          status: false,
          error: err
        });
      }

      // if JWT isn't valid, return back error
      if (!user) {
        return res.status(401).json({
          message: "Token provided is invalid",
          status: false
        });
      } else {
        res.status(200).json({
          success: true,
          data: user
        });
      }
    } catch (err) {
      return res.status(500).json({
        message: "Error occured while validating token",
        error: err.message
      });
    }
  })(req, res, next);
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

    // Generate random password
    const password = generatePassword.build({
      length: 10,
      lowercase: true,
      uppercase: true,
      number: true,
      special: true
    });

    // Change password in database
    const updatedUser = await User.findOneAndUpdate(
      { email: req.body.email },
      { password: user.generateHash(password) }
    );

    // (email, subject, text)
    await sendEmail(user.email, "Temporary password", password);

    res.status(200).send({
      success: true,
      message: "Temporary password sent to your email account",
      data: password
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
  forgotPassword
};
