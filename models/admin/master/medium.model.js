module.exports = (sequelize, Sequelize) => {
    const Medium = sequelize.define("medium", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        mediumCode: {
            type: Sequelize.STRING,
        },
        medium: {
            type: Sequelize.STRING,
        },
    })
    return Medium;
}