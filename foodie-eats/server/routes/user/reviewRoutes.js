const express = require("express");
const reviewController = require("../../controllers/reviewController");
const reviewRouter = express.Router();
const Review = require("../../models/review");

 // limit the amount of searches
reviewRouter.get("/getReviewsByRecent", (req, res) => {
    Review.find({}, (err, result) => {
        if (err) {
            res.json(err);
        } else {
            res.json(result);
        }
    }).limit(6).sort({$natural:-1});
  });
  
reviewRouter.get("/getReviewsByLikes", (req, res) => {
    Review.find({}, (err, result) => {
          if (err) {
              res.json(err);
          } else {
              res.json(result);
          }
      }).sort({"likeCount":-1}).limit(6);
  });

// create review
reviewRouter.post("/new-review", reviewController.createReview);

// get all user reviews
reviewRouter.get("/:userId", reviewController.getMyReviews);

// get reviews based on rating and price range  (either is optional)
// reviewRouter.get("/:rating?/:price_range?", reviewController.getReviewFilter);

// // get reviews based on bookmarked
// reviewRouter.get("/:bookmarks", reviewController.getReviewBookmarks);

// // get reviews based on tags
// reviewRouter.get("/:tags", reviewController.getReviewTags);


// // // get all reviews based on postcode
// // orderRouter.get("/community/:postcode", reviewController.getReviewPostcode);


module.exports = reviewRouter