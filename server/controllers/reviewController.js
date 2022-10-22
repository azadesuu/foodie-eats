const Review = require("../models/review");
const utils = require("../routes/utility");
const { cloudinary } = require("../config/cloudinary");

const getReviewsByRecent = async (req, res, next) => {
  try {
    const query =
      req.params.postcode !== "undefined"
        ? { "address.postcode": req.params.postcode, isPublic: true }
        : { isPublic: true };

    const reviews = await Review.find(query)
      .populate("userId")
      .lean()
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
};

const getReviewsByLikes = async (req, res, next) => {
  try {
    const query =
      req.params.postcode !== "undefined"
        ? { "address.postcode": req.params.postcode, isPublic: true }
        : { isPublic: true };

    const reviews = await Review.find(query)
      .lean()
      .limit(10)
      .populate("userId")
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
};

const getAllReviews = async (req, res, next) => {
  try {
    const reviews = await Review.find()
      .lean()
      .populate("userId")
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
};

const getReviewsBySearch = async (req, res, next) => {
  try {
    const search = req.body.search;
    const rating = req.body.rating;
    const priceRange = req.body.priceRange;
    const tags = req.body.tags;
    const postcode = req.params.postcode;

    const oriQuery = {
      restaurantName: { $regex: search, $options: "i" },
      rating: rating,
      priceRange: priceRange,
      tags: { $in: tags.map(t => new RegExp(t)) },
      postcode: postcode
    };

    const query = Object.entries(oriQuery).reduce((qry, [key, value]) => {
      if (key === "tags" && tags.length === 0) {
        //
      } else if (
        value !== undefined &&
        value !== "undefined" &&
        value !== null &&
        value !== []
      ) {
        qry[key] = value;
      }
      return qry;
    }, {});

    const reviews = await Review.find(query)
      .populate("userId")
      .lean()
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
};

const getOneReview = async (req, res, next) => {
  try {
    const review = await Review.findOne({ _id: req.params.reviewId })
      .populate("userId")
      .lean();

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
  const newDescription = req.body.description;

  const tempReview = new Review({
    userId: newUserId,
    restaurantName: newRestaurantName,
    reviewImage: newImage,
    isPublic: newIsPublic,
    priceRange: newPriceRange,
    rating: newRating,
    dateVisited: newDateVisited,
    address: newAddress,
    description: newDescription
  });

  try {
    const result = await tempReview.save();
    if (!result) {
      next({ name: "CastError" });
      return;
    }
    res.status(200).json({
      success: true,
      data: result
    });
  } catch {
    next(err);
  }
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
      images,
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
      next({ name: "CastError" });
      return;
    }
    res.status(200).json({
      success: true,
      data: updatedReview
    });
  } catch (err) {
    next(err);
  }
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
      res.status(200).json({
        success: true,
        data: updatedReview
      });
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
      res.status(200).json({
        success: true,
        data: updatedReview
      });
    }
  } catch (err) {
    next(err);
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
        data: review
      });
    }
  } catch (err) {
    res.status(500).json({});
  }
};

module.exports = {
  getReviewsByRecent,
  getReviewsByLikes,
  getAllReviews,
  getReviewsBySearch,
  getOneReview,
  createReview,
  updateReview,
  toggleLike,
  deleteReview
};
