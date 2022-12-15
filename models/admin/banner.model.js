module.exports = (sequelize, Sequelize) => {
    const Banner = sequelize.define("banner", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        bannerImage: {
            type: Sequelize.STRING,
        }
    })
    return Banner;
}