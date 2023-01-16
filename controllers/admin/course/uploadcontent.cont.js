const db = require("../../../models");
const fileHelper = require("../../../util/delete.file");
const UploadContent = db.uploadcontent;

exports.createContent = async (req, res) => {
    try {
        const { course, subject, videoTitle, videoLink, videoType } = req.body;

        if (!req.file) {
            return res.send(`You must select a File/PDF.`);
        }
        const contents = await UploadContent.create({
            course: course,
            subject: subject,
            content: {
                videoTitle: videoTitle,
                videoLink: videoLink,
                videoType: videoType,
                notes: req.file.filename
            }
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
        fileHelper.deleteFile(contents.notes);

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
        const { course, subject, videoTitle, videoLink, videoType } = req.body;
        const contents = await UploadContent.findOne({ where: { id: id } });
        if (!contents) {
            return res.send(`Fail to update: Id is not present`);
        }
        if (req.file) {
            fileHelper.deleteFile(contents.notes);
            pdfPath = req.file.filename;
        }
        await contents.update({
            course: course,
            subject: subject,
            videoTitle: videoTitle,
            videoLink: videoLink,
            videoType: videoType,
            notes: pdfPath
        });
        res.status(200).send(`Content updated with Id: ${id}`);
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
};

exports.getAllContentByCourse = async (req, res) => {
    try {
        const course = req.params.course;
        const contents = await UploadContent.findAll({ where: { course: course } });
        const contentsArray = [];
        contents.forEach(content => {
            contentsArray.push(content.content);
        });
        const contentsData = {
            id: contents[0].id,
            course: contents[0].course,
            subject: contents[0].subject,
            content: contentsArray
        }
        res.status(200).send(contentsData);
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
}
