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

exports.deleteContent = async (req, res) => {
    try {

        const id = req.params.id;
        const contents = await UploadContent.findOne({ where: { id: id } });
        if (!contents) {
            return res.send(`Fail to delete: Id is not present`);
        }
        fileHelper.deleteFile(contents.uploadNote);

        await contents.destroy();
        res.status(200).send(`Content deleted with Id: ${id}`);

    } catch (err) {
        res.status(500).send({ message: err.message });
    }
}

exports.updateContent = async (req, res) => {
    try {

        let pdfPath;
        const id = req.params.id;
        const { selectCourse, selectSubject, videoTitle, videoLink } = req.body;
        const contents = await UploadContent.findOne({ where: { id: id } });
        if (!contents) {
            return res.send(`Fail to update: Id is not present`);
        }
        if (req.file) {
            fileHelper.deleteFile(contents.uploadNote);
            pdfPath = req.file.filename;
        }
        await contents.update({
            selectCourse: selectCourse,
            selectSubject: selectSubject,
            videoTitle: videoTitle,
            videoLink: videoLink,
            uploadNote: pdfPath
        });
        res.status(200).send(`Content updated with Id: ${id}`);
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
};