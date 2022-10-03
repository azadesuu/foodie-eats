const express = require("express");
// const reviewController = require("../../controllers/reviewController");
const reviewRouter = express.Router();
const Review = require("../../models/review");
const User = require("../../models/user");
const reviewController = require("../../controllers/reviewController");

//GET reviews by recent
reviewRouter.get("/getReviewsByRecent", reviewController.getReviewsByRecent);
//GET reviews by most liked
reviewRouter.get("/getReviewsByLikes", reviewController.getReviewsByLikes);

//GET one review by reviewId
reviewRouter.get("/getReview/:reviewId", reviewController.getOneReview);

//PUT review upon creation
reviewRouter.put("/createReview", reviewController.createReview);

// PATCH a review by id upon edit
reviewRouter.patch("/updateReview", reviewController.updateReview);

//PATCH review according to like boolean -- toggle like
reviewRouter.patch("/like/:userId/:reviewId", async (req, res, next) => {
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
});

//PATCH review according to flag boolean -- toggle flag
reviewRouter.patch("/flag/:userId/:reviewId", async (req, res, next) => {
  try {
    const reviewId = req.params.reviewId;
    const userId = [req.params.userId];
    const flagBool = req.body.flagBool;

    if (!flagBool) {
      //add to flagged array and increment flag  count
      await Review.findOneAndUpdate(
        { _id: reviewId, flagged: { $ne: userId } },
        {
          $addToSet: { flagged: userId },
          $inc: { flagCount: 1 }
        },
        { new: true },
        (err, updatedReview) => {
          if (err) {
            res.json(err);
            return;
          }
          console.log(updatedReview);

          res.status(200).json({
            success: true,
            data: updatedReview
          });
        }
      ).clone();
    } else {
      //remove from flagged array and decrement flag count
      await Review.findOneAndUpdate(
        { _id: reviewId, flagged: { $in: userId } },
        {
          $pullAll: { flagged: userId },
          $inc: { flagCount: -1 }
        },
        { new: true },
        (err, updatedReview) => {
          if (err) {
            res.json(err);
            return;
          }
          console.log(updatedReview);
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
});

//GET by search values -- restaurantname, rating, pricerange, postcode, tags
reviewRouter.get("/search", async (req, res, next) => {
  try {
    const search = req.body.search;
    const rating = req.body.rating;
    const priceRange = req.body.priceRange;
    const tags = req.body.tags;
    const postcode = req.body.postcode;

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
      } else if (value !== undefined && value !== null && value !== []) {
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
});

// GET most recent  review -- for testing purposes
reviewRouter.get("/getReview", (req, res, next) => {
  Review.find({}, (err, result) => {
    if (err) {
      res.json(err);
      return;
    } else {
      res.json(result);
    }
  })
    .sort({ $natural: -1 })
    .populate("userId")
    .limit(1);
});
module.exports = reviewRouter;
