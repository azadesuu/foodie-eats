const express = require("express")
const app = express()
const mongoose = require('mongoose')
const UserModel = require('./models/user');

const cors = require('cors');

app.use(express.json());
app.use(cors());

// "mongodb+srv://firstcluster:firstcluster123@cluster0.rgsh4ga.mongodb.net/communitypage?retryWrites=true&w=majority"
mongoose.connect(
    "mongodb+srv://allforone:2022sem2itp4llforone@all-for-one.p09tmlv.mongodb.net/foodie-eats?retryWrites=true&w=majority"
    
    );

// get 1 user
app.get("/getUsers", (req, res) => {
    UserModel.find({}, (err, result) => {
        if (err) {
            res.json(err);
        } else {
            console.log("info found");
            res.json(result);
        }
    }).limit(1);
});


app.put('/updateUser', async (req, res) => {
    const _id = req.body._id;
    const newUsername = req.body.username;
    const newEmail = req.body.email;
    UserModel.findByIdAndUpdate(_id, {username: newUsername, email: newEmail}, function(err, result) {
        if (err) {
            console.log("update error for user")
        } else {
            res.send(result);
        }
    }
    );
});

/*
app.put('/updateUser', async (req, res) => {
    const id = req.body.id;
    const newUsername = req.body.username;
    const newEmail = req.body.email;

    try {
        await UserModel.findById(id, (error, userToUpdate) => {
            console.log("inside");
            userToUpdate.username = newUsername;
            console.log("inside2");
            userToUpdate.email = newEmail;
            console.log("inside3");
            userToUpdate.save();
            console.log("inside4");
        });

    } catch (err) {
        console.log("update error for user")
    }

    res.send("updated")
});
*/

app.listen(3001, () =>  {
    console.log("SERVER RUNS");
});

