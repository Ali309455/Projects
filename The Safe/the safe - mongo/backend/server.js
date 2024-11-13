const express = require("express");
const { MongoClient } = require("mongodb");
const dontenv = require("dotenv");
const body_parser = require("body-parser");
const cors = require("cors");

// Connection URL
dontenv.config();
const url = process.env.MONGO_URI;
const client = new MongoClient(url);

// Database Name
const dbName = "thesafe";
const app = express();
const port = 3000;

client.connect();
app.use(body_parser.json());
app.use(cors());

// get all the passwords
app.get("/", async (req, res) => {
  const db = client.db(dbName);
  const collection = db.collection("passwords");
  const findResult = await collection.find({}).toArray();
  res.json(findResult);
});
// save a password
app.post("/", async (req, res) => {
  const password = req.body;
  const db = client.db(dbName);
  const collection = db.collection("passwords");
  const findResult = await collection.insertOne(password);
  res.json({success: true, result: findResult});
});

// delete a password
app.delete("/", async (req, res) => {
    const password = req.body;
    const db = client.db(dbName);
    const collection = db.collection("passwords");
    const findResult = await collection.deleteOne(password);
    res.json({success: true, result: findResult});
  });
  

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
