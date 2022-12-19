module.exports = (sequelize, Sequelize) => {
    const Language = sequelize.define("language", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        languageCode: {
            type: Sequelize.STRING,
        },
        language: {
            type: Sequelize.STRING,
        },
    })
    return Language;
}