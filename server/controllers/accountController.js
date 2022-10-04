const Review = require("../models/review");
const User = require("../models/user");

const getUser = async (req, res, next) => {
  try {
    const userInfo = await User.findOne({
      _id: req.params.userId
    }).lean();

    if (!userInfo) {
      next({ name: "CastError" });
      return;
    }
    res.status(200).json({
      success: true,
      data: { username: userInfo.username }
    });
  } catch (err) {
    next(err);
  }
};

const getProfile = async (req, res, next) => {
  try {
    const userInfo = await User.findOne({
      username: req.params.username
    }).lean();

    if (!userInfo) {
      next({ name: "CastError" });
      return;
    }
    res.status(200).json({
      success: true,
      data: userInfo
    });
  } catch (err) {
    next(err);
  }
};

const getMyReviews = async (req, res, next) => {
  try {
    await Review.find({ userId: req.params.userId }, (err, result) => {
      if (err) {
        res.json(err);
        return;
      } else {
        res.status(200).json({
          success: true,
          data: result
        });
      }
    })
      .sort({ $natural: -1 })
      .populate("userId")
      .lean()
      .clone();
  } catch (err) {
    next(err);
  }
};

const getMyReviewsSearch = async (req, res, next) => {
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
        //do nothing
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
};

const getMyBookmarks = async (req, res, next) => {
  const bookmarks = req.body.bookmarks;
  try {
    await Review.find({ _id: { $in: bookmarks } }, function(err, result) {
      if (err) {
        res.json("bookmarks not found");
        return;
      }
      res.status(200).json({
        success: true,
        data: result
      });
    })
      .clone()
      .sort({ $natural: -1 })
      .populate("userId")
      .lean();
  } catch (err) {
    next(err);
  }
};

const getMyBookmarksSearch = async (req, res, next) => {
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
        //do nothing
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
};

const bookmarkReview = async (req, res, next) => {
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
      ).clone();
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
};

const updateUser = async (req, res, next) => {
  const _id = req.params.userId;
  const newUsername = req.body.username;
  const newEmail = req.body.email;
  const newImage = req.body.image;
  const newBio = req.body.bio;

  try {
    await User.findByIdAndUpdate(
      _id,
      {
        $set: {
          username: newUsername,
          email: newEmail,
          bio: newBio,
          image: newImage
        }
      },
      (err, result, next) => {
        if (err) {
          res.status(500).json({ error: err.message });
          return;
        }
        res.status(200).json({
          success: true,
          data: result
        });
      }
    ).clone();
  } catch (err) {
    next(err);
  }
};

const updatePassword = async (req, res, next) => {
  const _id = req.body._id;
  const newPassword = req.body.password;

  try {
    await User.findByIdAndUpdate(
      _id,
      { password: User.generateHash(newPassword) },
      function(err, result) {
        if (err) {
          res.status(500).json({ error: err.message });
          return;
        }
        res.status(200).json({
          success: true,
          data: result
        });
      }
    ).clone();
  } catch (err) {
    next(err);
  }
};

const changeTheme = async (req, res, next) => {
  const _id = req.params.userId;
  const newTheme = req.body.newTheme;

  try {
    await User.findByIdAndUpdate(
      _id,
      { $set: { theme: newTheme } },
      { new: false },
      (err, result) => {
        if (err) {
          next(err);
          return;
        }
        res.status(200).json({
          success: true,
          data: result
        });
      }
    ).clone();
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getUser,
  getProfile,
  getMyReviews,
  getMyReviewsSearch,
  getMyBookmarks,
  getMyBookmarksSearch,
  bookmarkReview,
  updateUser,
  updatePassword,
  changeTheme
};
