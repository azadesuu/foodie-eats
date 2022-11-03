const express = require("express");
const accountRouter = express.Router();
const accountController = require("../../controllers/accountController");
const upload = require("../../config/multer");
const passport = require("passport");
const authMiddleware = require("../../config/auth.js");

/**
 * @api {get} /profile/:username Gets the specified profile by username from MongoDB database
 * @apiName GetProfile
 * @apiGroup Users
 * @apiSuccess {User} user info
 * @apiSuccessExample Successful Response:
 * HTTP/1.1 200 OK
 * {
    "success": true,
    "message": "User was found by username",
    "data": {
      "_id": "6354ee5fd7bf245d8940dd69",
      "profileImage": "none",
      "bio": "This person loves food too much to think of a bio right now!",
      "theme": "honeydew",
      "bookmarks": [],
      "admin": false,
      "date": "2022-10-23T07:33:51.200Z",
      "username": "claudya",
      "email": "claudya@mail.com",
      "password": "$2b$10$F2amVs6WJoW8mXUc.f7qauqWERvsr3db.PebrgsH1I/vJaH62JjCe",
      "__v": 0
    }
  }
 * 
 * 
 */

// GET profile by username --- returns a user if they exist in the database
accountRouter.get("/profile/:username", accountController.checkUsernameParams);
accountRouter.get("/profile/:username", accountController.getProfile);

/**
 * @api {get} /my-reviews/:userId Gets my list of reviews with the associated user ID from MongoDB database
 * @apiName GetMyReviews
 * @apiGroup Users
 * @apiSuccess {Reviews[]} Review list
 * @apiSuccessExample Successful Response:
 * HTTP/1.1 200 OK
 * {
  "success": true,
  "message": "My reviews found.",
  "data": [
    {
      "_id": "6354f071d7bf245d8940dd95",
      "userId": {
        "_id": "6354ee5fd7bf245d8940dd69",
        "profileImage": "none",
        "bio": "This person loves food too much to think of a bio right now!",
        "theme": "honeydew",
        "bookmarks": [],
        "admin": false,
        "date": "2022-10-23T07:33:51.200Z",
        "username": "claudya",
        "email": "claudya@mail.com",
        "password": "$2b$10$F2amVs6WJoW8mXUc.f7qauqWERvsr3db.PebrgsH1I/vJaH62JjCe",
        "__v": 0
      },
      "dateVisited": "2022-10-12T00:00:00.000Z",
      "restaurantName": "Palermo Restaurant",
      "address": {
        "streetAddress": "401 Little Bourke St",
        "postcode": 3000,
        "state": "VIC",
        "suburb": "Melbourne CBD",
        "country": "Australia",
        "_id": "6354f071d7bf245d8940dd96"
      },
      "priceRange": 2,
      "rating": 2,
      "description": "Restaurant test 6",
      "reviewImage": "",
      "isPublic": true,
      "tags": [],
      "userLikes": [],
      "likeCount": 0,
      "flagged": [],
      "flagCount": 0,
      "dateReviewed": "2022-10-23T07:42:41.647Z",
      "__v": 0
    },
    {
      "_id": "6354f048d7bf245d8940dd8e",
      "userId": {
        "_id": "6354ee5fd7bf245d8940dd69",
        "profileImage": "none",
        "bio": "This person loves food too much to think of a bio right now!",
        "theme": "honeydew",
        "bookmarks": [],
        "admin": false,
        "date": "2022-10-23T07:33:51.200Z",
        "username": "claudya",
        "email": "claudya@mail.com",
        "password": "$2b$10$F2amVs6WJoW8mXUc.f7qauqWERvsr3db.PebrgsH1I/vJaH62JjCe",
        "__v": 0
      },
      "dateVisited": "2022-10-15T00:00:00.000Z",
      "restaurantName": "Florentino",
      "address": {
        "streetAddress": "80 Bourke St",
        "postcode": 3000,
        "state": "VIC",
        "suburb": "Melbourne CBD",
        "country": "Australia",
        "_id": "6354f048d7bf245d8940dd8f"
      },
      "priceRange": 4,
      "rating": 3,
      "description": "Restaurant test 5",
      "reviewImage": "",
      "isPublic": true,
      "tags": [],
      "userLikes": [],
      "likeCount": 0,
      "flagged": [],
      "flagCount": 0,
      "dateReviewed": "2022-10-23T07:42:00.578Z",
      "__v": 0
    }
  } 
 * 
 * 
 */

// GET reviews by Id --- returns list of reviews with the associated user ID
// need user auth
accountRouter.use("/my-reviews/:userId", accountController.checkUserParams);
accountRouter.get("/my-reviews/:userId", accountController.getMyReviews);

/**
 * @api {get} /other-reviews/:userId Gets a list of reviews for the associated user ID from MongoDB database
 * @apiName GetReviews
 * @apiGroup Users
 * @apiSuccess {Reviews[]} Review list
 * @apiSuccessExample Successful Response:
 * HTTP/1.1 200 OK
 * {
  "success": true,
  "message": "bookmarks found.",
  "data": [
    {
      "_id": "6354f071d7bf245d8940dd95",
      "userId": {
        "_id": "6354ee5fd7bf245d8940dd69",
        "profileImage": "none",
        "bio": "This person loves food too much to think of a bio right now!",
        "theme": "honeydew",
        "bookmarks": [],
        "admin": false,
        "date": "2022-10-23T07:33:51.200Z",
        "username": "claudya",
        "email": "claudya@mail.com",
        "password": "$2b$10$F2amVs6WJoW8mXUc.f7qauqWERvsr3db.PebrgsH1I/vJaH62JjCe",
        "__v": 0
      },
      "dateVisited": "2022-10-12T00:00:00.000Z",
      "restaurantName": "Palermo Restaurant",
      "address": {
        "streetAddress": "401 Little Bourke St",
        "postcode": 3000,
        "state": "VIC",
        "suburb": "Melbourne CBD",
        "country": "Australia",
        "_id": "6354f071d7bf245d8940dd96"
      },
      "priceRange": 2,
      "rating": 2,
      "description": "Restaurant test 6",
      "reviewImage": "",
      "isPublic": true,
      "tags": [],
      "userLikes": [],
      "likeCount": 0,
      "flagged": [],
      "flagCount": 0,
      "dateReviewed": "2022-10-23T07:42:41.647Z",
      "__v": 0
    },
    {
      "_id": "6354f048d7bf245d8940dd8e",
      "userId": {
        "_id": "6354ee5fd7bf245d8940dd69",
        "profileImage": "none",
        "bio": "This person loves food too much to think of a bio right now!",
        "theme": "honeydew",
        "bookmarks": [],
        "admin": false,
        "date": "2022-10-23T07:33:51.200Z",
        "username": "claudya",
        "email": "claudya@mail.com",
        "password": "$2b$10$F2amVs6WJoW8mXUc.f7qauqWERvsr3db.PebrgsH1I/vJaH62JjCe",
        "__v": 0
      },
      "dateVisited": "2022-10-15T00:00:00.000Z",
      "restaurantName": "Florentino",
      "address": {
        "streetAddress": "80 Bourke St",
        "postcode": 3000,
        "state": "VIC",
        "suburb": "Melbourne CBD",
        "country": "Australia",
        "_id": "6354f048d7bf245d8940dd8f"
      },
      "priceRange": 4,
      "rating": 3,
      "description": "Restaurant test 5",
      "reviewImage": "",
      "isPublic": true,
      "tags": [],
      "userLikes": [],
      "likeCount": 0,
      "flagged": [],
      "flagCount": 0,
      "dateReviewed": "2022-10-23T07:42:00.578Z",
      "__v": 0
    }
  } 
 * 
 * 
 */

// GET reviews by Id --- returns list of reviews with the associated user ID
accountRouter.use("/other-reviews/:userId", accountController.checkUserParams);
accountRouter.get("/other-reviews/:userId", accountController.getReviews);

/**
 * @api {post} /my-bookmarks/get Gets a list of reviews from the bookmarks from MongoDB database
 * @apiName GetMyBookmarks
 * @apiGroup Users
 * @apiSuccess {Reviews[]} Review list
 * @apiSuccessExample Successful Response:
 * HTTP/1.1 200 OK
 * {
  "success": true,
  "message": "My bookmarks found.",
  "data": [
    {
      "_id": "63599019a9ae328e3045dc1e",
      "userId": {
        "_id": "635670e0507f40f19a6e8d17",
        "profileImage": "https://res.cloudinary.com/dp32jvnit/image/upload/v1666813925/236090e8433513357c3af293697f50f6_quqvy7.png",
        "bio": "This person loves food too much to think of a bio right now!",
        "theme": "blueberry",
        "bookmarks": [
          "63599019a9ae328e3045dc1e"
        ],
        "admin": false,
        "date": "2022-10-24T11:02:56.275Z",
        "username": "celenesaw",
        "email": "azadesuu@gmail.com",
        "password": "$2b$10$gP0vMNjUJA7SHzu1BzQRXuqUMNYARdFaqefbEtEQ37wU3yIZ7APcu",
        "__v": 0
      },
      "dateVisited": "2022-10-15T00:00:00.000Z",
      "restaurantName": "Dragon Hot Pot",
      "address": {
        "streetAddress": "Elizabeth Street",
        "postcode": 3000,
        "state": "VIC",
        "suburb": "Melbourne",
        "country": "Australia",
        "_id": "63599019a9ae328e3045dc1f"
      },
      "priceRange": 2,
      "rating": 5,
      "description": "Malatang was super good!",
      "reviewImage": "https://res.cloudinary.com/dp32jvnit/image/upload/v1666813976/5fd3d974d73c2f8f779eae3ba2a1e36b_evnzlo.jpg",
      "isPublic": true,
      "tags": [],
      "userLikes": [
        "635670e0507f40f19a6e8d17"
      ],
      "likeCount": 1,
      "flagged": [],
      "flagCount": 0,
      "dateReviewed": "2022-10-26T19:52:57.062Z",
      "__v": 0
    }
  ]
}
 * 
 * 
 */

  
// GET reviews from bookmarks list -- returns a list of reviews from the bookmarks
// need user auth
accountRouter.use("/my-bookmarks/get", accountController.checkBookmarks);
accountRouter.route("/my-bookmarks/get").post(accountController.getMyBookmarks);

/**
 * @api {patch} /bookmark/:reviewId/:userId bookmarks the review by adding to array if boolean is true in MongoDB database
 * @apiName BookmarkReview
 * @apiGroup Users
 * @apiSuccess User Info
 * @apiSuccessExample Successful Response:
 * HTTP/1.1 200 OK
 * {
  "success": true,
  "message": "Review was bookmarked.",
  "data": {
    "_id": "635a15574cdd41cf9c9c7d82",
    "profileImage": "",
    "bio": "This person loves food too much to think of a bio right now!",
    "theme": "blueberry",
    "bookmarks": [
      "63599019a9ae328e3045dc1e",
      "6354f017d7bf245d8940dd87",
      "6354efb3d7bf245d8940dd79"
    ],
    "admin": false,
    "date": "2022-10-27T05:21:27.063Z",
    "username": "test123",
    "email": "test@gmail.com",
    "password": "$2b$10$1aqUgjPZfXR7.5aGK9Y/3u8aw.mEf2qkxwfgf9C3annlKCb.f2JcS",
    "__v": 0
  }
}
 * 
 * 
 */

// PATCH user to add bookmarks to array if boolean is true
// need user auth
accountRouter.use(
  "/bookmark/:reviewId/:userId",
  accountController.checkUserParams
);
accountRouter.use(
  "/bookmark/:reviewId/:userId",
  accountController.checkReviewParams
);
accountRouter.use(
  "/bookmark/:reviewId/:userId",
  accountController.checkBookmarkReview
);
accountRouter
  .route("/bookmark/:reviewId/:userId")
  .patch(accountController.bookmarkReview);

/**
 * @api {patch} /updateUser/:userId Updates the user profile with new data in the MongoDB database
 * @apiName Updateuser
 * @apiGroup Users
 * @apiSuccess User Info
 * @apiSuccessExample Successful Respone:
 * HTTP/1.1 200 OK
 * {
  "success": true,
  "message": "Successfully updated user.",
  "data": {
    "_id": "635a15574cdd41cf9c9c7d82",
    "profileImage": "",
    "bio": "hello",
    "theme": "blueberry",
    "bookmarks": [
      "63599019a9ae328e3045dc1e",
      "6354f017d7bf245d8940dd87",
      "6354efb3d7bf245d8940dd79",
      "6354efecd7bf245d8940dd80"
    ],
    "admin": false,
    "date": "2022-10-27T05:21:27.063Z",
    "username": "test12344",
    "email": "test@gmail.com",
    "password": "$2b$10$1aqUgjPZfXR7.5aGK9Y/3u8aw.mEf2qkxwfgf9C3annlKCb.f2JcS",
    "__v": 0
  }
}
 * 
 * 
 */
 
// PATCH profile by userId -- Updates the user profile with new data and returns updated profile
// needs user auth
accountRouter.use("/updateUser/:userId", accountController.checkUserParams);
accountRouter.use("/updateUser/:userId", accountController.checkUpdateUser);
accountRouter.route("/updateUser/:userId").patch(accountController.updateUser);

/**
 * @api {PUT} /updatePassword Updates the user password in the MongoDB database
 * @apiName UpdatePassword
 * @apiGroup Users
 * @apiSuccess User Info
 * @apiSuccessExample Successful Respone:
 * HTTP/1.1 200 OK
 * {
  "success": true,
  "message": "Successfully updated password.",
  "data": {
    "_id": "635a15574cdd41cf9c9c7d82",
    "profileImage": "",
    "bio": "hello",
    "theme": "blueberry",
    "bookmarks": [
      "63599019a9ae328e3045dc1e",
      "6354f017d7bf245d8940dd87",
      "6354efb3d7bf245d8940dd79",
      "6354efecd7bf245d8940dd80"
    ],
    "admin": false,
    "date": "2022-10-27T05:21:27.063Z",
    "username": "test1234",
    "email": "test@gmail.com",
    "password": "$2b$10$1aqUgjPZfXR7.5aGK9Y/3u8aw.mEf2qkxwfgf9C3annlKCb.f2JcS",
    "__v": 0
  }
}
 * 
 * 
 */

// PUT new password into profile -- returns user with updated password if they exist
// user auth
accountRouter.use("/updatePassword", accountController.checkUpdatePassword);
accountRouter.route("/updatePassword").put(accountController.updatePassword);

/**
 * @api {PATCH} /changeTheme/:userId Updates the user theme in the MongoDB database
 * @apiName ChangeTheme
 * @apiGroup Users
 * @apiSuccess User Info
 * @apiSuccessExample Successful Respone:
 * HTTP/1.1 200 OK
 * {
  "success": true,
  "message": "Successfully updated theme.",
  "data": {
    "_id": "635a15574cdd41cf9c9c7d82",
    "profileImage": "",
    "bio": "hello",
    "theme": "blueberry",
    "bookmarks": [
      "63599019a9ae328e3045dc1e",
      "6354f017d7bf245d8940dd87",
      "6354efb3d7bf245d8940dd79",
      "6354efecd7bf245d8940dd80"
    ],
    "admin": false,
    "date": "2022-10-27T05:21:27.063Z",
    "username": "test1234",
    "email": "test@gmail.com",
    "password": "$2b$10$1aqUgjPZfXR7.5aGK9Y/3u8aw.mEf2qkxwfgf9C3annlKCb.f2JcS",
    "__v": 0
  }
}
 * 
 * 
 */

// PATCH profile by userId -- Updates the user profile with new theme  and returns updated profile
// user auth
accountRouter.use("/changeTheme/:userId", accountController.checkChangeTheme);
accountRouter
  .route("/changeTheme/:userId")
  .patch(accountController.changeTheme);


/**
 * @api {POST} /changeTheme/:userId Updates the user theme in the MongoDB database
 * @apiName ChangeTheme
 * @apiGroup Users
 * @apiSuccess User Info
 * @apiSuccessExample Successful Respone:
 * HTTP/1.1 200 OK
 * 
 * 
 * 
 */  

// images
accountRouter.post(
  "/uploadNewImage",
  upload.single("image"),
  accountController.uploadNewImage
);

accountRouter.use("/deleteNewImage", accountController.checkImageURL);
accountRouter.post("/deleteNewImage", accountController.deleteNewImage);

// user auth
accountRouter.use(
  "/uploadProfileImage/:userId",
  accountController.checkUserParams
);
accountRouter.use(
  "/uploadProfileImage/:userId",
  accountController.checkImageURL
);
accountRouter
  .route("/uploadProfileImage/:userId")
  .post(accountController.uploadProfileImage);

// user auth
accountRouter.use(
  "/deleteProfileImage/:userId",
  accountController.checkUserParams
);
accountRouter.post(
  "/deleteProfileImage/:userId",
  accountController.deleteProfileImage
);

module.exports = accountRouter;
