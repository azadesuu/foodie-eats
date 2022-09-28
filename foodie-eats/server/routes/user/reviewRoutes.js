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
    const review = await Review.findOne({ _id: req.params.reviewId }).lean();

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

reviewRouter.get("/getReview", (req, res) => {
  Review.find({}, (err, result) => {
    if (err) {
      res.json(err);
    } else {
      res.json(result);
    }
  })
    .sort({ $natural: -1 })
    .limit(1);
});

reviewRouter.put("/createReview", async (req, res) => {
  console.log("server func called");
  const newUserId = req.body.userId;
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

  const tempReview = new Review({
    userId: newUserId,
    restaurantName: newRestaurantName,
    isPublic: newIsPublic,
    priceRange: newPriceRange,
    rating: newRating,
    dateVisited: newDateVisited,
    address: newAddress,
    description: newDescription
  });

  // console.log(tempReview.priceRange);
  // console.log(tempReview.rating);
  await tempReview.save();
  res.status(200).json({
    success: true,
    data: tempReview
  });
});

reviewRouter.patch("/updateReview", async (req, res, next) => {
  try {
    const {
      dateVisited,
      restaurantName,
      rating,
      description,
      images,
      address,
      tags
    } = req.body;

    const updatedReview = await Review.updateOne(
      { _id: req.params.id },
      {
        $currentDate: {
          dateStart: true
        },
        $set: {
          dateVisited: dateVisited,
          restaurantName: restaurantName,
          rating: rating,
          description: description,
          images: images,
          address: address,
          tags: tags
        }
      }
    );
    const newReview = await Review.findById(req.params.reviewId);
    // if this review doesn't exist, send a 400 error
    if (!newReview) {
      next({ name: "CastError" });
      return;
    }
  } catch (err) {
    console.log(err);
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
