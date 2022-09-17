const express = require("express");
const userRouter = express.Router();
const Joi = require("joi");
const sendEmail = require("../sendEmail.js");
const crypto = require("crypto");
const User = require("../models/user");
const Token = require("../models/token");

// signup user
const signUpUser = async (request, response) => {
    const user = new User(request.body);
  
    try {
      await user.save();
      response.send(user);
    } catch (error) {
      response.status(500).send(error);
    }
};

const getUsers = async (request, response) => {
    const users = await User.find({});
  
    try {
      response.send(users);
    } catch (error) {
      response.status(500).send(error);
    }
  };



// const loginUser = async (req, res ) => {
//     const { username, password } = req.body;
  
//     User.findOne({ username: username }, (err, user) => {
//       if (user) {
//         if (password === user.password) {
//           res.send({ message: "Login success", user: user });
//         } else {
//           resizeTo.send({ message: "Incorrect password" });
//         }
//       } else {
//         res.send("Username not registered");
//       }
//     });
// };

// const forgotPassword = async (req, res) => {
//     try {
//       const schema = Joi.object({ email: Joi.string().email().required() });
//       const { error } = schema.validate(req.body);
//       if (error) return res.status(400).send(error.details[0].message);
  
//       const user = await User.findOne({ email: req.body.email });
//       if (!user)
//         return res.status(400).send("user with given email doesn't exist");
  
//       let token = await Token.findOne({ userId: user._id });
//       if (!token) {
//         token = await new Token({
//           userId: user._id,
//           token: crypto.randomBytes(32).toString("hex"),
//         }).save();
//       }
  
//       const link = `${process.env.BASE_URL}/password-reset/${user._id}/${token.token}`;
//       await sendEmail(user.email, "Password reset", link);
  
//       res.send("password reset link sent to your email account");
//     } catch (error) {
//       res.send("An error occured");
//       console.log(error);
//     }
// };


const resetPassword = async (req, res) => {
        try {
      const schema = Joi.object({ password: Joi.string().required() });
      const { error } = schema.validate(req.body);
      if (error) return res.status(400).send(error.details[0].message);
  
      const user = await User.findById(req.params.userId);
      if (!user) return res.status(400).send("invalid link or expired");
  
      const token = await Token.findOne({
        userId: user._id,
        token: req.params.token,
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
};

module.exports = {
    signUpUser,
    getUsers,
    loginUser,
    forgotPassword,
    resetPassword
}