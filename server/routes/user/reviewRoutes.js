const express = require("express");
// const reviewController = require("../../controllers/reviewController");
const reviewRouter = express.Router();
const reviewController = require("../../controllers/reviewController");

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

//GET one review by reviewId
reviewRouter.get("/getAllReviews", reviewController.getAllReviews);

//GET one review by reviewId
reviewRouter.use("/getReview/:reviewId", reviewController.checkReviewParams);
reviewRouter.route("/getReview/:reviewId").get(reviewController.getOneReview);

//PUT review upon creation
// need user auth
reviewRouter.use("/createReview", reviewController.checkCreateReview);
reviewRouter.get("/createReview", reviewController.createReview);

// PATCH a review by id upon edit
// need user auth
reviewRouter.use("/updateReview", reviewController.checkUserParams);
reviewRouter.use("/updateReview", reviewController.checkUpdateReview);
reviewRouter.patch("/updateReview", reviewController.updateReview);

//PATCH review according to like boolean -- toggle like
// need user auth
reviewRouter.use("/like/:userId/:reviewId", reviewController.checkUserParams);
reviewRouter.use("/like/:userId/:reviewId", reviewController.checkReviewParams);
reviewRouter.use("/like/:userId/:reviewId", reviewController.checkToggleLike);
reviewRouter.patch("/like/:userId/:reviewId", reviewController.toggleLike);

//delete review
// need user auth
reviewRouter.use("/delete/:reviewId", reviewController.checkReviewParams);
reviewRouter.delete("/delete/:reviewId", reviewController.deleteReview);

module.exports = reviewRouter;
