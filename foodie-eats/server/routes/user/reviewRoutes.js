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


reviewRouter.get("/getReview", (req, res) => {
  Review.find({}, (err, result) => {
      if (err) {
          res.json(err);
      } else {
          console.log("info found");
          res.json(result);
      }
  }).sort({ $natural: -1 }).limit(1);
});

reviewRouter.put('/updateReview', async (req, res) => {
  const _id = req.body._id;
  const newRestaurantName = req.body.restaurantName;
  const newIsPublic = req.body.isPublic;
  const newPriceRange = req.body.priceRange;
  const newRating = req.body.rating;
  const newDateVisited = req.body.dateVisited;
  const newAddress = req.body.address;
  const newDescription = req.body.description;

  console.log(_id);
  console.log(newDescription);

  Review.findByIdAndUpdate(_id, {restaurantName: newRestaurantName, isPublic: newIsPublic, priceRange: newPriceRange, rating: newRating, 
    dateVisited: newDateVisited, address: newAddress, description: newDescription}, function(err, result) {
      console.log(result);
      if (err) {
          console.log("update error for user")
      } else {
          res.send(result);
      }
  }
  );
});

reviewRouter.put('/postReview', async (req, res) => {
  
  const newRestaurantName = req.body.restaurantName;
  const newIsPublic = req.body.isPublic;
  const newPriceRange = req.body.priceRange;
  const newRating = req.body.rating;
  const newDateVisited = req.body.dateVisited;
  const newAddress = req.body.address;
  const newDescription = req.body.description;
  // console.log(newRestaurantName)
  // console.log(newIsPublic)
  // console.log(newPriceRange)
  // console.log(newRating)
  // console.log(newDateVisited)
  // console.log(newAddress)
  // console.log(newDescription)

  const tempReview = new Review({restaurantName: newRestaurantName, isPublic: newIsPublic, priceRange: newPriceRange, rating: newRating, 
    dateVisited: newDateVisited, address: newAddress, description: newDescription})
    
  // console.log(tempReview.priceRange);
  // console.log(tempReview.rating);
  await tempReview.save();
  res.send("Posted Review");
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
