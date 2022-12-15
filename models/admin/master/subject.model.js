module.exports = (sequelize, Sequelize) => {
    const Subject = sequelize.define("subject", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        subjectCode: {
            type: Sequelize.STRING,
        },
        subject: {
            type: Sequelize.STRING,
        },
    })
    return Subject;
}