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
    required: true
  },
  restaurantName: {
    type: String
  },
  price_range:{
    type: Number,
      min: 1,
      max: 4,
      default:1,
      required:true
  },
  rating: {
      type: Number,
      min: 0,
      max: 5,
      default:0,
      required:true
  },  
  description: {
    type:String,
  },
  images:{
    type: [String]
  },
  address:{
    type: String,
    default: "",
    required:true
  },
  public:{
    type: Boolean,
    default: false,
    required: true
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
  },
  flagged: {
    type: Boolean,
    default: false,
    required: true
  },
  flagCount: {
    type: Int,
    default:0,
    requireD: true
  }

});

// compile the Schema into a Model
const Order = mongoose.model("review", reviewSchema);

module.exports = Review;
