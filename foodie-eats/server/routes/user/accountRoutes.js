const express = require("express");
const accountRouter = express.Router();
const User = require("../../models/user");
const Review = require("../../models/review");

const accountController = require("../../controllers/accountController");

//get User by Id
accountRouter.get("/:userId", async (req, res, next) => {
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
});

// My Reviews
accountRouter.get("/myReviews/:userId", async (req, res) => {
  await Review.find({ userId: req.params.userId }, (err, result) => {
    if (err) {
      res.json(err);
    } else {
      res.status(200).json({
        success: true,
        data: result
      });
    }
  })
    .lean()
    .clone();
});

//get profile by username
accountRouter.get("/profile/:username", async (req, res, next) => {
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

accountRouter.patch("/changeTheme/:userId", async (req, res) => {
  console.log(req.body);
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
    res.json(err);
  }
});

accountRouter.patch("/my-bookmarks", async (req, res) => {
  const { bookmarks } = req.body.bookmarks;

  try {
    await Review.find({ _id: { $in: bookmarks } }, function(err, result, next) {
      if (err) {
        console.log("bookmarks not found");
      } else {
        res.status(200).json({
          success: true,
          data: result
        });
      }
    });
  } catch (err) {
    next(err);
  }
});

accountRouter.put("/changePassword/:userId", async (req, res) => {
  const _id = req.params.userId;
  try {
    const user = await User.findOne({ _id: userId }, function(
      err,
      result,
      next
    ) {
      if (err) {
        next(err);
      } else {
        res.status(200).json({
          success: true,
          data: result
        });
      }
    });

    if (!user) {
      res.send("user not found");
      return;
    }

    if (user.validPassword(oldPassword)) {
      await User.findByIdAndUpdate(
        _id,
        { password: user.generateHash(req.body.newpassword) },
        function(err, result, next) {
          if (err) {
            console.log("user is not found");
          } else {
            res.status(200).json({
              success: true,
              data: result
            });
          }
        }
      ).clone();
    } else {
      res.send("old password does not match.");
    }
  } catch (err) {
    next(err);
  }
});

module.exports = accountRouter;
