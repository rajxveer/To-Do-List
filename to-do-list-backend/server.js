const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const cors = require('cors')
const Task = require('./models/task')
const sequelize = require('./util/database')

app.use(bodyParser.json())
app.use(cors())
app.use(bodyParser.urlencoded({extended:true}))

// app.get to read all tasks
app.get('/', async (req, res) => {
  const text = req.query.text;
  var condition = text ? { text: { [Op.like]: `%${text}%` } } : null;

  Task.findAll({ where: condition })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving todos.",
      });
    });
})

// app.post to create a new task
app.post('/tasks', async (req, res) => {
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
      status: req.body.status ? req.body.status :false,
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

// app.put to update the staus/task of selected tasks
app.put("/tasks/:id", async (req, res) => {
  // Update the name/status of selected tasks
  const id = req.params.id;
  const updateRecord = await Task.update(req.body, {
    where: {id : id}
  })

  updateRecord
  ? res.send(
    { 'message': 'Task updated'}
  )
  : res.send(
    { 'message': 'Task not updated'}
  )
});

// app.delete to delete tasks of selected tasks
app.delete("/tasks/:id", async (req, res) => {
  // Delete selected task
  const id = req.params.id;
  const deleteRecord = await Task.destroy({
    where: {id: id}
  })

  deleteRecord 
  ? res.send(
    { 'message': 'Task deleted' }
  ) 
  : res.send(
    { 'message': 'Task not deleted' }
  )
});

app.listen(3000)
sequelize.sync()