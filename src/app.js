const express = require("express");

const app = express();
const port = 7777;

app.get("/user", (req, res) => {
  res.send({ firstname: "Hina", lastname: "Abbas" });
});

app.post("/user", (req, res) => {
  res.send("POST request to the /user endpoint");
});

app.put("/user", (req, res) => {
  res.send("PUT request to the /user endpoint");
});

app.delete("/user", (req, res) => {
  res.send("DELETE request to the /user endpoint");
});

app.patch("/user", (req, res) => {
  res.send("PATCH request to the /user endpoint");
});

app.use("/hello", (req, res) => {
  res.send("Hello World!");
});

app.use("/test", (req, res) => {
  res.send("This is a test endpoint");
});
app.use("/", (req, res) => {
  res.send("Welcome to DevTinder APP");
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
