const mongoose = require("mongoose");

const addressSchema = new mongoose.Schema({
  street_address: {
    type: String,
    required: true
  },
  postcode: {
    type: Number,
    min: 3000,
    max: 3999,
    default: 3000,
    required: true
  },
  state: {
    type: String,
    default: "VIC",
    required: true
  },
  suburb: {
    type: String,
    default: "Melbourne",
    required: true
  },
  country: {
    type: String,
    default: "Australia"
  }
});
const reviewSchema = new mongoose.Schema({
  userId: {	
    type: mongoose.Schema.Types.ObjectId,	
    ref: "User",	
    //required: true
  },
  username: {
    type: String
  },
  dateReviewed: {
    type: Date,
    default: Date.now,
    required: true
  },
  dateVisited: {
    type: Date,
    default: Date.now
  },
  restaurantName: {
    type: String
  },
  address: addressSchema,
  priceRange: {
    type: Number,
    min: 1,
    max: 4,
    default: 1,
    required: true
  },
  rating: {
    type: Number,
    min: 1,
    max: 5,
    default: 1,
    required: true
  },
  description: {
    type: String,
    default: ""
  },
  images: {
    type: [String]
  },
  isPublic: {
    type: Boolean,
    default: false
  },
  tags: {
    type: [String],
    default: []
  },
  userLikes: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "User",
    default: []
  },
  likeCount: {
    type: Number,
    default: 0,
    required: true
  },
  flagged: {
    type: Boolean,
    default: false
  },
  flagCount: {
    type: [mongoose.Schema.Types.ObjectId],	
    ref: "User",	
    default: []
  }

});

// compile the Schema into a Model
const Review = mongoose.model("review", reviewSchema);
const Address = mongoose.model("address", addressSchema);

module.exports = Review;
