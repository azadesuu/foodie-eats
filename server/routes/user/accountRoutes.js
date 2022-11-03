const express = require("express");
const accountRouter = express.Router();
const accountController = require("../../controllers/accountController");
const upload = require("../../config/multer");
const passport = require("passport");
const authMiddleware = require("../../config/auth.js");

// GET profile by username --- returns a user if they exist in the database
accountRouter.get("/profile/:username", accountController.checkUsernameParams);
accountRouter.get("/profile/:username", accountController.getProfile);

// GET reviews by Id --- returns list of reviews with the associated user ID
// need user auth
accountRouter.use("/my-reviews/:userId", accountController.checkUserParams);
accountRouter.get("/my-reviews/:userId", accountController.getMyReviews);

// GET reviews by Id --- returns list of reviews with the associated user ID
accountRouter.use("/other-reviews/:userId", accountController.checkUserParams);
accountRouter.get("/other-reviews/:userId", accountController.getReviews);

// GET reviews from bookmarks list -- returns a list of reviews from the bookmarks
// need user auth
accountRouter.use("/my-bookmarks/get", accountController.checkBookmarks);
accountRouter.route("/my-bookmarks/get").post(accountController.getMyBookmarks);

// PATCH user to add bookmarks to array if boolean is true
// need user auth
accountRouter.use(
  "/bookmark/:reviewId/:userId",
  accountController.checkUserParams
);
accountRouter.use(
  "/bookmark/:reviewId/:userId",
  accountController.checkReviewParams
);
accountRouter.use(
  "/bookmark/:reviewId/:userId",
  accountController.checkBookmarkReview
);
accountRouter
  .route("/bookmark/:reviewId/:userId")
  .patch(accountController.bookmarkReview);

// PATCH profile by userId -- Updates the user profile with new data and returns updated profile
// needs user auth
accountRouter.use("/updateUser/:userId", accountController.checkUserParams);
accountRouter.use("/updateUser/:userId", accountController.checkUpdateUser);
accountRouter.route("/updateUser/:userId").patch(accountController.updateUser);

// PUT new password into profile -- returns user with updated password if they exist
// user auth
accountRouter.use("/updatePassword", accountController.checkUpdatePassword);
accountRouter.route("/updatePassword").put(accountController.updatePassword);

// PATCH profile by userId -- Updates the user profile with new theme  and returns updated profile
// user auth
accountRouter.use("/changeTheme/:userId", accountController.checkChangeTheme);
accountRouter
  .route("/changeTheme/:userId")
  .patch(accountController.changeTheme);

// images
accountRouter.post(
  "/uploadNewImage",
  upload.single("image"),
  accountController.uploadNewImage
);

accountRouter.use("/deleteNewImage", accountController.checkImageURL);
accountRouter.post("/deleteNewImage", accountController.deleteNewImage);

// user auth
accountRouter.use(
  "/uploadProfileImage/:userId",
  accountController.checkUserParams
);
accountRouter.use(
  "/uploadProfileImage/:userId",
  accountController.checkImageURL
);
accountRouter
  .route("/uploadProfileImage/:userId")
  .post(accountController.uploadProfileImage);

// user auth
accountRouter.use(
  "/deleteProfileImage/:userId",
  accountController.checkUserParams
);
accountRouter.post(
  "/deleteProfileImage/:userId",
  accountController.deleteProfileImage
);

module.exports = accountRouter;
