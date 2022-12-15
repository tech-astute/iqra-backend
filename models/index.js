const dbConfig = require("../configs/db.config");
const { Sequelize, DataTypes } = require("sequelize");

const sequelize = new Sequelize(
  dbConfig.database,
  dbConfig.user,
  dbConfig.password,
  {
    host: dbConfig.host,
    dialect: dbConfig.dialect,
    pool: {
      max: dbConfig.pool.max,
      min: dbConfig.pool.min,
      acquire: dbConfig.pool.acquire,
      idle: dbConfig.pool.idle,
    },
  }
);

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

//master
db.level = require('./admin/master/level.model')(sequelize, Sequelize);
db.medium = require('./admin/master/medium.model')(sequelize, Sequelize);
db.subject = require('./admin/master/subject.model')(sequelize, Sequelize);
db.category = require('./admin/master/category.model')(sequelize, Sequelize);

db.course = require('./admin/course.model')(sequelize, Sequelize);
db.question = require('./admin/question.model')(sequelize, Sequelize);
db.article = require('./admin/article.model')(sequelize, Sequelize);
db.editorial = require('./admin/editorial.model')(sequelize, Sequelize);
db.banner = require('./admin/banner.model')(sequelize, Sequelize);

// db.teacher.hasMany(db.student);
// db.student.belongsTo(db.teacher);

module.exports = db;