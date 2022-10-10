const express = require("express");
const accountRouter = express.Router();
const User = require("../../models/user");
const accountController = require("../../controllers/accountController");

const { cloudinary } = require("../../config/cloudinary");
const upload = require("../../config/multer");
const utils = require("../utility");

// GET User by Id --- returns a user if they exist in the database
accountRouter.get("/:userId", accountController.getUser);

// GET profile by username --- returns a user if they exist in the database
accountRouter.get("/profile/:username", accountController.getProfile);

// GET reviews by Id --- returns list of reviews with the associated user ID
accountRouter.get("/my-reviews/:userId", accountController.getMyReviews);

// GET reviews by Id --- returns list of reviews with the associated user ID
accountRouter.get("/other-reviews/:userId", accountController.getReviews);

//GET my reviews by search values -- restaurantname, rating, pricerange, postcode, tags
accountRouter.post(
  "/my-reviews/:userId/search",
  accountController.getMyReviewsSearch
);

// GET reviews from bookmarks list -- returns a list of reviews from the bookmarks
accountRouter.post("/my-bookmarks/get", accountController.getMyBookmarks);

//GET my reviews by search values -- restaurantname, rating, pricerange, postcode, tags
accountRouter.post(
  "/my-bookmarks/:userId/search",
  accountController.getMyBookmarksSearch
);

// PATCH user to add bookmarks to array if boolean is true
accountRouter.patch(
  "/bookmark/:reviewId/:userId",
  accountController.bookmarkReview
);

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

// images
accountRouter.patch(
  "/uploadProfilePicture/:id",
  upload.single("image"),
  async (req, res, next) => {
    try {
      console.log(req.file);

      // Upload image to cloudinary

      const result = await cloudinary.uploader.upload(
        req.file.path,
        (err, result) => {
          if (err) {
            res.json("cloudinary didn't upload error");
            return;
          }
          console.log(result);
        }
      );
      const user = await User.findById(req.params.id);
      //deleting current profile image from database
      if (user.profileImage !== "") {
        await cloudinary.uploader.destroy(utils.getPublicId(user.profileImage));
      }
      await User.findByIdAndUpdate(
        req.params.id,
        {
          $set: {
            profileImage: result.secure_url
          }
        },
        (err, result) => {
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
  }
);

accountRouter.patch("/deleteProfilePicture/:id", async (req, res) => {
  try {
    let user = await User.findById(req.params.id);
    if (user.profileImage !== "") {
      await cloudinary.uploader.destroy(utils.getPublicId(user.profileImage));
    }

    await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          profileImage: ""
        }
      },
      (err, result) => {
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
    console.log(err);
  }
});

module.exports = accountRouter;
