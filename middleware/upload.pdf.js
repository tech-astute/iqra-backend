const multer = require("multer");

const pdfFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("application/pdf")) {
    cb(null, true);
  } else {
    cb("Please upload only PDF.", false);
  }
};

var fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null,'./resources/upload.pdf');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

uploadPDF = multer({ storage: fileStorage, fileFilter: pdfFilter });

module.exports = uploadPDF;