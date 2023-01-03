module.exports = {
  host: process.env.HOST,
  user: process.env.UUSER, //USER
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

// module.exports = {
//   host: "localhost",
//   user: "root",
//   password: "Root@123",
//   database: "testingiqra",
//   port: process.env.PORT,
//   dialect: "mysql",
//   pool: {
//     max: 5,
//     min: 0,
//     acquire: 30000,
//     idle: 10000,
//   },
// };

// console.log(process.env)