const Review = require("../models/review");
const User = require("../models/user");

// get express-validator, to validate user data in forms
const expressValidator = require("express-validator");

const createReview = async (req, res) => {
  console.log("server func called");
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
    data: tempReviews
  });
};

// Get all reviews
const getMyReviews = async (req, res, next) => {
  try {
    // look for all reviews from user
    const myReviews = await Review.find({
      userId: req.params.userId
    }).lean();
    // if there are no reviews, then respond with an error
    if (!myReviews) {
      next({ name: "CastError" });
      return;
    }
    res.status(200).json({
      success: true,
      data: myReviews
    });
  } catch (err) {
    next(err);
  }
};

//update a review //tb debugged
const updateReview = async (req, res, next) => {
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
};

//   const getReviewsPostcode = async (req, res, next) => {
//     try {
//       // look for review with postcode
//       const order = await Review.findById(req.params.address.postcode);
//       // if there are no orders, then respond with an error
//       if (!order) {
//         next({ name: "CastError" });
//         return;
//       } else {
//         res.status(200).json({
//           success: true,
//           data: order,
//         });
//       }
//     } catch (err) {
//       next(err);
//     }
//   };

// // tbd include if tags in list

// const getReviewsTags = async (req, res, next) => {
//   try {
//     // look for review with postcode
//     const order = await Review.findById(req.params.tags);
//     // if there are no orders, then respond with an error
//     if (!order) {
//       next({ name: "CastError" });
//       return;
//     } else {
//       res.status(200).json({
//         success: true,
//         data: order,
//       });
//     }
//   } catch (err) {
//     next(err);
//   }
// };

const getOneReview = async (req, res, next) => {
  try {
    // look for all reviews from user
    const oneReview = await Review.findOne({
      reviewId: req.params.reviewId
    }).lean();
    // if there are no reviews, then respond with an error
    if (!oneReview) {
      next({ name: "CastError" });
      return;
    }
    res.status(200).json({
      success: true,
      data: myReviews
    });
  } catch (err) {
    next(err);
  }
};

// getReviewBookmarks

module.exports = {
  createReview,
  updateReview,
  getMyReviews
  // getOneReview
  // getReviewFilter,
  // getReviewTags,
  // getReviewPostcode,
};
