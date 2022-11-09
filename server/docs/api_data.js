define({
  api: [
    {
      type: "patch",
      url: "/bookmark/:reviewId/:userId",
      title: "Add review to my bookmarks",
      name: "BookmarkReview",
      group: "Account",
      success: {
        fields: {
          "Success 200": [
            {
              group: "Success 200",
              type: "User",
              optional: false,
              field: "profileInfo",
              description: "<p>user's Information</p>"
            }
          ]
        },
        examples: [
          {
            title: "Successful Response:",
            content:
              'HTTP/1.1 200 OK\n{\n  "success": true,\n  "message": "Review was bookmarked.",\n  "data": {\n    "_id": "635a15574cdd41cf9c9c7d82",\n    "profileImage": "",\n    "bio": "This person loves food too much to think of a bio right now!",\n    "theme": "blueberry",\n    "bookmarks": [\n      "63599019a9ae328e3045dc1e",\n      "6354f017d7bf245d8940dd87",\n      "6354efb3d7bf245d8940dd79"\n    ],\n    "admin": false,\n    "date": "2022-10-27T05:21:27.063Z",\n    "username": "test123",\n    "email": "test@gmail.com",\n    "password": "$2b$10$1aqUgjPZfXR7.5aGK9Y/3u8aw.mEf2qkxwfgf9C3annlKCb.f2JcS",\n    "__v": 0\n  }\n}',
            type: "json"
          }
        ]
      },
      version: "0.0.0",
      filename: "./routes/user/accountRoutes.js",
      groupTitle: "Account"
    },
    {
      type: "PATCH",
      url: "/changeTheme/:userId",
      title: "Update user's theme",
      name: "ChangeTheme",
      group: "Account",
      success: {
        fields: {
          "Success 200": [
            {
              group: "Success 200",
              type: "User",
              optional: false,
              field: "profileInfo",
              description: "<p>user's Information</p>"
            }
          ]
        },
        examples: [
          {
            title: "Successful Response:",
            content:
              'HTTP/1.1 200 OK\n{\n  "success": true,\n  "message": "Successfully updated theme.",\n  "data": {\n    "_id": "635a15574cdd41cf9c9c7d82",\n    "profileImage": "",\n    "bio": "hello",\n    "theme": "blueberry",\n    "bookmarks": [\n      "63599019a9ae328e3045dc1e",\n      "6354f017d7bf245d8940dd87",\n      "6354efb3d7bf245d8940dd79",\n      "6354efecd7bf245d8940dd80"\n    ],\n    "admin": false,\n    "date": "2022-10-27T05:21:27.063Z",\n    "username": "test1234",\n    "email": "test@gmail.com",\n    "password": "$2b$10$1aqUgjPZfXR7.5aGK9Y/3u8aw.mEf2qkxwfgf9C3annlKCb.f2JcS",\n    "__v": 0\n  }\n}',
            type: "json"
          }
        ]
      },
      version: "0.0.0",
      filename: "./routes/user/accountRoutes.js",
      groupTitle: "Account"
    },
    {
      type: "POST",
      url: "/deleteNewImage",
      title: "Deletes an image from cloudinary",
      name: "Delete_Image",
      group: "Account",
      success: {
        fields: {
          "Success 200": [
            {
              group: "Success 200",
              type: "string",
              optional: false,
              field: "status",
              description: "<p>result</p>"
            }
          ]
        },
        examples: [
          {
            title: "Successful Response:",
            content:
              'HTTP/1.1 200 OK\n{\n  "success": true,\n  "message": "Successfully updated theme.",\n  "data": {\n    "success": true,\n    "message":"Image deleted from cloudinary.",\n    "data": { "result": "ok" }\n  }\n}',
            type: "json"
          }
        ]
      },
      version: "0.0.0",
      filename: "./routes/user/accountRoutes.js",
      groupTitle: "Account"
    },
    {
      type: "POST",
      url: "/deleteProfileImage/:userId",
      title: "Delete profile image of user",
      name: "Delete_Profile_Image",
      group: "Account",
      success: {
        fields: {
          "Success 200": [
            {
              group: "Success 200",
              type: "User",
              optional: false,
              field: "profileInfo",
              description: "<p>user's Information</p>"
            }
          ]
        },
        examples: [
          {
            title: "Successful Response:",
            content:
              'HTTP/1.1 200 OK\n{\n  "success": true,\n  "message": "Successfully updated theme.",\n  "data": {\n    "success": true,\n    "message":"User image was deleted successfully",\n    "data": {\n              "_id": {\n                  "$oid": "6355e36d6066b42befa7ba04"\n                },\n                "profileImage": "",\n                "bio": "This person loves food too much to think of a bio right now!",\n                "theme": "shokupan",\n                "bookmarks": [\n                  {\n                    "$oid": "63645f2baae2cb6048adf0d9"\n                  }\n                ],\n                "admin": false,\n                "date": {\n                  "$date": {\n                    "$numberLong": "1666573165168"\n                  }\n                },\n                "username": "joeannnc",\n                "email": "chongjoeann02@gmail.com",\n                "password": "$2b$10$wUkUKCH3yJgrz.IZdcRWD.UQE6Zv9TkX8Kl4myoEcfOaWozsapcKK"\n            }',
            type: "json"
          }
        ]
      },
      version: "0.0.0",
      filename: "./routes/user/accountRoutes.js",
      groupTitle: "Account"
    },
    {
      type: "post",
      url: "/my-bookmarks/get",
      title: "Gets a list of reviews for my bookmarks",
      name: "GetMyBookmarks",
      group: "Account",
      success: {
        fields: {
          "Success 200": [
            {
              group: "Success 200",
              type: "Review[]",
              optional: false,
              field: "Review",
              description: "<p>array of Review's info</p>"
            }
          ]
        },
        examples: [
          {
            title: "Successful Response:",
            content:
              'HTTP/1.1 200 OK\n{\n  "success": true,\n  "message": "My bookmarks found.",\n  "data": [\n    {\n      "_id": "63599019a9ae328e3045dc1e",\n      "userId": {\n        "_id": "635670e0507f40f19a6e8d17",\n        "profileImage": "https://res.cloudinary.com/dp32jvnit/image/upload/v1666813925/236090e8433513357c3af293697f50f6_quqvy7.png",\n        "bio": "This person loves food too much to think of a bio right now!",\n        "theme": "blueberry",\n        "bookmarks": [\n          "63599019a9ae328e3045dc1e"\n        ],\n        "admin": false,\n        "date": "2022-10-24T11:02:56.275Z",\n        "username": "celenesaw",\n        "email": "azadesuu@gmail.com",\n        "password": "$2b$10$gP0vMNjUJA7SHzu1BzQRXuqUMNYARdFaqefbEtEQ37wU3yIZ7APcu",\n        "__v": 0\n      },\n      "dateVisited": "2022-10-15T00:00:00.000Z",\n      "restaurantName": "Dragon Hot Pot",\n      "address": {\n        "streetAddress": "Elizabeth Street",\n        "postcode": 3000,\n        "state": "VIC",\n        "suburb": "Melbourne",\n        "country": "Australia",\n        "_id": "63599019a9ae328e3045dc1f"\n      },\n      "priceRange": 2,\n      "rating": 5,\n      "description": "Malatang was super good!",\n      "reviewImage": "https://res.cloudinary.com/dp32jvnit/image/upload/v1666813976/5fd3d974d73c2f8f779eae3ba2a1e36b_evnzlo.jpg",\n      "isPublic": true,\n      "tags": [],\n      "userLikes": [\n        "635670e0507f40f19a6e8d17"\n      ],\n      "likeCount": 1,\n      "flagged": [],\n      "flagCount": 0,\n      "dateReviewed": "2022-10-26T19:52:57.062Z",\n      "__v": 0\n    }\n  ]\n}',
            type: "json"
          }
        ]
      },
      version: "0.0.0",
      filename: "./routes/user/accountRoutes.js",
      groupTitle: "Account"
    },
    {
      type: "get",
      url: "/my-reviews/:userId",
      title: "Gets my list of reviews",
      name: "GetMyReviews",
      group: "Account",
      success: {
        fields: {
          "Success 200": [
            {
              group: "Success 200",
              type: "Review[]",
              optional: false,
              field: "Review",
              description: "<p>array of Review's info</p>"
            }
          ]
        },
        examples: [
          {
            title: "Successful Response:",
            content:
              'HTTP/1.1 200 OK\n{\n  "success": true,\n  "message": "My reviews found.",\n  "data": [\n    {\n      "_id": "6354f071d7bf245d8940dd95",\n      "userId": {\n        "_id": "6354ee5fd7bf245d8940dd69",\n        "profileImage": "none",\n        "bio": "This person loves food too much to think of a bio right now!",\n        "theme": "honeydew",\n        "bookmarks": [],\n        "admin": false,\n        "date": "2022-10-23T07:33:51.200Z",\n        "username": "claudya",\n        "email": "claudya@mail.com",\n        "password": "$2b$10$F2amVs6WJoW8mXUc.f7qauqWERvsr3db.PebrgsH1I/vJaH62JjCe",\n        "__v": 0\n      },\n      "dateVisited": "2022-10-12T00:00:00.000Z",\n      "restaurantName": "Palermo Restaurant",\n      "address": {\n        "streetAddress": "401 Little Bourke St",\n        "postcode": 3000,\n        "state": "VIC",\n        "suburb": "Melbourne CBD",\n        "country": "Australia",\n        "_id": "6354f071d7bf245d8940dd96"\n      },\n      "priceRange": 2,\n      "rating": 2,\n      "description": "Restaurant test 6",\n      "reviewImage": "",\n      "isPublic": true,\n      "tags": [],\n      "userLikes": [],\n      "likeCount": 0,\n      "flagged": [],\n      "flagCount": 0,\n      "dateReviewed": "2022-10-23T07:42:41.647Z",\n      "__v": 0\n    },\n    {\n      "_id": "6354f048d7bf245d8940dd8e",\n      "userId": {\n        "_id": "6354ee5fd7bf245d8940dd69",\n        "profileImage": "none",\n        "bio": "This person loves food too much to think of a bio right now!",\n        "theme": "honeydew",\n        "bookmarks": [],\n        "admin": false,\n        "date": "2022-10-23T07:33:51.200Z",\n        "username": "claudya",\n        "email": "claudya@mail.com",\n        "password": "$2b$10$F2amVs6WJoW8mXUc.f7qauqWERvsr3db.PebrgsH1I/vJaH62JjCe",\n        "__v": 0\n      },\n      "dateVisited": "2022-10-15T00:00:00.000Z",\n      "restaurantName": "Florentino",\n      "address": {\n        "streetAddress": "80 Bourke St",\n        "postcode": 3000,\n        "state": "VIC",\n        "suburb": "Melbourne CBD",\n        "country": "Australia",\n        "_id": "6354f048d7bf245d8940dd8f"\n      },\n      "priceRange": 4,\n      "rating": 3,\n      "description": "Restaurant test 5",\n      "reviewImage": "",\n      "isPublic": true,\n      "tags": [],\n      "userLikes": [],\n      "likeCount": 0,\n      "flagged": [],\n      "flagCount": 0,\n      "dateReviewed": "2022-10-23T07:42:00.578Z",\n      "__v": 0\n    }\n  }',
            type: "json"
          }
        ]
      },
      version: "0.0.0",
      filename: "./routes/user/accountRoutes.js",
      groupTitle: "Account"
    },
    {
      type: "get",
      url: "/profile/:username",
      title: "Gets profile by username",
      name: "GetProfile",
      group: "Account",
      success: {
        fields: {
          "Success 200": [
            {
              group: "Success 200",
              type: "User",
              optional: false,
              field: "profileInfo",
              description: "<p>user's Information</p>"
            }
          ]
        },
        examples: [
          {
            title: "Successful Response:",
            content:
              'HTTP/1.1 200 OK\n{\n    "success": true,\n    "message": "User was found by username",\n    "data": {\n      "_id": "6354ee5fd7bf245d8940dd69",\n      "profileImage": "none",\n      "bio": "This person loves food too much to think of a bio right now!",\n      "theme": "honeydew",\n      "bookmarks": [],\n      "admin": false,\n      "date": "2022-10-23T07:33:51.200Z",\n      "username": "claudya",\n      "email": "claudya@mail.com",\n      "password": "$2b$10$F2amVs6WJoW8mXUc.f7qauqWERvsr3db.PebrgsH1I/vJaH62JjCe",\n      "__v": 0\n    }\n  }',
            type: "json"
          }
        ]
      },
      version: "0.0.0",
      filename: "./routes/user/accountRoutes.js",
      groupTitle: "Account"
    },
    {
      type: "get",
      url: "/other-reviews/:userId",
      title: "Gets list of reviews for the associated user ID",
      name: "GetReviews",
      group: "Account",
      success: {
        fields: {
          "Success 200": [
            {
              group: "Success 200",
              type: "Review[]",
              optional: false,
              field: "Review",
              description: "<p>array of Review's info</p>"
            }
          ]
        },
        examples: [
          {
            title: "Successful Response:",
            content:
              'HTTP/1.1 200 OK\n{\n  "success": true,\n  "message": "bookmarks found.",\n  "data": [\n    {\n      "_id": "6354f071d7bf245d8940dd95",\n      "userId": {\n        "_id": "6354ee5fd7bf245d8940dd69",\n        "profileImage": "none",\n        "bio": "This person loves food too much to think of a bio right now!",\n        "theme": "honeydew",\n        "bookmarks": [],\n        "admin": false,\n        "date": "2022-10-23T07:33:51.200Z",\n        "username": "claudya",\n        "email": "claudya@mail.com",\n        "password": "$2b$10$F2amVs6WJoW8mXUc.f7qauqWERvsr3db.PebrgsH1I/vJaH62JjCe",\n        "__v": 0\n      },\n      "dateVisited": "2022-10-12T00:00:00.000Z",\n      "restaurantName": "Palermo Restaurant",\n      "address": {\n        "streetAddress": "401 Little Bourke St",\n        "postcode": 3000,\n        "state": "VIC",\n        "suburb": "Melbourne CBD",\n        "country": "Australia",\n        "_id": "6354f071d7bf245d8940dd96"\n      },\n      "priceRange": 2,\n      "rating": 2,\n      "description": "Restaurant test 6",\n      "reviewImage": "",\n      "isPublic": true,\n      "tags": [],\n      "userLikes": [],\n      "likeCount": 0,\n      "flagged": [],\n      "flagCount": 0,\n      "dateReviewed": "2022-10-23T07:42:41.647Z",\n      "__v": 0\n    },\n    {\n      "_id": "6354f048d7bf245d8940dd8e",\n      "userId": {\n        "_id": "6354ee5fd7bf245d8940dd69",\n        "profileImage": "none",\n        "bio": "This person loves food too much to think of a bio right now!",\n        "theme": "honeydew",\n        "bookmarks": [],\n        "admin": false,\n        "date": "2022-10-23T07:33:51.200Z",\n        "username": "claudya",\n        "email": "claudya@mail.com",\n        "password": "$2b$10$F2amVs6WJoW8mXUc.f7qauqWERvsr3db.PebrgsH1I/vJaH62JjCe",\n        "__v": 0\n      },\n      "dateVisited": "2022-10-15T00:00:00.000Z",\n      "restaurantName": "Florentino",\n      "address": {\n        "streetAddress": "80 Bourke St",\n        "postcode": 3000,\n        "state": "VIC",\n        "suburb": "Melbourne CBD",\n        "country": "Australia",\n        "_id": "6354f048d7bf245d8940dd8f"\n      },\n      "priceRange": 4,\n      "rating": 3,\n      "description": "Restaurant test 5",\n      "reviewImage": "",\n      "isPublic": true,\n      "tags": [],\n      "userLikes": [],\n      "likeCount": 0,\n      "flagged": [],\n      "flagCount": 0,\n      "dateReviewed": "2022-10-23T07:42:00.578Z",\n      "__v": 0\n    }\n  }',
            type: "json"
          }
        ]
      },
      version: "0.0.0",
      filename: "./routes/user/accountRoutes.js",
      groupTitle: "Account"
    },
    {
      type: "PUT",
      url: "/updatePassword",
      title: "Update password",
      name: "UpdatePassword",
      group: "Account",
      success: {
        fields: {
          "Success 200": [
            {
              group: "Success 200",
              type: "User",
              optional: false,
              field: "profileInfo",
              description: "<p>user's Information</p>"
            }
          ]
        },
        examples: [
          {
            title: "Successful Response:",
            content:
              'HTTP/1.1 200 OK\n{\n  "success": true,\n  "message": "Successfully updated password.",\n  "data": {\n    "_id": "635a15574cdd41cf9c9c7d82",\n    "profileImage": "",\n    "bio": "hello",\n    "theme": "blueberry",\n    "bookmarks": [\n      "63599019a9ae328e3045dc1e",\n      "6354f017d7bf245d8940dd87",\n      "6354efb3d7bf245d8940dd79",\n      "6354efecd7bf245d8940dd80"\n    ],\n    "admin": false,\n    "date": "2022-10-27T05:21:27.063Z",\n    "username": "test1234",\n    "email": "test@gmail.com",\n    "password": "$2b$10$1aqUgjPZfXR7.5aGK9Y/3u8aw.mEf2qkxwfgf9C3annlKCb.f2JcS",\n    "__v": 0\n  }\n}',
            type: "json"
          }
        ]
      },
      version: "0.0.0",
      filename: "./routes/user/accountRoutes.js",
      groupTitle: "Account"
    },
    {
      type: "patch",
      url: "/updateUser/:userId",
      title: "Update user profile",
      name: "Updateuser",
      group: "Account",
      success: {
        fields: {
          "Success 200": [
            {
              group: "Success 200",
              type: "User",
              optional: false,
              field: "profileInfo",
              description: "<p>user's Information</p>"
            }
          ]
        },
        examples: [
          {
            title: "Successful Response:",
            content:
              'HTTP/1.1 200 OK\n{\n  "success": true,\n  "message": "Successfully updated user.",\n  "data": {\n    "_id": "635a15574cdd41cf9c9c7d82",\n    "profileImage": "",\n    "bio": "hello",\n    "theme": "blueberry",\n    "bookmarks": [\n      "63599019a9ae328e3045dc1e",\n      "6354f017d7bf245d8940dd87",\n      "6354efb3d7bf245d8940dd79",\n      "6354efecd7bf245d8940dd80"\n    ],\n    "admin": false,\n    "date": "2022-10-27T05:21:27.063Z",\n    "username": "test12344",\n    "email": "test@gmail.com",\n    "password": "$2b$10$1aqUgjPZfXR7.5aGK9Y/3u8aw.mEf2qkxwfgf9C3annlKCb.f2JcS",\n    "__v": 0\n  }\n}',
            type: "json"
          }
        ]
      },
      version: "0.0.0",
      filename: "./routes/user/accountRoutes.js",
      groupTitle: "Account"
    },
    {
      type: "POST",
      url: "/uploadNewImage",
      title: "Uploads an image to cloudinary",
      name: "Upload_Image",
      group: "Account",
      success: {
        fields: {
          "Success 200": [
            {
              group: "Success 200",
              type: "User",
              optional: false,
              field: "profileInfo",
              description: "<p>user's Information</p>"
            }
          ]
        },
        examples: [
          {
            title: "Successful Response:",
            content:
              'HTTP/1.1 200 OK\n{\n  "success": true,\n  "message": "Successfully updated theme.",\n  "data": {\n    "success": true,\n    "message": "Image was uploaded successfully",\n    "data": "https://res.cloudinary.com/dp32jvnit/image/upload/v1666602193/e71e8bf7a37e27570df3b1f74748a006_xwwc8j.jpg"\n  }\n}',
            type: "json"
          }
        ]
      },
      version: "0.0.0",
      filename: "./routes/user/accountRoutes.js",
      groupTitle: "Account"
    },
    {
      type: "POST",
      url: "/uploadProfileImage/:userId",
      title: "Update profile image of user",
      name: "Upload_Profile_Image",
      group: "Account",
      success: {
        fields: {
          "Success 200": [
            {
              group: "Success 200",
              type: "User",
              optional: false,
              field: "profileInfo",
              description: "<p>user's Information</p>"
            }
          ]
        },
        examples: [
          {
            title: "Successful Response:",
            content:
              'HTTP/1.1 200 OK\n{\n  "success": true,\n  "message": "Successfully updated theme.",\n  "data": {\n    "success": true,\n    "message":"Image was uploaded successfully",\n    "data": {\n              "_id": {\n                  "$oid": "6355e36d6066b42befa7ba04"\n                },\n                "profileImage": "https://res.cloudinary.com/dp32jvnit/image/upload/v1666602193/e71e8bf7a37e27570df3b1f74748a006_xwwc8j.jpg",\n                "bio": "This person loves food too much to think of a bio right now!",\n                "theme": "shokupan",\n                "bookmarks": [\n                  {\n                    "$oid": "63645f2baae2cb6048adf0d9"\n                  }\n                ],\n                "admin": false,\n                "date": {\n                  "$date": {\n                    "$numberLong": "1666573165168"\n                  }\n                },\n                "username": "joeannnc",\n                "email": "chongjoeann02@gmail.com",\n                "password": "$2b$10$wUkUKCH3yJgrz.IZdcRWD.UQE6Zv9TkX8Kl4myoEcfOaWozsapcKK"\n            }',
            type: "json"
          }
        ]
      },
      version: "0.0.0",
      filename: "./routes/user/accountRoutes.js",
      groupTitle: "Account"
    },
    {
      type: "PUT",
      url: "/like/:userId/:reviewId",
      title: "Like review",
      name: "CheckToggleLike",
      group: "Reviews",
      success: {
        fields: {
          "Success 200": [
            {
              group: "Success 200",
              type: "Object",
              optional: false,
              field: "Liked",
              description: "<p>review info</p>"
            }
          ]
        },
        examples: [
          {
            title: "Successful Response:",
            content:
              'HTTP/1.1 200 OK\n{\n"success": true,\n"message": "Successfully unliked the review",\n"data": {\n  "_id": "6354efecd7bf245d8940dd80",\n  "userId": "6354ee5fd7bf245d8940dd69",\n  "dateVisited": "2022-10-08T00:00:00.000Z",\n  "restaurantName": "Hazel",\n  "address": {\n    "streetAddress": "164 Flinders Ln",\n    "postcode": 3000,\n    "state": "VIC",\n    "suburb": "Melbourne",\n    "country": "Australia",\n    "_id": "6354efecd7bf245d8940dd81"\n  },\n  "priceRange": 4,\n  "rating": 4,\n  "description": "Restaurant test 3",\n  "reviewImage": "",\n  "isPublic": true,\n  "tags": [],\n  "userLikes": [],\n  "likeCount": 0,\n  "flagged": [],\n  "flagCount": 0,\n  "dateReviewed": "2022-10-23T07:40:28.415Z",\n  "__v": 0\n}\n}',
            type: "json"
          }
        ]
      },
      version: "0.0.0",
      filename: "./routes/user/reviewRoutes.js",
      groupTitle: "Reviews"
    },
    {
      type: "PUT",
      url: "/createReview",
      title: "Create Review",
      name: "CreateReview",
      group: "Reviews",
      success: {
        fields: {
          "Success 200": [
            {
              group: "Success 200",
              type: "Object",
              optional: false,
              field: "Created",
              description: "<p>review's info</p>"
            }
          ]
        },
        examples: [
          {
            title: "Successful Response:",
            content:
              'HTTP/1.1 200 OK\n{\n  "success": true,\n  "message": "Review created.",\n  "data": {\n    "_id": "6358307d6302d49ed6bf2f9d",\n    "userId": {\n      "_id": "6354ec00d7bf245d8940dc75",\n      "profileImage": "none",\n      "bio": "This person loves food too much to think of a bio right now!",\n      "theme": "honeydew",\n      "bookmarks": [],\n      "admin": false,\n      "date": "2022-10-23T07:23:44.397Z",\n      "username": "review-test",\n      "email": "review-test@mail.com",\n      "password": "$2b$10$oYfxGzqOfwQbDKVJ13rQze9/4xorvYfqo7RIZj0BcSlTHxKLvzQPy",\n      "__v": 0\n    },\n    "dateVisited": "2022-10-11T00:00:00.000Z",\n    "restaurantName": "test",\n    "address": {\n      "streetAddress": "test",\n      "postcode": 3000,\n      "state": "VIC",\n      "suburb": "test",\n      "country": "Australia",\n      "_id": "6358307d6302d49ed6bf2f9e"\n    },\n    "priceRange": 1,\n    "rating": 2,\n    "description": "test",\n    "reviewImage": "",\n    "isPublic": false,\n    "tags": [],\n    "userLikes": [],\n    "likeCount": 0,\n    "flagged": [],\n    "flagCount": 0,\n    "dateReviewed": "2022-10-25T18:52:45.313Z",\n    "__v": 0\n  }\n}',
            type: "json"
          }
        ]
      },
      version: "0.0.0",
      filename: "./routes/user/reviewRoutes.js",
      groupTitle: "Reviews"
    },
    {
      type: "PUT",
      url: "/delete/:reviewId",
      title: "Delete review",
      name: "DeleteReview",
      group: "Reviews",
      success: {
        fields: {
          "Success 200": [
            {
              group: "Success 200",
              type: "Object",
              optional: false,
              field: "Deleted",
              description: "<p>review info</p>"
            }
          ]
        },
        examples: [
          {
            title: "Successful Response:",
            content:
              'HTTP/1.1 200 OK\n{\n"success": true,\n"message": "Review deleted.",\n"data": {\n  "_id": "636201b422b82257749397ab",\n  "userId": "635a15574cdd41cf9c9c7d82",\n  "dateVisited": "2022-11-01T00:00:00.000Z",\n  "restaurantName": "testreview",\n  "address": {\n    "streetAddress": "test",\n    "postcode": 3012,\n    "state": "NT",\n    "suburb": "test",\n    "country": "Australia",\n    "_id": "636201b422b82257749397ac"\n  },\n  "priceRange": 1,\n  "rating": 5,\n  "description": "testing review ",\n  "reviewImage": "",\n  "isPublic": false,\n  "tags": [],\n  "userLikes": [],\n  "likeCount": 0,\n  "flagged": [],\n  "flagCount": 0,\n  "dateReviewed": "2022-11-02T05:35:48.520Z",\n  "__v": 0\n}\n}',
            type: "json"
          }
        ]
      },
      version: "0.0.0",
      filename: "./routes/user/reviewRoutes.js",
      groupTitle: "Reviews"
    },
    {
      type: "GET",
      url: "/getReview/:reviewIds",
      title: "Get review by the ID",
      name: "GetOneReview",
      group: "Reviews",
      success: {
        fields: {
          "Success 200": [
            {
              group: "Success 200",
              type: "Object",
              optional: false,
              field: "review",
              description: "<p>Details</p>"
            }
          ]
        },
        examples: [
          {
            title: "Successful Response:",
            content:
              'HTTP/1.1 200 OK\n{\n  "success": true,\n  "message": "Review found",\n  "data": {\n    "_id": "6358307d6302d49ed6bf2f9d",\n    "userId": {\n      "_id": "6354ec00d7bf245d8940dc75",\n      "profileImage": "none",\n      "bio": "This person loves food too much to think of a bio right now!",\n      "theme": "honeydew",\n      "bookmarks": [],\n      "admin": false,\n      "date": "2022-10-23T07:23:44.397Z",\n      "username": "review-test",\n      "email": "review-test@mail.com",\n      "password": "$2b$10$oYfxGzqOfwQbDKVJ13rQze9/4xorvYfqo7RIZj0BcSlTHxKLvzQPy",\n      "__v": 0\n    },\n    "dateVisited": "2022-10-11T00:00:00.000Z",\n    "restaurantName": "test",\n    "address": {\n      "streetAddress": "test",\n      "postcode": 3000,\n      "state": "VIC",\n      "suburb": "test",\n      "country": "Australia",\n      "_id": "6358307d6302d49ed6bf2f9e"\n    },\n    "priceRange": 1,\n    "rating": 2,\n    "description": "test",\n    "reviewImage": "",\n    "isPublic": false,\n    "tags": [],\n    "userLikes": [],\n    "likeCount": 0,\n    "flagged": [],\n    "flagCount": 0,\n    "dateReviewed": "2022-10-25T18:52:45.313Z",\n    "__v": 0\n  }\n}',
            type: "json"
          }
        ]
      },
      version: "0.0.0",
      filename: "./routes/user/reviewRoutes.js",
      groupTitle: "Reviews"
    },
    {
      type: "GET",
      url: "/getReviewsByLikes",
      title: "Get Reviews sorted by most likes",
      name: "GetReviewsByLikes",
      group: "Reviews",
      success: {
        fields: {
          "Success 200": [
            {
              group: "Success 200",
              type: "Review[]",
              optional: false,
              field: "Review",
              description: "<p>array of Review's info</p>"
            }
          ]
        },
        examples: [
          {
            title: "Successful Response:",
            content:
              'HTTP/1.1 200 OK  \n{\n"success": true,\n"message": "Most liked reviews found.",\n"data": [\n  {\n    "_id": "63599019a9ae328e3045dc1e",\n    "userId": {\n      "_id": "635670e0507f40f19a6e8d17",\n      "profileImage": "https://res.cloudinary.com/dp32jvnit/image/upload/v1666813925/236090e8433513357c3af293697f50f6_quqvy7.png",\n      "bio": "This person loves food too much to think of a bio right now!",\n      "theme": "blueberry",\n      "bookmarks": [\n        "63599019a9ae328e3045dc1e"\n      ],\n      "admin": false,\n      "date": "2022-10-24T11:02:56.275Z",\n      "username": "celenesaw",\n      "email": "azadesuu@gmail.com",\n      "password": "$2b$10$gP0vMNjUJA7SHzu1BzQRXuqUMNYARdFaqefbEtEQ37wU3yIZ7APcu",\n      "__v": 0\n    },\n    "dateVisited": "2022-10-15T00:00:00.000Z",\n    "restaurantName": "Dragon Hot Pot",\n    "address": {\n      "streetAddress": "Elizabeth Street",\n      "postcode": 3000,\n      "state": "VIC",\n      "suburb": "Melbourne",\n      "country": "Australia",\n      "_id": "63599019a9ae328e3045dc1f"\n    },\n    "priceRange": 2,\n    "rating": 5,\n    "description": "Malatang was super good!",\n    "reviewImage": "https://res.cloudinary.com/dp32jvnit/image/upload/v1666813976/5fd3d974d73c2f8f779eae3ba2a1e36b_evnzlo.jpg",\n    "isPublic": true,\n    "tags": [],\n    "userLikes": [\n      "635670e0507f40f19a6e8d17"\n    ],\n    "likeCount": 1,\n    "flagged": [],\n    "flagCount": 0,\n    "dateReviewed": "2022-10-26T19:52:57.062Z",\n    "__v": 0\n  }\n}\n]',
            type: "json"
          }
        ]
      },
      version: "0.0.0",
      filename: "./routes/user/reviewRoutes.js",
      groupTitle: "Reviews"
    },
    {
      type: "GET",
      url: "/getReviewsByRecent",
      title: "Get Reviews sorted by most recent",
      name: "GetReviewsByRecent",
      group: "Reviews",
      success: {
        fields: {
          "Success 200": [
            {
              group: "Success 200",
              type: "Review[]",
              optional: false,
              field: "Review",
              description: "<p>array of Review's info</p>"
            }
          ]
        },
        examples: [
          {
            title: "Successful Response:",
            content:
              'HTTP/1.1 200 OK\n{\n"success": true,\n"message": "Recent reviews found",\n"data": [\n  {\n    "_id": "63599019a9ae328e3045dc1e",\n    "userId": {\n      "_id": "635670e0507f40f19a6e8d17",\n      "profileImage": "https://res.cloudinary.com/dp32jvnit/image/upload/v1666813925/236090e8433513357c3af293697f50f6_quqvy7.png",\n      "bio": "This person loves food too much to think of a bio right now!",\n      "theme": "blueberry",\n      "bookmarks": [\n        "63599019a9ae328e3045dc1e"\n      ],\n      "admin": false,\n      "date": "2022-10-24T11:02:56.275Z",\n      "username": "celenesaw",\n      "email": "azadesuu@gmail.com",\n      "password": "$2b$10$gP0vMNjUJA7SHzu1BzQRXuqUMNYARdFaqefbEtEQ37wU3yIZ7APcu",\n      "__v": 0\n    },\n    "dateVisited": "2022-10-15T00:00:00.000Z",\n    "restaurantName": "Dragon Hot Pot",\n    "address": {\n      "streetAddress": "Elizabeth Street",\n      "postcode": 3000,\n      "state": "VIC",\n      "suburb": "Melbourne",\n      "country": "Australia",\n      "_id": "63599019a9ae328e3045dc1f"\n    },\n    "priceRange": 2,\n    "rating": 5,\n    "description": "Malatang was super good!",\n    "reviewImage": "https://res.cloudinary.com/dp32jvnit/image/upload/v1666813976/5fd3d974d73c2f8f779eae3ba2a1e36b_evnzlo.jpg",\n    "isPublic": true,\n    "tags": [],\n    "userLikes": [\n      "635670e0507f40f19a6e8d17"\n    ],\n    "likeCount": 1,\n    "flagged": [],\n    "flagCount": 0,\n    "dateReviewed": "2022-10-26T19:52:57.062Z",\n    "__v": 0\n  }\n}\n]',
            type: "json"
          }
        ]
      },
      version: "0.0.0",
      filename: "./routes/user/reviewRoutes.js",
      groupTitle: "Reviews"
    },
    {
      type: "Patch",
      url: "/updateReview",
      title: "Update or Edit review",
      name: "UpdateReview",
      group: "Reviews",
      success: {
        fields: {
          "Success 200": [
            {
              group: "Success 200",
              type: "Object",
              optional: false,
              field: "Updated",
              description: "<p>review's info</p>"
            }
          ]
        },
        examples: [
          {
            title: "Successful Response:",
            content:
              'HTTP/1.1 200 OK\n{\n"success": true,\n"message": "Review updated.",\n"data": {\n  "_id": "6358307d6302d49ed6bf2f9d",\n  "userId": {\n    "_id": "6354ec00d7bf245d8940dc75",\n    "profileImage": "none",\n    "bio": "This person loves food too much to think of a bio right now!",\n    "theme": "honeydew",\n    "bookmarks": [],\n    "admin": false,\n    "date": "2022-10-23T07:23:44.397Z",\n    "username": "review-test",\n    "email": "review-test@mail.com",\n    "password": "$2b$10$oYfxGzqOfwQbDKVJ13rQze9/4xorvYfqo7RIZj0BcSlTHxKLvzQPy",\n    "__v": 0\n  },\n  "dateVisited": "2022-10-11T00:00:00.000Z",\n  "restaurantName": "test",\n  "address": {\n    "streetAddress": "test",\n    "postcode": 3000,\n    "state": "VIC",\n    "suburb": "test",\n    "country": "Australia",\n    "_id": "6358307d6302d49ed6bf2f9e"\n  },\n  "priceRange": 1,\n  "rating": 2,\n  "description": "test",\n  "reviewImage": "",\n  "isPublic": false,\n  "tags": [],\n  "userLikes": [],\n  "likeCount": 0,\n  "flagged": [],\n  "flagCount": 0,\n  "dateReviewed": "2022-10-25T18:52:45.313Z",\n  "__v": 0\n}\n}',
            type: "json"
          }
        ]
      },
      version: "0.0.0",
      filename: "./routes/user/reviewRoutes.js",
      groupTitle: "Reviews"
    },
    {
      type: "Post",
      url: "/forgotPassword",
      title: "Send email with token to reset password",
      name: "ForgotPassword",
      group: "User",
      success: {
        fields: {
          "Success 200": [
            {
              group: "Success 200",
              type: "String",
              optional: false,
              field: "return",
              description: "<p>Status</p>"
            }
          ]
        },
        examples: [
          {
            title: "Successful Response:",
            content: '"password reset link sent to your email account"',
            type: "json"
          }
        ]
      },
      version: "0.0.0",
      filename: "./routes/passport/userRoutes.js",
      groupTitle: "User"
    },
    {
      type: "PUT",
      url: "/login",
      title: "Logins in using JWT",
      name: "LoginUser",
      group: "User",
      success: {
        fields: {
          "Success 200": [
            {
              group: "Success 200",
              type: "String",
              optional: false,
              field: "return",
              description: "<p>Token</p>"
            }
          ]
        },
        examples: [
          {
            title: "Successful Response:",
            content:
              '"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJib2R5Ijp7Il9pZCI6IjYzNWExNTU3NGNkZDQxY2Y5YzljN2Q4MiIsImVtYWlsIjoidGVzdEBnbWFpbC5jb20iLCJ1c2VybmFtZSI6InRlc3QxMjM0NSIsInRoZW1lIjoiYmx1ZWJlcnJ5In0sImlhdCI6MTY2NzQ0ODU0OH0.8xVLqyueHxISWcBAwZlli4QPo4zZNwyrispYuBQEkwc"',
            type: "json"
          }
        ]
      },
      version: "0.0.0",
      filename: "./routes/passport/userRoutes.js",
      groupTitle: "User"
    },
    {
      type: "PUT",
      url: "/signup",
      title: "Sign up using JWT",
      name: "SignupUser",
      group: "User",
      success: {
        fields: {
          "Success 200": [
            {
              group: "Success 200",
              type: "User",
              optional: false,
              field: "profileInfo",
              description: "<p>user's Information</p>"
            }
          ]
        },
        examples: [
          {
            title: "Successful Response:",
            content:
              '{\n  "success": true,\n  "message": "Successfully signed up",\n  "data": {\n    "profileImage": "",\n    "bio": "This person loves food too much to think of a bio right now!",\n    "theme": "honeydew",\n    "bookmarks": [],\n    "admin": false,\n    "_id": "63633fe5967eb73c86df8cf2",\n    "date": "2022-11-03T04:13:25.121Z",\n    "username": "test321",\n    "email": "test3@gmail.com",\n    "password": "$2b$10$W6nNrnuKHmve.n/LfLYJzeyf/I04w3rst.4mULFt1eJYqA31KSuqG",\n    "__v": 0\n  }\n}',
            type: "json"
          }
        ]
      },
      version: "0.0.0",
      filename: "./routes/passport/userRoutes.js",
      groupTitle: "User"
    }
  ]
});
