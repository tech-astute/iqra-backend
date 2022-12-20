const db = require("../../models");
const fileHelper = require("../../util/delete.file");
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