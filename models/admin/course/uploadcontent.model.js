module.exports = (sequelize, Sequelize) => {
    const UploadContent = sequelize.define("uploadcontent", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        course: {
            type: Sequelize.STRING,
        },
        subject: {
            type: Sequelize.STRING,
        },
        content: {
            type: Sequelize.JSON,
        }
    })
    return UploadContent;
}