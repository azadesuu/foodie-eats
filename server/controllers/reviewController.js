const Review = require("../models/review");
const User = require("../models/user");

const getReviewsByRecent = async (req, res, next) => {
  try {
    const query =
      req.params.postcode !== "undefined"
        ? { "address.postcode": req.params.postcode, publicBool: true }
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
        ? { "address.postcode": req.params.postcode, publicBool: true }
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

const toggleLike = async (req, res, next) => {
  try {
    const reviewId = req.params.reviewId;
    const userId = [req.params.userId];
    const likeBool = req.body.likeBool;

    if (!likeBool) {
      //add to userlikes array and increment like count
      await Review.findOneAndUpdate(
        { _id: reviewId, userLikes: { $ne: userId } },
        {
          $addToSet: { userLikes: userId },
          $inc: { likeCount: 1 }
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
    } else {
      //remove from userlikes array and decrement like count
      await Review.findOneAndUpdate(
        { _id: reviewId, userLikes: { $in: userId } },
        {
          $pullAll: { userLikes: userId },
          $inc: { likeCount: -1 }
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
    }
  } catch (err) {
    next(err);
  }
};

const deleteReview = async (req, res, next) => {
  try {
    const reviewId = req.params.reviewId;
    await Review.findByIdAndRemove(reviewId, (err, review) => {
      if (err) {
        res.json(err);
        return;
      } else {
        res.status(200).json({
          success: true,
          data: review
        });
      }
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getReviewsByRecent,
  getReviewsByLikes,
  getReviewsBySearch,
  getOneReview,
  createReview,
  updateReview,
  toggleLike,
  deleteReview
};
