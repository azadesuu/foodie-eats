const Review = require("../models/review");
const User = require("../models/user");

const utils = require("../routes/utility");
const { cloudinary } = require("../config/cloudinary");
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

const getReviews = async (req, res, next) => {
  try {
    const reviews = await Review.find({
      userId: req.params.userId,
      isPublic: true
    })
      .sort({ $natural: -1 })
      .populate("userId")
      .lean();
    res.status(200).json({
      success: true,
      data: reviews
    });
  } catch (err) {
    next(err);
  }
};

const getMyReviews = async (req, res, next) => {
  try {
    const reviews = await Review.find({
      userId: req.params.userId
    })
      .sort({ $natural: -1 })
      .populate("userId")
      .lean();
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
    const bookmarksList = await Review.find({ _id: { $in: bookmarks } })
      .sort({ $natural: -1 })
      .populate("userId")
      .lean();
    res.status(200).json({
      success: true,
      data: bookmarksList
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
      const updatedUser = await User.findByIdAndUpdate(userId, {
        $addToSet: { bookmarks: reviewId }
      });
      res.status(200).json({
        success: true,
        data: updatedUser
      });
    } else {
      //remove from bookmarks array
      const updatedUser = await User.findByIdAndUpdate(userId, {
        $pullAll: { bookmarks: reviewId }
      });
      res.status(200).json({
        success: true,
        data: updatedUser
      });
    }
  } catch (err) {
    next(err);
  }
};

const updateUser = async (req, res, next) => {
  const _id = req.params.userId;
  const newUsername = req.body.username;
  const newEmail = req.body.email;
  const newBio = req.body.bio;

  try {
    const oneUser = await User.findOne({
      $or: [{ username: req.body.username }, { email: req.body.email }]
    });
    if (oneUser) {
      throw "Username or email is taken.";
    }
    const newUser = await User.findByIdAndUpdate(
      _id,
      {
        $set: {
          username: newUsername,
          email: newEmail,
          bio: newBio
        }
      },
      { new: false }
    );
    res.status(200).json({
      success: true,
      data: newUser
    });
  } catch (err) {
    return res.status(500).json(err);
  }
};

const updatePassword = async (req, res, next) => {
  const _id = req.body._id;
  const newPassword = req.body.password;

  try {
    await User.findByIdAndUpdate(_id, {
      password: User.generateHash(newPassword)
    });
    if (!result) {
      next({ name: "CastError" });
      return;
    }
    res.status(200).json({
      success: true,
      data: result
    });
  } catch (err) {
    next(err);
  }
};

const changeTheme = async (req, res, next) => {
  const _id = req.params.userId;
  const newTheme = req.body.newTheme;

  try {
    const result = await User.findByIdAndUpdate(
      _id,
      { $set: { theme: newTheme } },
      { new: false }
    );
    if (!result) {
      next({ name: "CastError" });
      return;
    }
    res.status(200).json({
      success: true,
      data: result
    });
  } catch (err) {
    next(err);
  }
};

const uploadNewImage = async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(501).json("File not found.");
    }
    // Upload image to cloudinary
    const result = await cloudinary.uploader.upload(req.file.path);
    if (!result) {
      next({ name: "CastError" });
      return;
    }
    res.status(200).json({
      success: true,
      data: result.secure_url
    });
  } catch (err) {
    next(err);
  }
};

const deleteNewImage = async (req, res, next) => {
  try {
    if (!req.body.url) {
      return res.status(401).json("URL not found.");
    }
    // Upload image to cloudinary
    const result = await cloudinary.uploader.destroy(
      utils.getPublicId(req.body.url)
    );
    if (!result) {
      next({ name: "CastError" });
      return;
    }
    res.status(200).json({
      success: true,
      data: result
    });
  } catch (err) {
    return res.status(500).json(err);
  }
};

const uploadProfileImage = async (req, res, next) => {
  const _id = req.params.id;
  const url = req.body.url;
  if (!url) {
    return res.status(501).json("URL not found");
  }
  try {
    const result = await User.findByIdAndUpdate(_id, {
      $set: {
        profileImage: url
      }
    });
    if (!result) {
      next({ name: "CastError" });
      return;
    }
    return res.status(200).json({
      success: true,
      data: result
    });
  } catch (err) {
    return res.status(500).json(err);
  }
};

const deleteProfileImage = async (req, res, next) => {
  try {
    const result = await User.findByIdAndUpdate(req.params.id, {
      $set: {
        profileImage: ""
      }
    });

    if (!result) {
      next({ name: "CastError" });
      return;
    }
    res.status(200).json({
      success: true,
      data: result
    });
  } catch (err) {
    return res.status(500).json(err);
  }
};

module.exports = {
  getUser,
  getProfile,
  getReviews,
  getMyReviews,
  getMyBookmarks,
  bookmarkReview,
  updateUser,
  updatePassword,
  changeTheme,
  uploadNewImage,
  deleteNewImage,
  uploadProfileImage,
  deleteProfileImage
};
