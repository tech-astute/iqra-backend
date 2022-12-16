module.exports = (sequelize, DataTypes) => {
    const Editorial = sequelize.define("editorial", {
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
            type: DataTypes.STRING,
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
        topic: {
            type: DataTypes.STRING,
        }
    })
    return Editorial;
}