module.exports = (sequelize, Sequelize) => {
    const LiveClasses = sequelize.define("liveclass", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        selectCourse: {
            type: Sequelize.STRING,
        },
        thumbNail: {
            type: Sequelize.STRING,
        },
        classTitle: {
            type: Sequelize.STRING,
        },
        instructorName: {
            type: Sequelize.STRING,
        },
        videoLink: {
            type: Sequelize.STRING,
        }
    })
    return LiveClasses;
}