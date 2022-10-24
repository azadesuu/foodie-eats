const multer = require("multer");
const path = require("path");

// Multer config
module.exports = multer({
  storage: multer.diskStorage({}),
  fileFilter: (req, file, cb) => {
    const fileSize = parseInt(req.headers["content-length"]);
    let ext = path.extname(file.originalname);
    if (ext !== ".jpg" && ext !== ".jpeg" && ext !== ".png") {
      cb(new Error("Unsupported File Format."), false);
      return;
    } else if (fileSize > 10 * 1024 * 1024) {
      cb(new Error("Image too big."), false);
      return;
    }
    cb(null, true);
  }
});
