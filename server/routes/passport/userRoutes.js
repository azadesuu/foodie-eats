// Login
require("dotenv").config();
const express = require("express");
const userRouter = express.Router();
const userController = require("../../controllers/userController");

/**
 * @api {PUT} /login Logins in using JWT by checking with MongoDB database
 * @apiName LoginUser
 * @apiGroup User
 * @apiSuccess Token
 * @apiSuccessExample Successful Respone:
 * "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJib2R5Ijp7Il9pZCI6IjYzNWExNTU3NGNkZDQxY2Y5YzljN2Q4MiIsImVtYWlsIjoidGVzdEBnbWFpbC5jb20iLCJ1c2VybmFtZSI6InRlc3QxMjM0NSIsInRoZW1lIjoiYmx1ZWJlcnJ5In0sImlhdCI6MTY2NzQ0ODU0OH0.8xVLqyueHxISWcBAwZlli4QPo4zZNwyrispYuBQEkwc"
 */

// POST login -- using JWT
userRouter.post("/login", userController.loginUser);

/**
 * @api {PUT} /signup Logins in using JWT by checking with MongoDB database
 * @apiName SignupUser
 * @apiGroup User
 * @apiSuccess UserInfo
 * @apiSuccessExample Successful Respone:
 * {
  "success": true,
  "message": "Successfully signed up",
  "data": {
    "profileImage": "",
    "bio": "This person loves food too much to think of a bio right now!",
    "theme": "honeydew",
    "bookmarks": [],
    "admin": false,
    "_id": "63633fe5967eb73c86df8cf2",
    "date": "2022-11-03T04:13:25.121Z",
    "username": "test321",
    "email": "test3@gmail.com",
    "password": "$2b$10$W6nNrnuKHmve.n/LfLYJzeyf/I04w3rst.4mULFt1eJYqA31KSuqG",
    "__v": 0
  }
}
 */
// POST signup form -- signup a new user
userRouter.post("/signup", userController.signupUser);

// GET user details associated with stored token
userRouter.get("/findTokenUser", userController.getTokenUser);

// POST new password to reset password
userRouter.post("/reset-password/:id/:token", userController.resetPassword);

/**
 * @api {Post} /forgotPassword Sends email with token to reset password
 * @apiName ForgotPassword
 * @apiGroup User
 * @apiSuccess String
 * @apiSuccessExample Successful Respone:
 * "password reset link sent to your email account"
 */

// POST email to receive email with token to reset password
userRouter.post("/forgotPassword", userController.forgotPassword);

module.exports = userRouter;
