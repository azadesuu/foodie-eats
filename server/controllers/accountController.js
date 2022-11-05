const Review = require("../models/review");
const User = require("../models/user");
const utils = require("../routes/utility");
const { cloudinary } = require("../config/cloudinary");

//regexs
const strongPassword = new RegExp("(?=.*[a-zA-Z])(?=.*[0-9])(?=.{8,})");
const validUsername = new RegExp(
  "^[a-zA-Z](_(?!(.|_))|.(?![_.])|[a-zA-Z0-9]){6,18}[a-zA-Z0-9]$"
);
const validEmail = new RegExp("[a-z0-9]+@[a-z]+.[a-z]{2,3}");

const checkUserParams = async (req, res, next) => {
  if (!req.params.userId) {
    res.status(400).json({
      success: false,
      message: "Review Id was not received.",
      data: undefined
    });
    return;
  }
  next();
};

const checkUsernameParams = async (req, res, next) => {
  if (!req.params.username) {
    res.status(400).json({
      success: false,
      message: "Username was not received.",
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
      message: "Review Id was not received.",
      data: undefined
    });
    return;
  }
  next();
};

// checkUsernameParams
const getProfile = async (req, res, next) => {
  try {
    const userInfo = await User.findOne({
      username: req.params.username
    }).lean();
    if (!userInfo) {
      res.status(204).json({
        success: true,
        message: "No user was found using username.",
        data: {}
      });
      return;
    } else {
      res.status(200).json({
        success: true,
        message: "User was found by username",
        data: userInfo
      });
    }
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Error occured while getting profile by username",
      err: err
    });
  }
};

// check userId
// public only
const getReviews = async (req, res, next) => {
  try {
    const reviews = await Review.find({
      userId: req.params.userId,
      isPublic: true
    })
      .sort({ $natural: -1 })
      .populate("userId")
      .lean();
    if (!reviews) {
      res.status(204).json({
        success: true,
        message: "No reviews found in other reviews.",
        data: {}
      });
    } else {
      res.status(200).json({
        success: true,
        message: "Other reviews found.",
        data: reviews
      });
    }
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Error occured while getting other reviews by id",
      err: err
    });
  }
};

// needs user auth
// checkUserParams
const getMyReviews = async (req, res, next) => {
  try {
    const reviews = await Review.find({
      userId: req.params.userId
    })
      .sort({ $natural: -1 })
      .populate("userId")
      .lean();
    if (!reviews) {
      res.status(204).json({
        success: true,
        message: "No reviews found in my reviews.",
        data: {}
      });
    } else {
      res.status(200).json({
        success: true,
        message: "My reviews found.",
        data: reviews
      });
    }
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Error occured while getting my reviews by id",
      err: err
    });
  }
};

const checkBookmarks = async (req, res, next) => {
  if (req.body.bookmarks == undefined) {
    res.status(400).json({
      success: false,
      message: "No list was received",
      data: undefined
    });
    return;
  }
  next();
};

const getMyBookmarks = async (req, res, next) => {
  const bookmarks = req.body.bookmarks;
  try {
    const bookmarksList = await Review.find({ _id: { $in: bookmarks } })
      .sort({ $natural: -1 })
      .populate("userId")
      .lean();

    if (!bookmarksList) {
      res.status(204).json({
        success: true,
        message: "No bookmarks found.",
        data: {}
      });
    } else {
      res.status(200).json({
        success: true,
        message: "My bookmarks found.",
        data: bookmarksList
      });
    }
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Error occured while getting my bookmarks.",
      err: err
    });
  }
};

const checkBookmarkReview = async (req, res, next) => {
  if (req.body.bookmarkedBool == undefined) {
    res.status(400).json({
      success: false,
      message: "Bookmarked bool was not received.",
      data: undefined
    });
    return;
  }
  next();
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
      if (!updatedUser) {
        res.status(204).json({
          success: true,
          message: "No user found.",
          data: {}
        });
      } else {
        res.status(200).json({
          success: true,
          message: "Review was bookmarked.",
          data: updatedUser
        });
      }
    } else {
      //remove from bookmarks array
      const updatedUser = await User.findByIdAndUpdate(userId, {
        $pullAll: { bookmarks: reviewId }
      });
      if (!updatedUser) {
        res.status(204).json({
          success: true,
          message: "No user found.",
          data: {}
        });
      } else {
        res.status(200).json({
          success: true,
          message: "Review was un-bookmarked.",
          data: updatedUser
        });
      }
    }
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Error occured while toggling bookmark.",
      err: err
    });
  }
};

const checkUpdateUser = async (req, res, next) => {
  const { username, email, bio } = req.body;
  //check if username and email is valid
  if (!username && !email && !bio) {
    res.status(204).json({
      success: true,
      message: "Nothing to update.",
      data: undefined
    });
    return;
  } else if (username || email) {
    if (username) {
      if (!validUsername.test(username?.toLowerCase().trim())) {
        res.status(400).json({
          success: false,
          message: "Username/Email is not valid.",
          data: undefined
        });
        return;
      }
    }

    if (email) {
      if (!validEmail.test(email?.toLowerCase().trim())) {
        res.status(400).json({
          success: false,
          message: "Username/Email is not valid.",
          data: undefined
        });
        return;
      }
    }
  }
  // check if bio is over the limit
  else if (bio) {
    if (bio.length > 150) {
      res.status(400).json({
        success: false,
        message: `Bio is over the character limit at ${bio.length}.`,
        data: undefined
      });
      return;
    }
  } else {
    // check if there is an existing user with the email
    if (username || email) {
      const oneUser = await User.findOne({
        $or: [
          { username: username.toLowerCase() },
          { email: email.toLowerCase() }
        ]
      });
      if (oneUser) {
        res.status(400).json({
          success: false,
          message: `Existing user with entered username/email.`,
          data: undefined
        });
      }
      return;
    }
  }
  next();
};

const updateUser = async (req, res, next) => {
  const _id = req.params.userId;
  const { username, email, bio } = req.body;

  try {
    const newUser = await User.findByIdAndUpdate(
      _id,
      {
        $set: {
          username: username,
          email: email,
          bio: bio
        }
      },
      { new: true }
    );
    if (!newUser) {
      res.status(204).json({
        success: true,
        message: "No user updated.",
        data: {}
      });
    } else {
      res.status(200).json({
        success: true,
        message: "Successfully updated user.",
        data: newUser
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: "Error occured while updating user.",
      err: err
    });
  }
};

const checkUpdatePassword = async (req, res, next) => {
  const { _id, oldPassword, password } = req.body;
  if (!_id || !password || !oldPassword) {
    res.status(400).json({
      success: false,
      message: "User/password is not defined.",
      data: undefined
    });
    return;
  } else if (!strongPassword.test(password)) {
    res.status(400).json({
      success: false,
      message: "Password is not strong enough.",
      data: undefined
    });
    return;
  }
  next();
};

const updatePassword = async (req, res, next) => {
  const _id = req.body._id;
  const oldPassword = req.body.oldPassword;
  const newPassword = req.body.password;

  try {
    const user = await User.findById(_id);
    if (!user) {
      res.status(204).json({
        success: true,
        message: "No user found, password not updated."
      });
      return;
    }
    // if the users password match
    if (user.validPassword(oldPassword)) {
      const result = await User.findByIdAndUpdate(_id, {
        password: user.generateHash(newPassword)
      });
      if (!result) {
        res.status(204).json({
          success: true,
          message: "Password wasn't updated.",
          data: {}
        });
      } else {
        res.status(200).json({
          success: false,
          message: "Successfully updated password.",
          data: result
        });
      }
    } else {
      res.status(400).json({
        success: false,
        message: "Passwords don't match."
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: "Error occured while updating password.",
      err: err
    });
  }
};

const checkChangeTheme = async (req, res, next) => {
  const { newTheme } = req.body;
  if (!newTheme) {
    res.status(400).json({
      success: false,
      message: "New theme is not defined.",
      data: undefined
    });
    return;
  }
  next();
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
      res.status(204).json({
        success: true,
        message: "No user found, theme not updated.",
        data: {}
      });
    } else {
      res.status(200).json({
        success: true,
        message: "Successfully updated theme.",
        data: result
      });
    }
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Error occured while updating theme.",
      err: err
    });
  }
};
const uploadNewImage = async (req, res, next) => {
  try {
    if (!req.file) {
      res.status(400).json({
        success: false,
        message: "Image file was not defined.",
        data: undefined
      });
      return;
    }
    // Upload image to cloudinary
    const result = await cloudinary.uploader.upload(req.file.path);
    if (!result) {
      res.status(204).json({
        success: true,
        message: "File was not valid. Nothing was uploaded",
        data: {}
      });
    } else {
      res.status(200).json({
        success: true,
        message: "Successfully uploaded. URL is returned.",
        data: result.secure_url
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: "Error occured while uploading image.",
      err: err
    });
  }
};

const checkImageURL = async (req, res, next) => {
  if (!req.body.url) {
    res.status(400).json({
      success: false,
      message: "Image url was not defined.",
      data: undefined
    });
    return;
  }
  next();
};

const deleteNewImage = async (req, res, next) => {
  try {
    // Upload image to cloudinary
    const result = await cloudinary.uploader.destroy(
      utils.getPublicId(req.body.url)
    );
    if (!result) {
      res.status(204).json({
        success: true,
        message: "No image found from cloudinary.",
        data: {}
      });
    } else {
      res.status(200).json({
        success: true,
        message: "Image deleted from cloudinary.",
        data: result
      });
    }
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Error occured while deleting image.",
      err: err
    });
  }
};

const uploadProfileImage = async (req, res, next) => {
  const url = req.body.url;
  try {
    const result = await User.findByIdAndUpdate(req.params.userId, {
      $set: {
        profileImage: url
      }
    });
    if (!result) {
      res.status(204).json({
        success: true,
        message: "No user found.",
        data: {}
      });
    } else {
      res.status(200).json({
        success: true,
        message: "Image was uploaded successfully",
        data: result
      });
    }
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Error occured while uploading image.",
      err: err
    });
  }
};

const deleteProfileImage = async (req, res, next) => {
  try {
    const result = await User.findByIdAndUpdate(req.params.userId, {
      $set: {
        profileImage: ""
      }
    });

    if (!result) {
      res.status(204).json({
        success: true,
        message: "No user found.",
        data: {}
      });
    } else {
      res.status(200).json({
        success: true,
        message: "User image was deleted successfully",
        data: result
      });
    }
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Error occured while deleting image.",
      err: err
    });
  }
};

module.exports = {
  checkUserParams,
  checkUsernameParams,
  checkReviewParams,
  getProfile,
  getReviews,
  getMyReviews,
  checkBookmarks,
  getMyBookmarks,
  checkBookmarkReview,
  bookmarkReview,
  checkUpdateUser,
  updateUser,
  checkUpdatePassword,
  updatePassword,
  checkChangeTheme,
  changeTheme,
  uploadNewImage,
  deleteNewImage,
  checkImageURL,
  uploadProfileImage,
  deleteProfileImage
};
