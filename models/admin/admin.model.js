module.exports = (sequelize, DataTypes) => {
    const Admin = sequelize.define("admin", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        email: {
            type: DataTypes.STRING,
        },
        password: {
            type: DataTypes.STRING,
        },
    })
    return Admin;
}