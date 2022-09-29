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
    const reviews = await Review.find({})
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
      if (err) res.send(err);

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
      dateVisited,
      restaurantName,
      rating,
      description,
      images,
      address,
      tags
    } = req.body;

    const updatedReview = await Review.updateOne(
      { _id: req.body.id },
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
      },
      (err, updatedReview) => {
        if (err) res.json(err);
        res.status(200).json({
          success: true,
          data: updatedReview
        });
      }
    );
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
