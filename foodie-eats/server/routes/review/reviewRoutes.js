const express = require("express");
const reviewController = require("../../controllers/reviewController");
const reviewRouter = express.Router();


// update review
reviewRouter.patch("/update/:id", reviewController.updateReview);


module.exports = reviewRouter