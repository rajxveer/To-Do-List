const express = require('express')
const bodyParser = require('body-parser')
const app = express()

const Task = require('./models/task')
const sequelize = require('./util/database')

app.use(bodyParser.json())

app.get('/', (req, res) => {
  sequelize.sync({ force: true }).then(() => {});
  res.send(
    { 'message': 'Hello, world' }
  )
})

app.post('/create/task', async (req, res) => {
  // 1. Check the payload
  if (!req.body || !("name" in req.body)) {
    return res.send(
      { 'message': 'No payload' }
    )
  }

  // 2. Create record in DB (But check first if it already exists)
  const hasTask = await Task.findOne(
    {
      where: {
        name: req.body.name
      }
    }
  )
  .then(task => task != null ? true : false);

  if (hasTask) {
    return res.send(
      { 'message': 'Task already exists' }
    )
  };

  // 3. Create DB Record
  const createRecord = await Task.create(
    {
      name: req.body.name,
      status: req.body.status
    }
  )
  .then((task) => task ? true : false);

    
  // 4. Return result
  createRecord 
    ? res.send(
      { 'message': 'Task created' }
    ) 
    : res.send(
      { 'message': 'Task not created' }
    )
});

app.listen(3001)