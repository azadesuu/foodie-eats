// Login
require("dotenv").config();
const express = require("express");
const userRouter = express.Router();
const userController = require("../../controllers/userController");

// POST login -- using JWT
userRouter.post("/login", userController.loginUser);

// POST signup form -- signup a new user
userRouter.post("/signup", userController.signupUser);

// GET user details associated with stored token
userRouter.get("/findTokenUser", userController.getTokenUser);

// POST new password to reset password
userRouter.post("/reset-password/:id/:token", userController.resetPassword);

// POST email to receive email with token to reset password
userRouter.post("/forgotPassword", userController.forgotPassword);

module.exports = userRouter;
