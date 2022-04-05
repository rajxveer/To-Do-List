// Create new Task
router.post("/", (req, res) => {
    if (!req.body.text) {
      res.status(400).send({
        message: "Task content cannot be empty!",
      });
      return;
    }
  
    const task = {
      text: req.body.text,
      isEdit: req.body.isEdit ? req.body.isEdit : false,
      checked: req.body.checked ? req.body.checked : "To-do",
    };
  
    TaskModel.create(task)
      .then((data) => {
        res.send(data);
      })
      .catch((err) => {
        res.status(500).send({
          message: err.message || "An error occurred while creating the task.",
        });
      });
  });

  // Retrieve all Tasks from database
  router.get("/", (req, res) => {
    const text = req.query.text;
    var condition = text ? { text: { [Op.like]: `%${text}%` } } : null;
  
    TaskModel.findAll({ where: condition })
      .then((data) => {
        res.send(data);
      })
      .catch((err) => {
        res.status(500).send({
          message: err.message || "An error occurred while retrieving the tasks.",
        });
      });
  });

  // Update a task by the id in the request
  router.put("/:id", (req, res) => {
    const id = req.params.id;
  
    TaskModel.update(req.body, {
      where: { id: id },
    })
      .then((num) => {
        if (num == 1) {
          res.send({
            message: "Task was updated successfully.",
          });
        } else {
          res.send({
            message: `Cannot update Task with id=${id}. Task was either not found or req.body is empty!`,
          });
        }
      })
      .catch((err) => {
        res.status(500).send({
          message: "Error updating task with id=" + id,
        });
      });
  });
  // Delete a task with the specified id in the request
  router.delete("/:id", (req, res) => {
    const id = req.params.id;
  
    TaskModel.destroy({
      where: { id: id },
    })
      .then((num) => {
        if (num == 1) {
          res.send({
            message: "Task was deleted successfully!",
          });
        } else {
          res.send({
            message: `Cannot delete task with id=${id}. Maybe task was not found!`,
          });
        }
      })
      .catch((err) => {
        res.status(500).send({
          message: "Could not delete task with id=" + id,
        });
      });
  });