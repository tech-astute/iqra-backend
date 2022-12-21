module.exports = (sequelize, Sequelize) => {
    const LiveClasses = sequelize.define("liveclass", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        course: {
            type: Sequelize.STRING,
        },
        thumbnail: {
            type: Sequelize.STRING,
        },
        title: {
            type: Sequelize.STRING,
        },
        instructorName: {
            type: Sequelize.STRING,
        },
        videoLink: {
            type: Sequelize.STRING,
        },
        videoType: {
            type: Sequelize.STRING,
        }
    })
    return LiveClasses;
}