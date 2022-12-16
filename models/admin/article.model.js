module.exports = (sequelize, DataTypes) => {
    const Article = sequelize.define("article", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        heading: {
            type: DataTypes.STRING,
        },
        rating: {
            type: DataTypes.STRING,
        },
        tags: {
            type: DataTypes.JSON,
        },
        prelims: {
            type: DataTypes.STRING,
        },
        mains: {
            type: DataTypes.STRING,
        },
        dataFromEditor: {
            type: DataTypes.TEXT,
        },
        question: {
            type: DataTypes.STRING,
        },
        questionHeading: {
            type: DataTypes.STRING,
        },
        options: {
            type: DataTypes.JSON,
        },
        answer: {
            type: DataTypes.STRING,
        },
        subject: {
            type: DataTypes.STRING,
        }
    })
    return Article;
}