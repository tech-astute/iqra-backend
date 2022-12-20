const db = require("../../../models");
const fileHelper = require("../../../util/delete.file");
const LiveClass = db.liveclass;

exports.createLiveClass = async (req, res) => {
    try {
        const { selectCourse, classTitle, instructorName, videoLink } = req.body;

        if (!req.file) {
            return res.send(`You must select a Thumbnail.`);
        }
        const liveClasses = await LiveClass.create({
            selectCourse: selectCourse,
            classTitle: classTitle,
            instructorName: instructorName,
            videoLink: videoLink,
            thumbNail: req.file.filename
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
        fileHelper.deleteFile(liveClasses.thumbNail);

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
        const { selectCourse, classTitle, instructorName, videoLink } = req.body;
        const liveClasses = await LiveClass.findOne({ where: { id: id } });
        if (!liveClasses) {
            return res.send(`Fail to update: Id is not present`);
        }
        if (req.file) {
            fileHelper.deleteFile(liveClasses.thumbNail);
            imagePath = req.file.filename;
        }
        await liveClasses.update({
            selectCourse: selectCourse,
            classTitle: classTitle,
            instructorName: instructorName,
            videoLink: videoLink,
            thumbNail: imagePath
        });
        res.status(200).send(`Live Class updated with Id: ${id}`);
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
};