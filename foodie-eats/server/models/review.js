const mongoose = require("mongoose");

const addressSchema = new mongoose.Schema({
  streetAddress: {
    type: String,
    default: ""
  },
  postcode: {
    type: Number,
    min: 3000,
    max: 3999,
    default: 3000
  },
  state: {
    type: String,
    default: "Victoria"
  },
  suburb: {
    type: String,
    default: "Melbourne"
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
    required: true
  },
  username: {
    type: String
  },
  dateReviewed: {
    type: Date,
    default: Date.now
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
    default: 1
  },
  rating: {
    type: Number,
    min: 1,
    max: 5,
    default: 1
  },
  description: {
    type: String,
    default: ""
  },
  images: {
    type: [String],
    default: []
  },
  public: {
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
    default: 0
  },
  flagged: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "User",
    default: []
  },
  flagCount: {
    type: Number,
    default: 0
  }
});

// compile the Schema into a Model
const Review = mongoose.model("review", reviewSchema);
const Address = mongoose.model("address", addressSchema);

module.exports = Review;
