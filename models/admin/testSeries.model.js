module.exports = (sequelize, Sequelize) => {
    const TestSeries = sequelize.define("testSeries", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        subject: {
            type: Sequelize.STRING
        },
        teacher: {
            type: Sequelize.STRING
        },
        mimeType: {
            type: Sequelize.STRING
        },
        testSeriesNote: {
            type: Sequelize.JSON
        }
    })
    return TestSeries;
}