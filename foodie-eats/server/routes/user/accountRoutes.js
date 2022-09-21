const express = require("express");
const accountRouter = express.Router();
const User = require("../../models/user");

const accountController = require("../../controllers/accountController");

// My Reviews
accountRouter.get("/myReviews/:userId", async (req, res) => {
  await Review.find({ userId: req.params.userId }, (err, result) => {
    if (err) {
      res.json(err);
    } else {
      console.log("info found");
      res.json(result);
    }
  })
    .lean()
    .clone();
});

accountRouter.get("/profile/:username", async (req, res) => {
  await User.find({ username: req.params.username }, (err, result) => {
    if (err) {
      res.json(err);
    } else {
      console.log("info found");
      res.status(200).json({
        success: true,
        data: result
      });
    }
  })
    .limit(1)
    .lean()
    .clone();
});

accountRouter.get("/my-profile/:username", async (req, res, next) => {
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
});

// finds the newest user
accountRouter.get("/getUsers", async (req, res) => {
  try {
    await User.find({}, (err, result) => {
      if (err) {
        res.json(err);
      } else {
        console.log("info found");
        res.status(200).json({
          success: true,
          data: result
        });
      }
    }).limit(1);
  } catch (err) {
    res.json(err);
  }
});

accountRouter.patch("/updateUser/:userId", async (req, res) => {
  const _id = req.params.userId;
  const newUsername = req.body.username;
  const newEmail = req.body.email;
  const newImage = req.body.image;
  const newBio = req.body.bio;

  await User.findByIdAndUpdate(
    _id,
    { username: newUsername, email: newEmail, bio: newBio, image: newImage },
    function(err, result) {
      if (err) {
        console.log("update error for user");
      } else {
        res.status(200).json({
          success: true,
          data: result
        });
      }
    }
  );
});

accountRouter.patch("/changeTheme/:userId", async (req, res) => {
  console.log(req.body);
  const _id = req.params.userId;
  const newTheme = req.body.newTheme;

  try {
    await User.findByIdAndUpdate(_id, { theme: newTheme }, (err, result) => {
      console.log("result");

      console.log(result);
      console.log("result-end");
    });
  } catch (err) {
    res.json(err);
  }
});

module.exports = accountRouter;
