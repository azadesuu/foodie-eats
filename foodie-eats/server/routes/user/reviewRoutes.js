const express = require("express");
const reviewController = require("../../controllers/reviewController");
const reviewRouter = express.Router();

// create review
reviewRouter.post("/", reviewController.createReview);

// get all user reviews
reviewRouter.get("/:userId", reviewController.getMyReviews);

// get reviews based on rating and price range  (either is optional)
reviewRouter.get("/:rating?/:price_range?", reviewController.getReviewFilter);

// // get reviews based on bookmarked
// reviewRouter.get("/:bookmarks", reviewController.getReviewBookmarks);

// // get reviews based on tags
// reviewRouter.get("/:tags", reviewController.getReviewTags);


// // // get all reviews based on postcode
// // orderRouter.get("/community/:postcode", reviewController.getReviewPostcode);


module.exports = reviewRouter