const express = require("express");
const reviewController = require("../../controllers/reviewController");
const reviewRouter = express.Router();
const Review = require("../../models/review");
const User = require("../../models/user");

// limit the amount of searches
// community routes
reviewRouter.get("/getReviewsByRecent", async (req, res, next) => {
  try {
    const reviews = await Review.find({})
      .lean()
      .sort({ $natural: -1 })
      .limit(6);

    if (!reviews) {
      next({ name: "CastError" });
      return;
    }
    res.status(200).json({
      success: true,
      data: reviews
    });
  } catch (err) {
    next(err);
  }
});

reviewRouter.get("/getReviewsByLikes", async (req, res, next) => {
  try {
    const reviews = await Review.find({})
      .lean()
      .sort({ likeCount: -1 })
      .limit(6);

    if (!reviews) {
      next({ name: "CastError" });
      return;
    }
    res.status(200).json({
      success: true,
      data: reviews
    });
  } catch (err) {
    next(err);
  }
});

// User Review APIs

module.exports = reviewRouter;
