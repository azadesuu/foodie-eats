const express = require("express");
const accountRouter = express.Router();
const User = require("../../models/user");

const accountController = require("../../controllers/accountController");

// finds the newest user
accountRouter.get("/getUsers", (req, res) => {
    User.find({}, (err, result) => {
        if (err) {
            res.json(err);
        } else {
            console.log("info found");
            res.json(result);
        }
    }).limit(1);
});


accountRouter.put('/updateUser', async (req, res) => {
    const _id = req.body._id;
    const newUsername = req.body.username;
    const newEmail = req.body.email;
    const newBio = req.body.bio;
    User.findByIdAndUpdate(_id, {username: newUsername, email: newEmail, bio: newBio}, function(err, result) {
        if (err) {
            console.log("update error for user")
        } else {
            res.send(result);
        }
    }
    );
});

accountRouter.put('/updatePassword', async (req, res) => {
    const _id = req.body._id;
    const newPassword = req.body.password;

    User.findByIdAndUpdate(_id, {password: newPassword}, function(err, result) {
        if (err) {
            console.log("update error for user")
        } else {
            res.send(result);
        }
    }
    );
});



module.exports = accountRouter