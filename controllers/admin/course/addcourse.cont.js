const db = require("../../../models");
const fileHelper = require("../../../util/delete.file");
const AddCourse = db.addcourse;

exports.createAddCourse = async (req, res) => {
    try {
        const { courseName, category, price, heading, description, lesson, language, level, duration, subjects } = req.body;

        if (!req.file) {
            return res.send(`You must select a Image.`);
        }
        const addcourses = await AddCourse.create({
            courseName: courseName,
            category: category,
            price: price,
            heading: heading,
            description: description,
            lesson, lesson,
            language: language,
            level: level,
            duration: duration,
            subjects: subjects,
            image: req.file.filename
        });
        res.status(200).send(`AddCourse has been uploaded. ${addcourses.id}`);

    } catch (err) {
        res.status(500).send({ message: err.message });
    }
};

exports.getAllAddCourse = async (req, res) => {
    try {
        const addcourses = await AddCourse.findAll();
        res.status(200).send(addcourses);
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
}

exports.deleteAddCourse = async (req, res) => {
    try {

        const id = req.params.id;
        const addCourses = await AddCourse.findOne({ where: { id: id } });
        if (!addCourses) {
            return res.send(`Fail to delete: Id is not present`);
        }
        fileHelper.deleteFile(addCourses.image);

        await addCourses.destroy();
        res.status(200).send(`Add Course deleted with Id: ${id}`);

    } catch (err) {
        res.status(500).send({ message: err.message });
    }
}

exports.updateAddCourse = async (req, res) => {
    try {

        let imagePath;
        const id = req.params.id;
        const { courseName, category, price, heading, description, lesson, language, level, duration, subjects } = req.body;
        const addCourses = await AddCourse.findOne({ where: { id: id } });
        if (!addCourses) {
            return res.send(`Fail to update: Id is not present`);
        }
        if (req.file) {
            fileHelper.deleteFile(addCourses.image);
            imagePath = req.file.filename;
        }
        await addCourses.update({
            courseName: courseName,
            category: category,
            price: price,
            heading: heading,
            description: description,
            lesson, lesson,
            language: language,
            level: level,
            duration: duration,
            subjects: subjects,
            image: imagePath
        });
        res.status(200).send(`Add Course updated with Id: ${id}`);
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
};