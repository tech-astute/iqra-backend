module.exports = (sequelize, Sequelize) => {
    const IICategory = sequelize.define("importantIssueCategory", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        iICategoryCode: {
            type: Sequelize.STRING,
        },
        iICategory: {
            type: Sequelize.STRING,
        }
    })
    return IICategory;
}