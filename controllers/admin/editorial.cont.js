const db = require("../../models");
const Editorial = db.editorial;

exports.addEditorial = async (req, res) => {
  try {
    const editorials = await Editorial.create({
      iICategory: req.body.iICategory,
      timeStamp: req.body.timeStamp,
      heading: req.body.heading,
      rating: req.body.rating,
      tags: req.body.tags,
      prelims: req.body.prelims,
      mains: req.body.mains,
      dataFromEditor: req.body.dataFromEditor,
      question: req.body.question,
      questionHeading: req.body.questionHeading,
      options: req.body.options,
      answer: req.body.answer,
      topic: req.body.topic
    });
    res.status(200).send(`Editorial has been uploaded. ${editorials.id}`);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

exports.getAllEditorial = async (req, res) => {
  try {
    const editorials = await Editorial.findAll();
    res.status(200).send(editorials);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

exports.deleteEditorial = async (req, res) => {
  try {
    const id = req.params.id;
    const editorials = await Editorial.findOne({ where: { id: id } });
    if (!editorials) {
      return res.send(`Fail to delete: Id is not present`);
    }
    await editorials.destroy();
    res.status(200).send(`Editorial deleted with Id: ${id}`);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

exports.updateEditorial = async (req, res) => {
  try {
    const id = req.params.id;
    const editorials = await Editorial.findOne({ where: { id: id } });
    if (!editorials) {
      return res.send(`Fail to update: Id is not present`);
    }
    await editorials.update({
      iICategory: req.body.iICategory,
      timeStamp: req.body.timeStamp,
      heading: req.body.heading,
      rating: req.body.rating,
      tags: req.body.tags,
      prelims: req.body.prelims,
      mains: req.body.mains,
      dataFromEditor: req.body.dataFromEditor,
      question: req.body.question,
      questionHeading: req.body.questionHeading,
      options: req.body.options,
      answer: req.body.answer,
      topic: req.body.topic
    });
    res.status(200).send(`Editorial updated with ID: ${id}`);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};