const db = require("../../models");
const Editorial = db.editorial;

exports.addEditorial = async (req, res) => {
  try {
    const editorials = await Editorial.create({
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