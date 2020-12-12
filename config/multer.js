const multer = require("multer"); // Handle file uploads

// MULTER MIDDLEWARE

const fileFilter = (req, file, callback) => {
  console.log("Bam");
  if (
    file.mimetype == "image/jpeg" ||
    file.mimetype == "image/jpg" ||
    file.mimetype == "image/gif" ||
    file.mimetype == "image/png"
  ) {
    // Accept file
    return callback(null, true);
    console.log("Hi")
  } else {
    // reject file
    return callback(null, false);
    console.log("Boo")
  }
};

const storage = multer.memoryStorage();
module.exports = multer({ storage, fileFilter }).single("image");
