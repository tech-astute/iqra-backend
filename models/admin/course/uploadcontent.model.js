module.exports = (sequelize, Sequelize) => {
    const UploadContent = sequelize.define("uploadcontent", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        selectCourse: {
            type: Sequelize.STRING,
        },
        selectSubject: {
            type: Sequelize.STRING,
        },
        videoTitle: {
            type: Sequelize.STRING,
        },
        videoLink: {
            type: Sequelize.STRING,
        },
        uploadNote: {
            type: Sequelize.STRING,
        }
    })
    return UploadContent;
}