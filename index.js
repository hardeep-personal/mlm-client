// app.js
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();

const app = express();
app.set("view engine", "ejs");

const port = process.env.PORT || 3000;
const dbUri = process.env.MONGODB_URI;

app.use(cors());
app.use(bodyParser.json());

mongoose.connect(dbUri, { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", () => {
  console.log("Connected to MongoDB");
});

const User = require("./models/user.js");

app.post("/api/users", async (req, res) => {
  console.log(req);
  try {
    const newUser = new User(req.body);
    await newUser.save();
    res.render("userRes.ejs");
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred while saving the user." });
  }
});

app.get("/api/users", async (req, res) => {
  console.log(res);
  try {
    const users = await User.find();
    res.render("index.ejs");
    // res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred while fetching users." });
  }
});

app.get("/api/users/:id", async (req, res) => {
  const userId = req.params.id;

  try {
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json(user);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while fetching the user." });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
