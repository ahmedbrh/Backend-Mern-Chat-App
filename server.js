const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const pusher = require("pusher");
const app = express();
const env = require("dotenv").config();
const PORT = process.env.PORT || 3000;
const bodyParser = require("body-parser");
app.use(bodyParser.json());
const conversation = require("./models/schema");

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).send("hello ahmed test express ! ");
});

// mongodb connection

mongoose.connect(
  process.env.DATABASE_KEY_URI,
  { useCreateIndex: true, useNewUrlParser: true, useUnifiedTopology: true },
  mongoose.connection.once("open", () => {
    console.log("MongoDB connected");
  })
);

app.listen(PORT, () => {
  console.log(`the server is running on port ${PORT} `);
});
