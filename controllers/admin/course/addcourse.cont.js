const db = require("../../../models");
const fileHelper = require("../../../util/delete.file");
const AddCourse = db.addcourse;

exports.createAddCourse = async (req, res) => {
    try {
        const { courseName, categoryName, price, overViewHeading, description, lesson, medium, level, courseDuration, subject } = req.body;

        if (!req.file) {
            return res.send(`You must select a Image.`);
        }
        const addcourses = await AddCourse.create({
            courseName: courseName,
            categoryName: categoryName,
            price: price,
            overViewHeading: overViewHeading,
            description: description,
            lesson, lesson,
            medium: medium,
            level: level,
            courseDuration: courseDuration,
            subject: subject,
            courseImage: req.file.filename
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
        fileHelper.deleteFile(addCourses.courseImage);

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
        const { courseName, categoryName, price, overViewHeading, description, lesson, medium, level, courseDuration, subject } = req.body;
        const addCourses = await AddCourse.findOne({ where: { id: id } });
        if (!addCourses) {
            return res.send(`Fail to update: Id is not present`);
        }
        if (req.file) {
            fileHelper.deleteFile(addCourses.courseImage);
            imagePath = req.file.filename;
        }
        await addCourses.update({
            courseName: courseName,
            categoryName: categoryName,
            price: price,
            overViewHeading: overViewHeading,
            description: description,
            lesson, lesson,
            medium: medium,
            level: level,
            courseDuration: courseDuration,
            subject: subject,
            courseImage: imagePath
        });
        res.status(200).send(`Add Course updated with Id: ${id}`);
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
};