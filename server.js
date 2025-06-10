const express = require('express');
const mongoose = require('mongoose');
const app = express();
const PORT = 3000;

// ✅ Connect to MongoDB
mongoose.connect('mongodb+srv://<username>:<password>@main-cluster.z2fbz2p.mongodb.net/userdb?retryWrites=true&w=majority')
  .then(() => console.log('✅ MongoDB connected'))
  .catch(err => console.error('❌ MongoDB connection error:', err));

// ✅ Define User schema and model
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  }
});

const User = mongoose.model('User', userSchema);

// ✅ Middleware
app.use(express.json());
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

// ✅ Routes

// GET all users
app.get('/api/users', async (req, res) => {
  const users = await User.find();
  res.json(users);
});

// POST new user
app.post('/api/users', async (req, res) => {
  const { name } = req.body;
  if (!name) return res.status(400).json({ error: 'name is required' });

  const newUser = new User({ name });
  await newUser.save();
  res.status(201).json({ newUser });
});

// PATCH update user by ID
app.patch('/api/users/:id', async (req, res) => {
  const { name } = req.body;
  const user = await User.findById(req.params.id);

  if (!user) return res.status(404).json({ error: 'User not found' });
  if (!name) return res.status(400).json({ error: 'name is required' });

  user.name = name;
  await user.save();
  res.json({ updatedUser: user });
});

// DELETE user by ID
app.delete('/api/users/:id', async (req, res) => {
  const deletedUser = await User.findByIdAndDelete(req.params.id);
  if (!deletedUser) return res.status(404).json({ error: 'User not found' });

  res.json({ deletedUser });
});

// ✅ Start server
app.listen(PORT, () => {
  console.log(`🚀 Server is running at http://localhost:${PORT}`);
});
