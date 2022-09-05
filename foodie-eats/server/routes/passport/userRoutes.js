// const express = require("express");
// const userController = require("../../controllers/userController.js");
// const userRouter = express.Router();

// // Login
// userRouter.post("/login", userController.loginUser);
// // Signup
// userRouter.post("/signup", userController.signUpUser);

// userRouter.get("/", userController.getUsers);


// // Forgot password
// userRouter.post("/forgot-password", userController.forgotPassword);

// userRouter.post("/:userId/:token", userController.resetPassword);

// Based on Week 9 demo files (FoodBuddy API)

require("dotenv").config();
const express = require("express");

const jwt = require("jsonwebtoken");
const { deserializeUser } = require("passport");

const passport = require("passport");
require("../../config/passport")(passport);

const userRouter = express.Router();

// POST login -- using JWT
userRouter.post("/login", async (req, res, next) => {
  passport.authenticate("login", async (err, user, info) => {
    try {
      if (err) {
        const error = new Error("An Error occurred");
        return next(error);
      }
      if (!user) {
        const error = new Error("No user was found with the given username");
        return next(error);
      }
      req.login(user, { session: false }, async (error) => {
        if (error) return next(error);

        const { _id, username, email } = user;
        const body = { _id, username, email };

        // sign the JWT token and populate the payload with the user details
        const token = jwt.sign({ body }, process.env.PASSPORT_KEY);
        res.status(200);

        res.cookie("jwt", token, {
          httpOnly: false,
          sameSite: false,
          secure: true,
          domain: process.env.BASE_URL,
        });
        return res.json(token);
      });
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
      // otherwise login the new user
      req.login(user, { session: false }, async (error) => {
        if (error) return next(error);

        const { _id, username, email} = user;
        const body = { _id, username, email };

        // sign the JWT token and populate the payload with the user details
        const token = jwt.sign({ body }, process.env.PASSPORT_KEY);

        res.status(200);

        res.cookie("jwt", token, {
          httpOnly: false,
          sameSite: false,
          secure: true,
          domain: process.env.BASE_URL,
        });

        return res.json(token);
      });
    } catch (error) {
      return next(error);
    }
  })(req, res, next);
});

// GET login form
userRouter.get("/", (req, res) => {
  res.send({ login: "required" });
});

// GET user details associated with stored token
userRouter.get("/find", async (req, res) => {
  try {
    const token = req.headers["x-auth-token"];
    if (!token) return res.json(false);
    const decoded = jwt.verify(token, process.env.PASSPORT_KEY);

    res.status(200).json({
      success: true,
      data: decoded,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = userRouter;


module.exports = userRouter;
