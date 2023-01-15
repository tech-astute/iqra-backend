const db = require("../../../models");
const fileHelper = require("../../../util/delete.file");
const LiveClass = db.liveclass;

exports.createLiveClass = async (req, res) => {
    try {
        const { course, title, instructorName, videoLink, videoType } = req.body;

        if (!req.file) {
            return res.send(`You must select a Thumbnail.`);
        }
        const liveClasses = await LiveClass.create({
            course: course,
            title: title,
            instructorName: instructorName,
            videoLink: videoLink,
            videoType: videoType,
            thumbnail: req.file.filename
        });
        res.status(200).send(`Live class has been uploaded. ${liveClasses.id}`);

    } catch (err) {
        res.status(500).send({ message: err.message });
    }
};

exports.getAllLiveClass = async (req, res) => {
    try {
        const liveClasses = await LiveClass.findAll();
        res.status(200).send(liveClasses);
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
}

exports.deleteLiveClass = async (req, res) => {
    try {

        const id = req.params.id;
        const liveClasses = await LiveClass.findOne({ where: { id: id } });
        if (!liveClasses) {
            return res.send(`Fail to delete: Id is not present`);
        }
        fileHelper.deleteFile(liveClasses.thumbnail);

        await liveClasses.destroy();
        res.status(200).send(`Live Class deleted with Id: ${id}`);

    } catch (err) {
        res.status(500).send({ message: err.message });
    }
}

exports.updateLiveClass = async (req, res) => {
    try {

        let imagePath;
        const id = req.params.id;

        const { course, title, instructorName, videoLink, videoType } = req.body;
        const liveClasses = await LiveClass.findOne({ where: { id: id } });
        if (!liveClasses) {
            return res.send(`Fail to update: Id is not present`);
        }
        if (req.file) {
            fileHelper.deleteFile(liveClasses.thumbnail);
            imagePath = req.file.filename;
        }
        await liveClasses.update({
            course: course,
            title: title,
            instructorName: instructorName,
            videoLink: videoLink,
            videoType: videoType,
            thumbnail: imagePath
        });
        res.status(200).send(`Live Class updated with Id: ${id}`);
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
};

exports.getAllLiveClassByCourse = async (req, res) => {
    try {
        const course = req.params.course;
        const liveClasses = await LiveClass.findAll({ where: { course: course } });
        res.status(200).send(liveClasses);
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
}
