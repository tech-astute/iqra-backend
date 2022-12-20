module.exports = (sequelize, DataTypes) => {
    const AddCourse = sequelize.define("addcourse", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        courseName: {
            type: DataTypes.STRING,
        },
        categoryName: {
            type: DataTypes.STRING,
        },
        courseImage: {
            type: DataTypes.STRING,
        },
        price: {
            type: DataTypes.DOUBLE,
        },
        overViewHeading: {
            type: DataTypes.STRING,
        },
        description: {
            type: DataTypes.TEXT,
        },
        lesson: {
            type: DataTypes.STRING,
        },
        level: {
            type: DataTypes.STRING,
        },
        medium: {
            type: DataTypes.STRING,
        },
        courseDuration: {
            type: DataTypes.STRING,
        },
        subject: {
            type: DataTypes.STRING,
        }
    })
    return AddCourse;
}