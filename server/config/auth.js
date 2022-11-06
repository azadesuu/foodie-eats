const jwt = require("jsonwebtoken");
const passport = require("passport");
require("../config/passport")(passport);
const passportJWT = require("passport-jwt");
const Review = require("../models/review");
const JwtStrategy = passportJWT.Strategy;
const ExtractJwt = passportJWT.ExtractJwt;
// a middleware to check if current user is allowed to edit data in the database

const authenticateJWT = (req, res, next) => {
  passport.authenticate("jwt", (err, user, info) => {
    if (err) {
      //  error has been encountered while verifying JWT
      res.status(401).json({
        message: "Authentication unsuccessful",
        success: false,
        error: err
      });
      return;
    }

    // if JWT isn't valid, return error
    if (!user) {
      res.status(401).json({
        message: "Token provided is invalid",
        success: false
      });
      return;
    }

    // needed in order to turn session off (if not inserted, session is established)
    req.logIn(user, { session: false }, next);
  })(req, res, next);
};

const authenticateUser = async (req, res, next) => {
  // extract current user id from decoded JWT
  const currUserId = req.user._id.toHexString();
  var authenticated;
  if (req.params.userId) {
    // match userId in params
    authenticated = currUserId === req.params.userId;
  } else if (req.body._id && req.body.password) {
    // match userId in body (for password update)
    authenticated = currUserId === req.body._id;
  } else if ((req.body._id && req.body.userId) || req.params.reviewId) {
    // look for a review with the associated reviewID and userId
    let reqReviewId = req.params.reviewId || req.body._id;
    authenticated = await Review.findOne({
      $and: [{ _id: reqReviewId }, { userId: currUserId }]
    });
  } else if (req.body.userId) {
    // match userId in body
    authenticated = currUserId === req.body.userId;
  }

  if (authenticated) {
    // user is permitted to modify their data
    next();
  } else {
    res.status(401).json({
      success: false,
      message: "Request is invalid for current user"
    });
    return;
  }
};
module.exports = { authenticateUser, authenticateJWT };
