const Review = require("../models/review");
const User = require("../models/user");

const getReviewsByRecent = async (req, res, next) => {
  try {
    const postcode = req.body.postcode ? req.body.postcode : 3000;
    const reviews = await Review.find({ postcode: postcode })
      .populate("userId")
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
};

const getReviewsByLikes = async (req, res, next) => {
  try {
    const postcode = req.body.postcode ? req.body.postcode : 3000;
    const reviews = await Review.find({ postcode: postcode })
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
  const newRating = req.body.rating;
  const newDateVisited = req.body.dateVisited;
  const newAddress = req.body.address;
  const newDescription = req.body.description;

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

  try {
    await tempReview.save(function(err, result) {
      if (err) {
        res.send(err);
        return;
      }
      res.status(200).json({
        success: true,
        data: result
      });
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
      description,
      images,
      address,
      tags
    } = req.body;

    await Review.findByIdAndUpdate(
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
          images: images,
          address: address,
          tags: tags
        }
      },
      { new: true },

      (err, updatedReview) => {
        if (err) {
          res.json(err);
          return;
        }
        res.status(200).json({
          success: true,
          data: updatedReview
        });
      }
    ).clone();
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getReviewsByRecent,
  getReviewsByLikes,
  getOneReview,
  createReview,
  updateReview
};
