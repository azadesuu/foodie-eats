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
accountRouter.get("/myReviews/:userId", accountController.getMyReviews);

// GET reviews from bookmarks list -- returns a list of reviews from the bookmarks
accountRouter.get("/my-bookmarks", accountController.getMyBookmarks);

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
