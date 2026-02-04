const connectDB = require("./config/database");
const express = require("express");
const User = require("./models/user");

const app = express();
const port = 7777;

// Middleware to parse JSON bodies
app.use(express.json());

// Route to get all users
app.get("/users", async (req, res) => {
  const users = await User.find();
  try {
    res.json(users);
  } catch (err) {
    res.status(500).send(`Error fetching users: ${err.message}`);
  }
});
// Route to delete a user by ID
app.delete("/users", async (req, res) => {
  const userId = req.body.userId;

  try {
    const user = await User.findByIdAndDelete(userId);
    res.send(`Deleted user with ID: ${userId}`);
  } catch (err) {
    res.status(500).send(`Error deleting users: ${err.message}`);
  }
});

app.patch("/users", async (req, res) => {
  const userId = req.body.userId;
  const data = req.body;

  try {
    const user = await User.findByIdAndUpdate(userId, data);
    res.send("User updated successfully");
  } catch (err) {
    res.status(500).send(`Error updating user: ${err.message}`);
  }
});

app.post("/signup", async (req, res) => {
  // Creating a new instance of User model
  const user = new User(req.body);
  try {
    await user.save();
    res.send("User created successfully");
  } catch (err) {
    res.status(500).send(`Error creating user: ${err.message}`);
  }
});

connectDB()
  .then(() => {
    console.log("Database connected successfully");
    app.listen(port, () => {
      console.log(`Server is running on http://localhost:${port}`);
    });
  })
  .catch((err) => console.error("Database connection error:", err));
