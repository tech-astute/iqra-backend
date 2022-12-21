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
        videoTitle: {
            type: Sequelize.STRING,
        },
        videoType: {
            type: Sequelize.STRING,
        },
        videoLink: {
            type: Sequelize.STRING,
        },
        notes: {
            type: Sequelize.STRING,
        }
    })
    return UploadContent;
}