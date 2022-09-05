// model for the snack collection defined here
const mongoose = require("mongoose");


const addressSchema = new mongoose.Schema({
  street_address: {
    type: String,
    required: true
  },
  postcode: {
    type:Number,
    min:3000,
    max:3999,
    default:3000
  },
  state: {
    type:String,
    default: "Victoria"
  },
  suburb:{
    type: String,
    default:"Melbourne"
  },
  country: {
    type: String,
    default: "Australia"
  }
})
const reviewSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    // required: true,
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
  address: addressSchema,
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
    type: Number,
    default:0,
    requireD: true
  }

});

// compile the Schema into a Model
const Review = mongoose.model("review", reviewSchema);
const Address = mongoose.model("address", addressSchema);

module.exports = Review;
