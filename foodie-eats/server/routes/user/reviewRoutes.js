const express = require("express");
const reviewController = require("../../controllers/reviewController");
const reviewRouter = express.Router();
const Review = require("../../models/review");

// limit the amount of searches
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
    console.log(reviews);
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

// create review
reviewRouter.post("/new-review", reviewController.createReview);

// get all user reviews
reviewRouter.get("/:userId", reviewController.getMyReviews);

// get all user reviews
reviewRouter.get("/:reviewId", reviewController.getOneReview);

// get all user reviews
reviewRouter.get("/:reviewId", reviewController.updateReview)

module.exports = reviewRouter;
