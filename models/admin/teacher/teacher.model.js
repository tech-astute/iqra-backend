module.exports = (sequelize, DataTypes) => {
    const Teacher = sequelize.define("teacher", {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING,
      },
      subject: {
        type: DataTypes.JSON,
      },
      role: {
        type: DataTypes.STRING,
      },
      email: {
        type: DataTypes.STRING,
      },
      image: {
        type: DataTypes.STRING,
      },
      contactNumber: {
        type: DataTypes.STRING,
      },
      password: {
        type: DataTypes.STRING,
      },
    });
    return Teacher;
  };