module.exports = (sequelize, Sequelize) => {
    const Level = sequelize.define("level", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        levelCode: {
            type: Sequelize.STRING,
        },
        level: {
            type: Sequelize.STRING,
        },
    })
    return Level;
}