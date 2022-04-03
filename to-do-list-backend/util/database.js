const Sequelize = require("sequelize");

const sequelize = new Sequelize(
  "todo_db",
  "root",
  "password",
  {
    dialect: "mysql",
    host: "192.168.0.100" 
  }
);

module.exports = sequelize;