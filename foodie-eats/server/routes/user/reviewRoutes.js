const express = require("express");
// const reviewController = require("../../controllers/reviewController");
const reviewRouter = express.Router();
const Review = require("../../models/review");
const User = require("../../models/user");
const reviewController = require("../../controllers/reviewController");

//GET reviews by recent
reviewRouter.get("/getReviewsByRecent", reviewController.getReviewsByRecent);
//GET reviews by most liked
reviewRouter.get("/getReviewsByLikes", reviewController.getReviewsByLikes);

//GET one review by reviewId
reviewRouter.get("/getReview/:reviewId", reviewController.getOneReview);

//PUT review upon creation
reviewRouter.put("/createReview", reviewController.createReview);

// PATCH a review by id upon edit
reviewRouter.patch("/updateReview", reviewController.updateReview);

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

// GET most recent  review -- for testing purposes
reviewRouter.get("/getReview", (req, res, next) => {
  Review.find({}, (err, result) => {
    if (err) {
      res.json(err);
    } else {
      res.json(result);
    }
  })
    .sort({ $natural: -1 })
    .populate("userId")
    .limit(1);
});
module.exports = reviewRouter;
