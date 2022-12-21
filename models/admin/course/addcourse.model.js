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
        category: {
            type: DataTypes.STRING,
        },
        image: {
            type: DataTypes.STRING,
        },
        price: {
            type: DataTypes.DOUBLE,
        },
        heading: {
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
        language: {
            type: DataTypes.STRING,
        },
        duration: {
            type: DataTypes.STRING,
        },
        subjects: {
            type: DataTypes.STRING,
        }
    })
    return AddCourse;
}