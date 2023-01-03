const path = require("path");
const multer = require("multer");

var storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, path.join(`${__dirname}/../resources/uploadTestSeriesNote`));
  },
  filename: (req, file, callback) => {
    const match = ["image/png", "image/jpeg", "image/jpg", "application/pdf"];

    if (match.indexOf(file.mimetype) === -1) {
      var message = `${file.originalname} is invalid. Only accept png/jpeg/jpg/pdf.`;
      return callback(message, null);
    }
    var filename = `${Date.now()}-${file.originalname}`;
    callback(null, filename);
  }
});
uploadFiles = multer({ storage: storage });

module.exports = uploadFiles;
