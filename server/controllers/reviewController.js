const Review = require("../models/review");
const utils = require("../routes/utility");
const { cloudinary } = require("../config/cloudinary");

const checkUserParams = async (req, res, next) => {
  if (!req.params.userId) {
    res.status(400).json({
      success: false,
      message: "User Id was not defined.",
      data: undefined
    });
    return;
  }
  next();
};

const checkReviewParams = async (req, res, next) => {
  if (!req.params.reviewId) {
    res.status(400).json({
      success: false,
      message: "Review Id was not defined.",
      data: undefined
    });
    return;
  } else {
    const exist = await Review.findById(req.params.reviewId);
    if (!exist) {
      res.status(204).json({
        success: false,
        message: "Review doesn't exist in the database",
        data: undefined
      });
      return;
    }
    next();
  }
};

const getReviewsByRecent = async (req, res, next) => {
  try {
    const reviews = await Review.find({ isPublic: true })
      .populate("userId")
      .lean()
      .sort({ $natural: -1 });

    if (!reviews) {
      res.status(204).json({
        success: true,
        message: "No recent reviews found.",
        data: {}
      });
    } else {
      res.status(200).json({
        success: true,
        message: "Recent reviews found",
        data: reviews
      });
    }
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Error occured while getting recent reviews",
      err: err
    });
  }
};

const getReviewsByLikes = async (req, res, next) => {
  try {
    const reviews = await Review.find({ isPublic: true })
      .lean()
      .limit(10)
      .populate("userId")
      .sort({ likeCount: -1 });

    if (!reviews) {
      res.status(204).json({
        success: true,
        message: "No most liked reviews found.",
        data: {}
      });
    } else {
      res.status(200).json({
        success: false,
        message: "Most liked reviews found.",
        data: reviews
      });
    }
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Error occured while getting most liked reviews",
      err: err
    });
  }
};

const getOneReview = async (req, res, next) => {
  try {
    const review = await Review.findOne({ _id: req.params.reviewId })
      .populate("userId")
      .lean();

    if (!review) {
      res.status(204).json({
        success: true,
        message: "No review found.",
        data: {}
      });
    } else {
      res.status(200).json({
        success: true,
        message: "Review found",
        data: review
      });
    }
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Error occured while getting the review.",
      err: err
    });
  }
};
const checkCreateReview = async (req, res, next) => {
  const {
    userId,
    restaurantName,
    isPublic,
    priceRange,
    rating,
    dateVisited,
    address
  } = req.body;

  if (
    isPublic == undefined ||
    !(
      userId &&
      restaurantName &&
      priceRange &&
      rating &&
      dateVisited &&
      address
    )
  ) {
    res.status(400).json({
      success: false,
      message: "Some important fields are missing. Review was not created.",
      data: {}
    });
    return;
  }
  next();
};
const createReview = async (req, res, next) => {
  const newUserId = req.body.userId;
  const newRestaurantName = req.body.restaurantName;
  const newIsPublic = req.body.isPublic;
  const newPriceRange = req.body.priceRange;
  const newImage = req.body.reviewImage;
  const newRating = req.body.rating;
  const newDateVisited = req.body.dateVisited;
  const newAddress = req.body.address;
  const newTags = req.body.tags;
  const newDescription = req.body.description;

  try {
    const tempReview = new Review({
      userId: newUserId,
      restaurantName: newRestaurantName,
      reviewImage: newImage,
      isPublic: newIsPublic,
      priceRange: newPriceRange,
      rating: newRating,
      dateVisited: newDateVisited,
      address: newAddress,
      tags: newTags,
      description: newDescription
    });

    const result = await tempReview.save();

    if (!result) {
      res.status(204).json({
        success: false,
        message: "No review created.",
        data: {}
      });
    } else {
      res.status(200).json({
        success: true,
        message: "Review created.",
        data: result
      });
    }
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Error occured while creating the review.",
      err: err
    });
  }
};
const checkUpdateReview = async (req, res, next) => {
  const {
    _id,
    userId,
    restaurantName,
    isPublic,
    priceRange,
    rating,
    dateVisited,
    address
  } = req.body;

  if (
    isPublic == undefined ||
    !(
      _id &&
      userId &&
      restaurantName &&
      priceRange &&
      rating &&
      dateVisited &&
      address
    )
  ) {
    res.status(400).json({
      success: false,
      message: "Some important fields are missing. Review was not updated.",
      data: req.body
    });
    return;
  }
  next();
};

const updateReview = async (req, res, next) => {
  try {
    const {
      _id,
      restaurantName,
      isPublic,
      priceRange,
      rating,
      dateVisited,
      reviewImage,
      description,
      address,
      tags
    } = req.body;

    const updatedReview = await Review.findByIdAndUpdate(
      _id,
      {
        $currentDate: {
          dateStart: true
        },
        $set: {
          restaurantName: restaurantName,
          isPublic: isPublic,
          priceRange: priceRange,
          rating: rating,
          dateVisited: dateVisited,
          description: description,
          reviewImage: reviewImage,
          address: address,
          tags: tags
        }
      },
      { new: true }
    );
    if (!updatedReview) {
      res.status(204).json({
        success: false,
        message: "No review updated.",
        data: {}
      });
    } else {
      res.status(200).json({
        success: true,
        message: "Review updated.",
        data: updatedReview
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: "Error occured while updating the review.",
      err: err
    });
  }
};

const checkToggleLike = async (req, res, next) => {
  const likeBool = req.body.likeBool;
  if (likeBool == undefined) {
    res.status(400).json({
      success: false,
      message: "Like boolean was not received.",
      data: undefined
    });
    return;
  }
  next();
};

const toggleLike = async (req, res, next) => {
  try {
    const reviewId = req.params.reviewId;
    const userId = [req.params.userId];
    const likeBool = req.body.likeBool;

    if (!likeBool) {
      //add to userlikes array and increment like count
      const updatedReview = await Review.findOneAndUpdate(
        { _id: reviewId, userLikes: { $ne: userId } },
        {
          $addToSet: { userLikes: userId },
          $inc: { likeCount: 1 }
        },
        { new: true }
      );
      if (!updatedReview) {
        res.status(200).json({
          success: true,
          message: "No review found during liking.",
          data: {}
        });
      } else {
        res.status(200).json({
          success: true,
          message: "Successfully liked the review",
          data: updatedReview
        });
      }
    } else {
      //remove from userlikes array and decrement like count
      const updatedReview = await Review.findOneAndUpdate(
        { _id: reviewId, userLikes: { $in: userId } },
        {
          $pullAll: { userLikes: userId },
          $inc: { likeCount: -1 }
        },
        { new: true }
      );
      if (!updatedReview) {
        res.status(200).json({
          success: true,
          message: "No review found during un-liking.",
          data: {}
        });
      } else {
        res.status(200).json({
          success: true,
          message: "Successfully unliked the review",
          data: updatedReview
        });
      }
    }
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Error occured while un/liking the review.",
      err: err
    });
  }
};

const deleteReview = async (req, res, next) => {
  try {
    const reviewId = req.params.reviewId;
    const review = await Review.findByIdAndDelete(reviewId);
    if (review) {
      if (
        review.reviewImage &&
        (review.reviewImage !== "" ||
          review.reviewImage !== undefined ||
          review.reviewImage !== null)
      ) {
        await cloudinary.uploader.destroy(
          utils.getPublicId(review.reviewImage)
        );
      }
      res.status(200).json({
        success: true,
        message: "Review deleted.",
        data: review
      });
    } else {
      res.status(204).json({
        success: true,
        message: "Review not found during deletion.",
        data: {}
      });
    }
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Error occured while deleting the review.",
      err: err
    });
  }
};

module.exports = {
  checkUserParams,
  checkReviewParams,
  getReviewsByRecent,
  getReviewsByLikes,
  getOneReview,
  checkCreateReview,
  createReview,
  checkUpdateReview,
  updateReview,
  checkToggleLike,
  toggleLike,
  deleteReview
};
