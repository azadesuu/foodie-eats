// model for the snack collection defined here
const mongoose = require("mongoose");


const reviewSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  dateReviewed: {
    type: Date,
    default: Date.now,
    required: true,
  },
  dateVisited: {
    type: Date,
  },
  restaurantName: {
    type: String
  },
  rating: {
    value: {
      type: Number,
      min: 0,
      max: 5,
    },
    comment: String,
  },
  images:{
    type: [String]
  },
  address:{
    type: String
  },
  public:{
    type: Boolean
  }
  ,
  tags: {
    type: [String],
    default: []
  },
  userLikes: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "User",
    required: true
  },
  likeCount : {
    type: Number,
    default: 0,
    required: true
  }
});

// compile the Schema into a Model
const Order = mongoose.model("review", reviewSchema);

module.exports = Review;
