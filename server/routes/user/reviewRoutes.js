const express = require("express");
// const reviewController = require("../../controllers/reviewController");
const reviewRouter = express.Router();
const reviewController = require("../../controllers/reviewController");
const authMiddleware = require("../../config/auth.js");

/**
 * @api {GET} /getReviewsByRecent Get Reviews sorted by most recent (public route)
 * @apiName GetReviewsByRecent
 * @apiGroup Reviews
 * @apiSuccess {Review[]} Review array of Review's info
 * @apiSuccessExample Successful Response:
 * HTTP/1.1 200 OK
 * {
 * "success": true,
 * "message": "Recent reviews found",
 * "data": [
 *   {
 *     "_id": "63599019a9ae328e3045dc1e",
 *     "userId": {
 *       "_id": "635670e0507f40f19a6e8d17",
 *       "profileImage": "https://res.cloudinary.com/dp32jvnit/image/upload/v1666813925/236090e8433513357c3af293697f50f6_quqvy7.png",
 *       "bio": "This person loves food too much to think of a bio right now!",
 *       "theme": "blueberry",
 *       "bookmarks": [
 *         "63599019a9ae328e3045dc1e"
 *       ],
 *       "admin": false,
 *       "date": "2022-10-24T11:02:56.275Z",
 *       "username": "celenesaw",
 *       "email": "azadesuu@gmail.com",
 *       "password": "$2b$10$gP0vMNjUJA7SHzu1BzQRXuqUMNYARdFaqefbEtEQ37wU3yIZ7APcu",
 *       "__v": 0
 *     },
 *     "dateVisited": "2022-10-15T00:00:00.000Z",
 *     "restaurantName": "Dragon Hot Pot",
 *     "address": {
 *       "streetAddress": "Elizabeth Street",
 *       "postcode": 3000,
 *       "state": "VIC",
 *       "suburb": "Melbourne",
 *       "country": "Australia",
 *       "_id": "63599019a9ae328e3045dc1f"
 *     },
 *     "priceRange": 2,
 *     "rating": 5,
 *     "description": "Malatang was super good!",
 *     "reviewImage": "https://res.cloudinary.com/dp32jvnit/image/upload/v1666813976/5fd3d974d73c2f8f779eae3ba2a1e36b_evnzlo.jpg",
 *     "isPublic": true,
 *     "tags": [],
 *     "userLikes": [
 *       "635670e0507f40f19a6e8d17"
 *     ],
 *     "likeCount": 1,
 *     "flagged": [],
 *     "flagCount": 0,
 *     "dateReviewed": "2022-10-26T19:52:57.062Z",
 *     "__v": 0
 *   }
 * }
 * ]
 *
 *
 */

//GET reviews by recent
reviewRouter.get("/getReviewsByRecent", reviewController.getReviewsByRecent);

/**
 * @api {GET} /getReviewsByLikes Get Reviews sorted by most likes (public route)
 * @apiName GetReviewsByLikes
 * @apiGroup Reviews
 * @apiSuccess {Review[]} Review array of Review's info
 * @apiSuccessExample Successful Response:
 * HTTP/1.1 200 OK
 * {
 * "success": true,
 * "message": "Most liked reviews found.",
 * "data": [
 *   {
 *     "_id": "63599019a9ae328e3045dc1e",
 *     "userId": {
 *       "_id": "635670e0507f40f19a6e8d17",
 *       "profileImage": "https://res.cloudinary.com/dp32jvnit/image/upload/v1666813925/236090e8433513357c3af293697f50f6_quqvy7.png",
 *       "bio": "This person loves food too much to think of a bio right now!",
 *       "theme": "blueberry",
 *       "bookmarks": [
 *         "63599019a9ae328e3045dc1e"
 *       ],
 *       "admin": false,
 *       "date": "2022-10-24T11:02:56.275Z",
 *       "username": "celenesaw",
 *       "email": "azadesuu@gmail.com",
 *       "password": "$2b$10$gP0vMNjUJA7SHzu1BzQRXuqUMNYARdFaqefbEtEQ37wU3yIZ7APcu",
 *       "__v": 0
 *     },
 *     "dateVisited": "2022-10-15T00:00:00.000Z",
 *     "restaurantName": "Dragon Hot Pot",
 *     "address": {
 *       "streetAddress": "Elizabeth Street",
 *       "postcode": 3000,
 *       "state": "VIC",
 *       "suburb": "Melbourne",
 *       "country": "Australia",
 *       "_id": "63599019a9ae328e3045dc1f"
 *     },
 *     "priceRange": 2,
 *     "rating": 5,
 *     "description": "Malatang was super good!",
 *     "reviewImage": "https://res.cloudinary.com/dp32jvnit/image/upload/v1666813976/5fd3d974d73c2f8f779eae3ba2a1e36b_evnzlo.jpg",
 *     "isPublic": true,
 *     "tags": [],
 *     "userLikes": [
 *       "635670e0507f40f19a6e8d17"
 *     ],
 *     "likeCount": 1,
 *     "flagged": [],
 *     "flagCount": 0,
 *     "dateReviewed": "2022-10-26T19:52:57.062Z",
 *     "__v": 0
 *   }
 * }
 * ]
 *
 *
 */

//GET reviews by most liked
reviewRouter.get("/getReviewsByLikes", reviewController.getReviewsByLikes);

/**
 * @api {GET} /getReview/:reviewIds Get review by the ID (public route)
 * @apiName GetOneReview
 * @apiGroup Reviews
 * @apiSuccess {Object} review Details
 * @apiSuccessExample Successful Response:
 * HTTP/1.1 200 OK
 * {
  "success": true,
  "message": "Review found",
  "data": {
    "_id": "6358307d6302d49ed6bf2f9d",
    "userId": {
      "_id": "6354ec00d7bf245d8940dc75",
      "profileImage": "none",
      "bio": "This person loves food too much to think of a bio right now!",
      "theme": "honeydew",
      "bookmarks": [],
      "admin": false,
      "date": "2022-10-23T07:23:44.397Z",
      "username": "review-test",
      "email": "review-test@mail.com",
      "password": "$2b$10$oYfxGzqOfwQbDKVJ13rQze9/4xorvYfqo7RIZj0BcSlTHxKLvzQPy",
      "__v": 0
    },
    "dateVisited": "2022-10-11T00:00:00.000Z",
    "restaurantName": "test",
    "address": {
      "streetAddress": "test",
      "postcode": 3000,
      "state": "VIC",
      "suburb": "test",
      "country": "Australia",
      "_id": "6358307d6302d49ed6bf2f9e"
    },
    "priceRange": 1,
    "rating": 2,
    "description": "test",
    "reviewImage": "",
    "isPublic": false,
    "tags": [],
    "userLikes": [],
    "likeCount": 0,
    "flagged": [],
    "flagCount": 0,
    "dateReviewed": "2022-10-25T18:52:45.313Z",
    "__v": 0
  }
}
 * 
 * 
 */
//GET one review by reviewId
reviewRouter.use("/getReview/:reviewId", reviewController.checkReviewParams);
reviewRouter.route("/getReview/:reviewId").get(reviewController.getOneReview);

/**
 * @api {PUT} /createReview Create Review
 * @apiName CreateReview
 * @apiGroup Reviews
 * @apiSuccess {Object} Created review's info
 * @apiSuccessExample Successful Response:
 * HTTP/1.1 200 OK
 * {
  "success": true,
  "message": "Review created.",
  "data": {
    "_id": "6358307d6302d49ed6bf2f9d",
    "userId": {
      "_id": "6354ec00d7bf245d8940dc75",
      "profileImage": "none",
      "bio": "This person loves food too much to think of a bio right now!",
      "theme": "honeydew",
      "bookmarks": [],
      "admin": false,
      "date": "2022-10-23T07:23:44.397Z",
      "username": "review-test",
      "email": "review-test@mail.com",
      "password": "$2b$10$oYfxGzqOfwQbDKVJ13rQze9/4xorvYfqo7RIZj0BcSlTHxKLvzQPy",
      "__v": 0
    },
    "dateVisited": "2022-10-11T00:00:00.000Z",
    "restaurantName": "test",
    "address": {
      "streetAddress": "test",
      "postcode": 3000,
      "state": "VIC",
      "suburb": "test",
      "country": "Australia",
      "_id": "6358307d6302d49ed6bf2f9e"
    },
    "priceRange": 1,
    "rating": 2,
    "description": "test",
    "reviewImage": "",
    "isPublic": false,
    "tags": [],
    "userLikes": [],
    "likeCount": 0,
    "flagged": [],
    "flagCount": 0,
    "dateReviewed": "2022-10-25T18:52:45.313Z",
    "__v": 0
  }
}
 * 
 * 
 */

//PUT review upon creation
reviewRouter.use("/createReview", authMiddleware.authenticateJWT);
reviewRouter.use("/createReview", authMiddleware.authenticateUser);
reviewRouter.use("/createReview", reviewController.checkCreateReview);
reviewRouter.route("/createReview").put(reviewController.createReview);

/**
 * @api {Patch} /updateReview Update or Edit review
 * @apiName UpdateReview
 * @apiGroup Reviews
 * @apiSuccess {Object} Updated review's info
 * @apiSuccessExample Successful Response:
 * HTTP/1.1 200 OK
 * {
 * "success": true,
 * "message": "Review updated.",
 * "data": {
 *   "_id": "6358307d6302d49ed6bf2f9d",
 *   "userId": {
 *     "_id": "6354ec00d7bf245d8940dc75",
 *     "profileImage": "none",
 *     "bio": "This person loves food too much to think of a bio right now!",
 *     "theme": "honeydew",
 *     "bookmarks": [],
 *     "admin": false,
 *     "date": "2022-10-23T07:23:44.397Z",
 *     "username": "review-test",
 *     "email": "review-test@mail.com",
 *     "password": "$2b$10$oYfxGzqOfwQbDKVJ13rQze9/4xorvYfqo7RIZj0BcSlTHxKLvzQPy",
 *     "__v": 0
 *   },
 *   "dateVisited": "2022-10-11T00:00:00.000Z",
 *   "restaurantName": "test",
 *   "address": {
 *     "streetAddress": "test",
 *     "postcode": 3000,
 *     "state": "VIC",
 *     "suburb": "test",
 *     "country": "Australia",
 *     "_id": "6358307d6302d49ed6bf2f9e"
 *   },
 *   "priceRange": 1,
 *   "rating": 2,
 *   "description": "test",
 *   "reviewImage": "",
 *   "isPublic": false,
 *   "tags": [],
 *   "userLikes": [],
 *   "likeCount": 0,
 *   "flagged": [],
 *   "flagCount": 0,
 *   "dateReviewed": "2022-10-25T18:52:45.313Z",
 *   "__v": 0
 * }
 * }
 *
 *
 */

// PATCH a review by id upon edit
// need user auth
reviewRouter.use("/updateReview", authMiddleware.authenticateJWT);
reviewRouter.use("/updateReview", authMiddleware.authenticateUser);
reviewRouter.use("/updateReview", reviewController.checkUpdateReview);
reviewRouter.route("/updateReview").patch(reviewController.updateReview);

/**
 * @api {PUT} /like/:userId/:reviewId Like review
 * @apiName CheckToggleLike
 * @apiGroup Reviews
 * @apiSuccess {Object} Liked review info
 * @apiSuccessExample Successful Response:
 * HTTP/1.1 200 OK
 * {
 * "success": true,
 * "message": "Successfully unliked the review",
 * "data": {
 *   "_id": "6354efecd7bf245d8940dd80",
 *   "userId": "6354ee5fd7bf245d8940dd69",
 *   "dateVisited": "2022-10-08T00:00:00.000Z",
 *   "restaurantName": "Hazel",
 *   "address": {
 *     "streetAddress": "164 Flinders Ln",
 *     "postcode": 3000,
 *     "state": "VIC",
 *     "suburb": "Melbourne",
 *     "country": "Australia",
 *     "_id": "6354efecd7bf245d8940dd81"
 *   },
 *   "priceRange": 4,
 *   "rating": 4,
 *   "description": "Restaurant test 3",
 *   "reviewImage": "",
 *   "isPublic": true,
 *   "tags": [],
 *   "userLikes": [],
 *   "likeCount": 0,
 *   "flagged": [],
 *   "flagCount": 0,
 *   "dateReviewed": "2022-10-23T07:40:28.415Z",
 *   "__v": 0
 * }
 * }
 *
 *
 */

//PATCH review according to like boolean -- toggle like
// need user auth
reviewRouter.use("/like/:userId/:reviewId", authMiddleware.authenticateJWT);
reviewRouter.use("/like/:userId/:reviewId", authMiddleware.authenticateUser);
reviewRouter.use("/like/:userId/:reviewId", reviewController.checkUserParams);
reviewRouter.use("/like/:userId/:reviewId", reviewController.checkReviewParams);
reviewRouter.use("/like/:userId/:reviewId", reviewController.checkToggleLike);
reviewRouter
  .route("/like/:userId/:reviewId")
  .patch(reviewController.toggleLike);

/**
 * @api {PUT} /delete/:reviewId Delete review
 * @apiName DeleteReview
 * @apiGroup Reviews
 * @apiSuccess {Object} Deleted review info
 * @apiSuccessExample Successful Response:
 * HTTP/1.1 200 OK
 * {
 * "success": true,
 * "message": "Review deleted.",
 * "data": {
 *   "_id": "636201b422b82257749397ab",
 *   "userId": "635a15574cdd41cf9c9c7d82",
 *   "dateVisited": "2022-11-01T00:00:00.000Z",
 *   "restaurantName": "testreview",
 *   "address": {
 *     "streetAddress": "test",
 *     "postcode": 3012,
 *     "state": "NT",
 *     "suburb": "test",
 *     "country": "Australia",
 *     "_id": "636201b422b82257749397ac"
 *   },
 *   "priceRange": 1,
 *   "rating": 5,
 *   "description": "testing review ",
 *   "reviewImage": "",
 *   "isPublic": false,
 *   "tags": [],
 *   "userLikes": [],
 *   "likeCount": 0,
 *   "flagged": [],
 *   "flagCount": 0,
 *   "dateReviewed": "2022-11-02T05:35:48.520Z",
 *   "__v": 0
 * }
 * }
 *
 *
 */

// delete review
// need user auth

reviewRouter.use("/delete/:reviewId", reviewController.checkReviewParams);
reviewRouter.use("/delete/:reviewId", authMiddleware.authenticateJWT);
reviewRouter.use("/delete/:reviewId", authMiddleware.authenticateUser);
reviewRouter.route("/delete/:reviewId").delete(reviewController.deleteReview);

module.exports = reviewRouter;
