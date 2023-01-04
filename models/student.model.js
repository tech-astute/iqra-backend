module.exports = (sequelize, DataTypes) => {
    const Student = sequelize.define("student", {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING,
      },
      email: {
        type: DataTypes.STRING,
      },
      contactNumber: {
        type: DataTypes.STRING,
      },
      optSubject: {
        type: DataTypes.STRING,
      },
      medium: {
        type: DataTypes.STRING,
      },
      totalAttempt: {
        type: DataTypes.INTEGER,
      },
      password: {
        type: DataTypes.STRING,
      },
    });
    return Student;
  };
  