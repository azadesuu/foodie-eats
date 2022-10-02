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
      .populate("userId")
      .lean()
      .clone();
  } catch (err) {
    next(err);
  }
};

const getMyBookmarks = async (req, res, next) => {
  const { bookmarks } = req.body.bookmarks;
  try {
    await Review.find({ _id: { $in: bookmarks } }, function(err, result) {
      if (err) {
        res.json("bookmarks not found");
        return;
      } else {
        res.status(200).json({
          success: true,
          data: result
        });
      }
    })
      .populate("userId")
      .lean();
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
      { username: newUsername, email: newEmail, bio: newBio, image: newImage },
      function(err, result) {
        if (err) {
          res.json("update error for user");
          return;
        } else {
          res.status(200).json({
            success: true,
            data: result
          });
        }
      }
    );
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
          res.json("password update error for user");
        } else {
          res.status(200).json({
            success: true,
            data: result
          });
        }
      }
    );
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
      { theme: newTheme },
      async (err, result, next) => {
        if (err) {
          next(err);
        } else {
          res.status(200).json({
            success: true,
            data: result
          });
        }
      }
    );
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getUser,
  getProfile,
  getMyReviews,
  getMyBookmarks,
  updateUser,
  updatePassword,
  changeTheme
};
