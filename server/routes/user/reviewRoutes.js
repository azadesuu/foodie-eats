const express = require("express");
// const reviewController = require("../../controllers/reviewController");
const reviewRouter = express.Router();
const Review = require("../../models/review");
const User = require("../../models/user");
const reviewController = require("../../controllers/reviewController");

const { cloudinary } = require("../../config/cloudinary");
const upload = require("../../config/multer");
const utils = require("../utility");

//GET reviews by recent
reviewRouter.get(
  "/getReviewsByRecent/:postcode",
  reviewController.getReviewsByRecent
);
//GET reviews by most liked
reviewRouter.get(
  "/getReviewsByLikes/:postcode",
  reviewController.getReviewsByLikes
);

//GET by search values -- restaurantname, rating, pricerange, postcode, tags
reviewRouter.post("/search", reviewController.getReviewsBySearch);

//GET one review by reviewId
reviewRouter.get("/getReview/:reviewId", reviewController.getOneReview);

//PUT review upon creation
reviewRouter.put("/createReview", reviewController.createReview);

// PATCH a review by id upon edit
reviewRouter.patch("/updateReview", reviewController.updateReview);

//PATCH review according to like boolean -- toggle like
reviewRouter.patch("/like/:userId/:reviewId", reviewController.toggleLike);

//delete review
reviewRouter.delete("/delete/:reviewId", reviewController.deleteReview);

// images
reviewRouter.patch(
  "/uploadReviewImage/:reviewId",
  upload.single("image"),
  reviewController.uploadReviewImage
);

reviewRouter.patch(
  "/deleteReviewImage/:reviewId",
  reviewController.deleteReviewImage
);

//PATCH review according to flag boolean -- toggle flag // might be removed
reviewRouter.patch("/flag/:userId/:reviewId", async (req, res, next) => {
  try {
    const reviewId = req.params.reviewId;
    const userId = [req.params.userId];
    const flagBool = req.body.flagBool;

    if (!flagBool) {
      //add to flagged array and increment flag  count
      await Review.findOneAndUpdate(
        { _id: reviewId, flagged: { $ne: userId } },
        {
          $addToSet: { flagged: userId },
          $inc: { flagCount: 1 }
        },
        { new: true },
        (err, updatedReview) => {
          if (err) {
            res.json(err);
            return;
          }
          console.log(updatedReview);

          res.status(200).json({
            success: true,
            data: updatedReview
          });
        }
      ).clone();
    } else {
      //remove from flagged array and decrement flag count
      await Review.findOneAndUpdate(
        { _id: reviewId, flagged: { $in: userId } },
        {
          $pullAll: { flagged: userId },
          $inc: { flagCount: -1 }
        },
        { new: true },
        (err, updatedReview) => {
          if (err) {
            res.json(err);
            return;
          }
          console.log(updatedReview);
          res.status(200).json({
            success: true,
            data: updatedReview
          });
        }
      ).clone();
    }
  } catch (err) {
    next(err);
  }
});

module.exports = reviewRouter;
