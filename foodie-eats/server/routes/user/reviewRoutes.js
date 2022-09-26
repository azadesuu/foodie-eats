const express = require("express");
// const reviewController = require("../../controllers/reviewController");
const reviewRouter = express.Router();
const Review = require("../../models/review");
const User = require("../../models/user");

// limit the amount of searches
// community routes
reviewRouter.get("/getReviewsByRecent", async (req, res, next) => {
  try {
    const reviews = await Review.find({})
      .lean()
      .limit(10)
      .sort({ $natural: -1 });

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
      .limit(10)
      .sort({ likeCount: -1 });

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

reviewRouter.get("/getReview/:reviewId", async (req, res, next) => {
  try {
    const review = await Review.find({ _id: req.params.reviewId }).lean();

    if (!review) {
      next({ name: "CastError" });
      return;
    }
    res.status(200).json({
      success: true,
      data: review
    });
  } catch (err) {
    next(err);
  }
});

// reviewRouter.patch("/like/:userId/:reviewId", async (req, res, next) => {
//   try {
//     const queryReviewId = req.params.reviewId;
//     const review = await Review.findOne({
//       reviewId: queryReviewId
//     });
//     const updatedreview = Review.updateOne(
//       { likeCount: likeCount + 1 },
//       { $addToSet: { userLikes: queryReviewId } }
//     );
//     res.status(200).json({
//       success: true,
//       data: updatedreview
//     });
//   } catch (err) {
//     next(err);
//   }
// });

// reviewRouter.patch("/unlike/:userId/:reviewId", async (req, res, next) => {
//   try {
//     const queryReviewId = req.params.reviewId;
//     const review = await Review.findByIdAndUpdate(
//       queryReviewId,
//       { likeCount: likeCount - 1 },
//       { $pull: { userLikes: queryReviewId } }
//     );
//     res.status(200).json({
//       success: true,
//       data: updatedreview
//     });
//   } catch (err) {
//     next(err);
//   }
// });

// toggleBookmark, toggleFlag

// User Review APIs

module.exports = reviewRouter;
