const connectDB = require("./config/database");
const express = require("express");
const User = require("./models/user");

const app = express();
const port = 7777;

// Middleware to parse JSON bodies
app.use(express.json());

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
