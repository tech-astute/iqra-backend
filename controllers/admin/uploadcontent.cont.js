const db = require("../../models");
const fileHelper = require("../../util/delete.file");
const UploadContent = db.uploadcontent;

exports.createContent = async (req, res) => {
    try {
        const { selectCourse, selectSubject, videoTitle, videoLink } = req.body;

        if (!req.file) {
            return res.send(`You must select a File/PDF.`);
        }
        const contents = await UploadContent.create({
            selectCourse: selectCourse,
            selectSubject: selectSubject,
            videoTitle: videoTitle,
            videoLink: videoLink,
            uploadNote: req.file.filename
        });
        res.status(200).send(`Content has been uploaded. ${contents.id}`);

    } catch (err) {
        res.status(500).send({ message: err.message });
    }
};

exports.getAllContent = async (req, res) => {
    try {
        const contents = await UploadContent.findAll();
        res.status(200).send(contents);
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
}