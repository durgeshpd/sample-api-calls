const express = require('express');
const app = express();
const PORT = 3000;

// 🔧 Middleware to log requests
app.use((req, res, next) => {
  next();
});

// Built-in middleware for parsing JSON
app.use(express.json());

// In-memory user data
let users = [
  { id: 1, name: "Durgesh" },
  { id: 2, name: "Kumar" },
];

// GET: Fetch all users
app.get('/api/users', (req, res) => {
  res.json(users);
});

// POST: Add new user
app.post('/api/users', (req, res) => {
  const { name } = req.body;
  if (!name) return res.status(400).json({ error: "name is required" });

  const newUser = {
    id: users.length + 1,
    name
  };

  users.push(newUser);
  res.status(201).json({ newUser });
});

// PATCH: Update user's name by ID
app.patch('/api/users/:id', (req, res) => {
  const userId = parseInt(req.params.id);
  const { name } = req.body;

  const user = users.find(u => u.id === userId);
  if (!user) return res.status(404).json({ error: "User not found" });

  if (!name) return res.status(400).json({ error: "name is required" });

  user.name = name;
  res.json({ updatedUser: user });
});

// DELETE: Remove user by ID
app.delete('/api/users/:id', (req, res) => {
  const userId = parseInt(req.params.id);
  const index = users.findIndex(u => u.id === userId);

  if (index === -1) return res.status(404).json({ error: "User not found" });

  const deletedUser = users.splice(index, 1);
  res.json({ deletedUser });
});

// Start server
app.listen(PORT, () => {
  console.log(`App is listening at: http://localhost:${PORT}`);
});
