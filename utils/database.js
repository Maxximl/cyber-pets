const Sequelize = require("sequelize");

const sequelize = new Sequelize("cyber_dogs", "root", "123456", {
  dialect: "mysql",
  host: "localhost",
});

module.exports = sequelize;
