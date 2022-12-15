const db = require("../../models");
const Article = db.article;

exports.addArticle = async (req, res) => {
  try {
    const articles = await Article.create({
      heading: req.body.heading,
      rating: req.body.rating,
      tags: req.body.tags,
      prelims: req.body.prelims,
      mains: req.body.mains,
      dataFormEditor: req.body.dataFormEditor,
      question: req.body.question,
      questionHeading: req.body.questionHeading,
      options: req.body.options,
      answer: req.body.answer,
      subjectMap: req.body.subjectMap
    });
    res.status(200).send(`Article has been uploaded. ${articles.id}`);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

exports.getAllArticle = async (req, res) => {
  try {
    const articles = await Article.findAll();
    res.status(200).send(articles);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};