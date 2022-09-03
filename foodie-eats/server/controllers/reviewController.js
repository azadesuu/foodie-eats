const Review = require("../models/review");
const User = require("../models/user");



const createReview = async (req, res, next) => {
    const {
        userId,
        dateReviewed,
        dateVisited,
        restaurantName,
        rating,
        description,
        images,
        address,
        public,
        tags,
        userLikes,
        likeCount,
        flagged,
        flagCount
      } = req.body;
    try {
      const userExists = await User.exists({ _id: userId });
      if (!userExists) {
        next({ name: "CastError" });
        return;
      }
  
      // create new  object
      const newReview = new Review({
        userId,
        dateReviewed,
        dateVisited,
        restaurantName,
        rating,
        description,
        images,
        address,
        public,
        tags,
        userLikes,
        likeCount,
        flagged,
        flagCount
      });
      // adds new order to the collection
      await newReview.save();

      res.status(201).json({
        success: true,
        data: newReview,
      });
    } catch (err) {
      next(err);
    }
  };

//update a review //tb debugged
const updateReview = async (req, res, next) => {
    try{
        const {
            dateVisited,
            restaurantName,
            rating,
            description,
            images,
            address,
            tags
        } = req.body

        const updatedReview = await Review.updateOne(
            { _id: req.params.id },
            {
            $currentDate: {
                dateStart: true,
            },
            $set: {
                dateVisited: dateVisited,
                restaurantName: restaurantName,
                rating: rating,
                description: description,
                images: images,
                address: address,
                tags: tags
            },
            }
        );
        const newReview = await Review.findById(req.params.id);
        // if this review doesn't exist, send a 400 error
        if (!newReview) {
            next({ name: "CastError" });
            return;
        }
    } catch (err) {
        console.log(err)
        next(err);
    }
};

// Get all reviews
const getMyReviews = async (req, res, next) => {
    try {
      // look for all reviews from user
      const myReviews = await Review.find({
        userId: req.params.userId,
      }).lean();
      // if there are no reviews, then respond with an error
      if (!myReviews) {
        next({ name: "CastError" });
        return;
      }
      res.status(200).json({
        success: true,
        data: myReviews,
      });
    } catch (err) {
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
      reviewId: req.params.reviewId,
    }).lean();
    // if there are no reviews, then respond with an error
    if (!oneReview) {
      next({ name: "CastError" });
      return;
    }
    res.status(200).json({
      success: true,
      data: myReviews,
    });
  } catch (err) {
    next(err);
  }
};


getReviewBookmarks

module.exports = {
    createReview,
    updateReview,
    getMyReviews,
    getReviewFilter,
    // getReviewTags,
    getOneReview,
    // getReviewPostcode,
}