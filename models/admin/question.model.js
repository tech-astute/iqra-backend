module.exports = (sequelize, Sequelize) => {
    const Question = sequelize.define("question", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        questiontype: {
            type: Sequelize.STRING
        },
        firstquestion: {
            type: Sequelize.STRING
        },
        statementA: {
            type: Sequelize.STRING
        },
        statementB: {
            type: Sequelize.STRING
        },
        statementC: {
            type: Sequelize.STRING
        },
        statementD: {
            type: Sequelize.STRING
        },
        secondquestion: {
            type: Sequelize.STRING
        },
        optionA: {
            type: Sequelize.STRING,
        },
        optionB: {
            type: Sequelize.STRING,
        },
        optionC: {
            type: Sequelize.STRING,
        },
        optionD: {
            type: Sequelize.STRING,
        },
        answer: {
            type: Sequelize.STRING,
        },
        tag: {
            type: Sequelize.STRING
        }
    })
    return Question;
}