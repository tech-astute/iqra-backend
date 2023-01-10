module.exports = {
  host: process.env.HOST,
  user: process.env.USER, //UUSER
  password: process.env.PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.PORT,
  dialect: "mysql",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
};
