const { BOOLEAN } = require("sequelize");
const Sequelize = require("sequelize");
const sequelize = require("../utils/db");

const Pet = sequelize.define("pet", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  name: {
    type: Sequelize.STRING,
  },
  sex: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  type: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  breed: {
    type: Sequelize.STRING,
  },
  age: {
    type: Sequelize.STRING,
  },
  birthday: {
    type: Sequelize.STRING,
  },
  description: {
    type: Sequelize.TEXT,
  },
  imageUrl: {
    type: Sequelize.STRING,
  },
  writed: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
  },
  hasOwner: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
  },
});

module.exports = Pet;
