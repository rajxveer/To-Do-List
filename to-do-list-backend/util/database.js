const Sequelize = require("sequelize");

const sequelize = new Sequelize("to_do_list", "root", "root", {
  dialect: "mysql",
  host: "localhost", 
});

module.exports = sequelize;