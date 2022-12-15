const db = require("../../models");
const Question = db.question;

exports.addQuestion = async (req, res) => {
  try {
    //console.log(req.file);
    //console.log(req.body);
    //<input type="checkbox" value="a" name="checkboxA">
    //<input type="checkbox" value="b" name="checkboxB">
    //<input type="checkbox" value="c" name="checkboxC">
    //<input type="checkbox" value="d" name="checkboxD">
    const{checkboxA, checkboxB,checkboxC, checkboxD} = req.body;
    const Answer = [];
    if(checkboxA) {
      Answer.push(checkboxA);
    }
    if(checkboxB) {
      Answer.push(checkboxB);
    }
    if(checkboxC) {
      Answer.push(checkboxC);
    }
    if(checkboxD) {
      Answer.push(checkboxD);
    }
    if(Answer.length !== 1) {
        return res.send(`You must select a option.`);
    }

    if (!req.file) {
      return res.send(`You must select a Tag.`);
    }

    const questions = await Question.create({
      questiontype: req.body.questiontype,
      firstquestion: req.body.firstquestion,
      statementA: req.body.statementA,
      statementB: req.body.statementB,
      statementC: req.body.statementC,
      statementD: req.body.statementD,
      secondquestion: req.body.secondquestion,
      optionA: req.body.optionA,
      optionB: req.body.optionB,
      optionC: req.body.optionC,
      optionD: req.body.optionD,
      answer: Answer,
      tag: req.file.filename
    });
    res.status(200).send(`Question has been uploaded. ${questions.id}`);
    
  } catch (error) {
    //console.log(error);
    return res.status(500).send(`Error when trying upload question: ${error}`);
  }
};

exports.getAllQuestion = async (req, res) => {
    try{
        const questions = await Question.findAll();
        res.status(200).send(questions);
    }catch(err){
        res.status(500).send({message: err.message});
    }
}