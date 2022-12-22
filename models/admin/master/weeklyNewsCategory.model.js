module.exports = (sequelize, Sequelize) => {
    const WNCategory = sequelize.define("weeklyNewsCategory", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        wNCategoryCode: {
            type: Sequelize.STRING,
        },
        wNCategory: {
            type: Sequelize.STRING,
        }
    })
    return WNCategory;
}