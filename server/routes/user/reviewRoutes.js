const express = require("express");
// const reviewController = require("../../controllers/reviewController");
const reviewRouter = express.Router();
const Review = require("../../models/review");
const User = require("../../models/user");
const reviewController = require("../../controllers/reviewController");

const utils = require("../utility");
const { cloudinary } = require("../../config/cloudinary");
const upload = require("../../config/multer");

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


module.exports = reviewRouter;
