module.exports = (sequelize, Sequelize) => {
    const Category = sequelize.define("category", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        category: {
            type: Sequelize.STRING,
        },
        categoryimage: {
            type: Sequelize.STRING,
        }
    })
    return Category;
}