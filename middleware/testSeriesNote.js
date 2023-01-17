const path = require("path");
const multer = require("multer");

const imageFilter = (req, file, cb) => {
  const match = ["image/png", "image/jpeg", "image/jpg", "application/pdf"];
  if (match.indexOf(file.mimetype) === -1) {
    var message = `${file.originalname} is invalid. Only accept png/jpeg/jpg/pdf.`;
    return cb(message, null);
  } else {
    cb(null, true);
  }
};

var storage = multer.diskStorage({
  destination: (req, file, callback) => {
    if (file.mimetype === "application/pdf") {
      callback(null, path.join(`${__dirname}/../resources/upload.pdf`));
    } else {
      callback(null, path.join(`${__dirname}/../resources/upload.images`));
    }
  },
  filename: (req, file, callback) => {
    var filename = `${Date.now()}-${file.originalname}`;
    callback(null, filename);
  }
});
uploadFiles = multer({ storage: storage, fileFilter: imageFilter });

module.exports = uploadFiles;
