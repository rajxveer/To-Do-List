const sequelize = require("./util/database");

const Task = require("./models/task");

sequelize
  .sync()
  // .sync({force: true})
  .catch((err) => {
    console.log(err);
  });