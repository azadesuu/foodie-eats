// const express = require("express");
// const userController = require("../../controllers/userController.js");
// const userRouter = express.Router();

// // Login
require("dotenv").config();
const express = require("express");

const jwt = require("jsonwebtoken");
const { deserializeUser } = require("passport");

const passport = require("passport");
require("../../config/passport")(passport);

const userRouter = express.Router();
const Joi = require("joi");
const sendEmail = require("../../sendEmail.js");
const crypto = require("crypto");
const User = require("../../models/user");
const Token = require("../../models/token");

// POST login -- using JWT
userRouter.post("/login", async (req, res, next) => {
  passport.authenticate("login", async (err, user, info) => {
    try {
      if (err) {
        // 500 error
        const error = new Error("An Error occurred");
        return next(error);
      } else if (!user) {
        const error = new Error("No user was found with the given email");
        return next(error);
      } else {
        req.logIn(user, { session: false }, async error => {
          if (error) return next(error);

          const { _id, email, username } = user;
          const body = { _id, email, username };

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
});

// POST signup form -- signup a new user
userRouter.post("/signup", async (req, res, next) => {
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
});

// GET user details associated with stored token
userRouter.get("/findTokenUser", async (req, res) => {
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
});

userRouter.post("/password-reset/:userId/:token", async (req, res) => {
  try {
    const schema = Joi.object({ password: Joi.string().required() });
    const { error } = schema.validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const user = await User.findById(req.params.userId);
    if (!user) return res.status(400).send("invalid link or expired");

    const token = await Token.findOne({
      userId: user._id,
      token: req.params.token
    });
    if (!token) return res.status(400).send("Invalid link or expired");

    user.password = req.body.password;
    await user.save();
    await token.delete();

    res.send("password reset sucessfully.");
  } catch (error) {
    res.send("An error occured");
    console.log(error);
  }
});

userRouter.post("/forgotPassword", async (req, res) => {
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
    console.log(error);
  }
});

module.exports = userRouter;
