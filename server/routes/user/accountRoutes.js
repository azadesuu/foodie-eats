const express = require("express");
const accountRouter = express.Router();
const User = require("../../models/user");
const Review = require("../../models/review");
const accountController = require("../../controllers/accountController");

// GET User by Id --- returns a user if they exist in the database
accountRouter.get("/:userId", accountController.getUser);

// GET profile by username --- returns a user if they exist in the database
accountRouter.get("/profile/:username", accountController.getProfile);

// GET reviews by Id --- returns list of reviews with the associated user ID
accountRouter.get("/my-reviews/:userId", accountController.getMyReviews);

//GET by search values -- restaurantname, rating, pricerange, postcode, tags
accountRouter.get("/my-reviews/:userId/search", async (req, res, next) => {
  try {
    const search = req.body.search;
    const rating = req.body.rating;
    const priceRange = req.body.priceRange;
    const tags = req.body.tags;

    const oriQuery = {
      userId: req.params.userId,
      restaurantName: { $regex: search, $options: "i" },
      rating: rating,
      priceRange: priceRange,
      tags: { $in: tags.map(t => new RegExp(t)) }
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

// GET reviews from bookmarks list -- returns a list of reviews from the bookmarks
accountRouter.get("/my-bookmarks", accountController.getMyBookmarks);

accountRouter.get("/my-bookmarks/:userId/search", async (req, res, next) => {
  try {
    const search = req.body.search;
    const rating = req.body.rating;
    const priceRange = req.body.priceRange;
    const tags = req.body.tags;
    const postcode = req.body.postcode;

    const oriQuery = {
      _id: { $in: bookmarks },
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

// PATCH user to add bookmarks to array if boolean is true
accountRouter.patch("/bookmark/:reviewId/:userId", async (req, res, next) => {
  try {
    const reviewId = [req.params.reviewId];
    const userId = req.params.userId;
    const bookmarkedBool = req.body.bookmarkedBool;

    if (!bookmarkedBool) {
      //add to bookmarks array
      await User.findByIdAndUpdate(
        userId,
        { $addToSet: { bookmarks: reviewId } },
        (err, updatedUser, next) => {
          if (err) {
            res.json(err);
            return;
          }
          res.status(200).json({
            success: true,
            data: updatedUser
          });
        }
      ).clone;
    } else {
      //remove from bookmarks array
      await User.findByIdAndUpdate(
        userId,
        { $pullAll: { bookmarks: reviewId } },
        (err, updatedUser, next) => {
          if (err) {
            res.json(err);
            return;
          }
          res.status(200).json({
            success: true,
            data: updatedUser
          });
        }
      ).clone();
    }
  } catch (err) {
    next(err);
  }
});

// PATCH profile by userId -- Updates the user profile with new data and returns updated profile
accountRouter.patch("/updateUser/:userId", accountController.updateUser);

// PUT new password into profile -- returns user with updated password if they exist
accountRouter.put("/updatePassword", accountController.updatePassword);

// PATCH profile by userId -- Updates the user profile with new theme  and returns updated profile
accountRouter.patch("/changeTheme/:userId", accountController.changeTheme);

// gets a random user (for testing purposes)
accountRouter.get("/getUsers", async (req, res, next) => {
  try {
    await User.find({}, (err, result) => {
      if (err) {
        res.json(err);
      } else {
        res.status(200).json({
          success: true,
          data: result
        });
      }
    }).limit(1);
  } catch (err) {
    next(err);
  }
});

module.exports = accountRouter;
