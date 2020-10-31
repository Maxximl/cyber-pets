const Sequelize = require("sequelize");

const sequelize = new Sequelize("name", "max", "K9f86m35fgh", {
  dialect: "mysql",
  host: "root@80.249.148.233",
});

module.exports = sequelize;
