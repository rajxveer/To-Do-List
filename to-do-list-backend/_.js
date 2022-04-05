const sequelize = require("./util/database");
const Task = require("./models/task");

sequelize
  .sync()
  .catch((err) => {
    console.log(err);
  });