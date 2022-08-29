const express = require("express")
const app = express()
const mongoose = require('mongoose')
const ReviewModel = require('./models/reviews');

const cors = require('cors');

app.use(express.json());
app.use(cors());

mongoose.connect(
    "mongodb+srv://allforone:2022sem2itp4llforone@all-for-one.p09tmlv.mongodb.net/foodie-eats?retryWrites=true&w=majority"
    );

    // limit the amount of searches
app.get("/getReviewsByRecent", (req, res) => {
    ReviewModel.find({}, (err, result) => {
        if (err) {
            res.json(err);
        } else {
            res.json(result);
        }
    }).limit(6);
});

app.get("/getReviewsByLikes", (req, res) => {
    ReviewModel.find({}, (err, result) => {
        if (err) {
            res.json(err);
        } else {
            res.json(result);
        }
    }).sort({"likeCount":-1}).limit(6);
});



app.listen(3001, () =>  {
    console.log("SERVER RUNS");
});

