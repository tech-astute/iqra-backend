module.exports = (sequelize, Sequelize) => {
    const Course = sequelize.define("course", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        course: {
            type: Sequelize.STRING,
        },
        categoryname: {
            type: Sequelize.STRING,
        },
    })
    return Course;
}