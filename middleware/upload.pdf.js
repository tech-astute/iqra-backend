const multer = require("multer");
const path = require("path");

const pdfFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("application/pdf")) {
    cb(null, true);
  } else {
    cb("Please upload only PDF.", false);
  }
};

var fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(`${__dirname}/../resources/upload.pdf`));
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

uploadPDF = multer({ storage: fileStorage, fileFilter: pdfFilter });

module.exports = uploadPDF;