const express = require('express');
const app = express();
const cors = require('cors');

app.use(express.json());
app.use(cors());

let todos = [];
let nextId = 1;

// GET /api/todos
app.get('/api/todos', (req, res) => {
  res.json({
    status: "success",
    message: "Data retrieved successfully",
    data: todos
  });
});

// POST /api/todos
app.post('/api/todos', (req, res) => {
  const { title, description, dueDate } = req.body;

  if (!title || !dueDate) {
    return res.status(400).json({
      status: "error",
      message: "Title and dueDate are required"
    });
  }

  const newTodo = {
    id: nextId++,
    title,
    description,
    completed: false,
    dueDate,
    createdAt: new Date().toISOString()
  };

  todos.push(newTodo);

  res.status(201).json({
    status: "success",
    message: "To-do added successfully",
    data: newTodo
  });
});

// GET /api/todos/:id
app.get('/api/todos/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const todo = todos.find(t => t.id === id);

  if (!todo) {
    return res.status(404).json({
      status: "error",
      message: "To-do with the given ID not found"
    });
  }

  res.json({
    status: "success",
    message: "Data retrieved successfully",
    data: todo
  });
});

// PUT /api/todos/:id
app.put('/api/todos/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = todos.findIndex(t => t.id === id);

  if (index === -1) {
    return res.status(404).json({
      status: "error",
      message: "To-do with the given ID not found"
    });
  }

  todos[index] = { ...todos[index], ...req.body };

  res.json({
    status: "success",
    message: "To-do updated successfully",
    data: todos[index]
  });
});

// DELETE /api/todos/:id
app.delete('/api/todos/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = todos.findIndex(t => t.id === id);

  if (index === -1) {
    return res.status(404).json({
      status: "error",
      message: "To-do with the given ID not found"
    });
  }

  const removed = todos.splice(index, 1)[0];

  res.json({
    status: "success",
    message: "To-do deleted successfully",
    data: removed
  });
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`🚀 Server ready at http://localhost:${PORT}`);
});
