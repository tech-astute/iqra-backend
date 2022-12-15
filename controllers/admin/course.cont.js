const db = require("../../models");
const Course = db.course;

exports.addCourse = async (req, res) => {
  try {
    const courses = await Course.create({
      course: req.body.course,
      categoryname: req.body.categoryname
    });
    res.status(200).send(`Course has been uploaded. ${courses.id}`);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

exports.getAllCourse = async (req, res) => {
  try {
    const courses = await Course.findAll();
    res.status(200).send(courses);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

exports.deleteCourse = async (req, res) => {
  try {
    const id = req.params.id;
    const courses = await Course.findOne({ where: { id: id } });
    if (!courses) {
      //console.log(`Id is not present`);
      return res.send(`Fail to delete: Id is not present`);
    }
    await courses.destroy();
    res.status(200).send(`Course deleted with Id: ${id}`);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

exports.updateCourse = async (req, res) => {
  try {
    const id = req.params.id;
    const courses = await Course.findOne({ where: { id: id } });
    if (!courses) {
      //console.log(`Id is not present`);
      return res.send(`Fail to update: Id is not present`);
    }
    await courses.update({
      course: req.body.course,
      categoryname: req.body.categoryname
    });
    res.status(200).send(`Course updated with ID: ${id}`);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};