const express = require("express");
const jwt = require("jsonwebtoken");
const User = require("./Model/User.js");
const mongoose = require("mongoose");
const { MongoClient } = require("mongodb");
const dontenv = require("dotenv");
const body_parser = require("body-parser");
const cors = require("cors");

// Connection URL
dontenv.config();
const url = process.env.MONGO_URI;
// const client = new MongoClient(url);
const client = mongoose.connect(url);

// Database Name
const dbName = "thesafe";
const app = express();
const port = 3000;

app.use(body_parser.json());
app.use(cors());

// login to the app
app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const userwithemail = await User.findOne({ email: email, password: password });
  if (!userwithemail) {
    res.status(404).json({ success: false, message: "User not found" });
    return;
  }
  else if(userwithemail.password !== password){
    res.status(404).json({ success: false, message: "Incorrect password" });
    return;
  }
  const jwtToken = jwt.sign({email:userwithemail.email},process.env.JWT_SECRET);

  res.status(200).json({ success: true, message: "Login successful" , token: jwtToken});
});
app.post("/register", async (req, res) => {
  const { email, password } = req.body;
  console.log(email, password);
  const auth = await User.findOne({ email: email });
  if (auth) {
    res.json({ success: false, message: "User already exists" });
    return;
  } else {
    const user = new User({ email: email, password: password });
    await user.save();
    res.json({ success: true, message: "Registration successful" });
  }
});
// get all the passwords
app.get("/", async (req, res) => {
  // const db = client.db(dbName);
  // const collection = db.collection("User");
  const email = req.query.email;
  const findResult = await User.findOne({email});
  res.json(findResult);
});
// save a password
app.post("/", async (req, res) => {
  const { email ,data } = req.body;
  console.log("saved");
  const findResult = await User.updateOne({ email },{$set:{data}});
  res.json({ success: true, result: findResult });
});

// delete a password
app.delete("/", async (req, res) => {
  const { data, email } = req.body;
  console.log(req.body);
  const findResult = await User.updateOne({ email },{$set:{data}});
  res.json({ success: true, result: findResult });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
