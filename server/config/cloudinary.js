const cloudinary = require("cloudinary").v2;
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME || "dp32jvnit",
  api_key: process.env.CLOUDINARY_API_KEY || "691771265884762",
  api_secret: process.env.CLOUDINARY_API_SECRET || "mdR723E7B_th5OpLqXp8yilS3xE"
});

module.exports = { cloudinary };
