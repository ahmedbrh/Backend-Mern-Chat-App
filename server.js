const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const pusher = require("pusher");
const app = express();
const env = require("dotenv").config();
const PORT = process.env.PORT || 3000;
const bodyParser = require("body-parser");
app.use(bodyParser.json());
const mongoData = require("./models/schema");

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).send("hello ahmed test express ! ");
});

//post request
app.post("/new/conversation", (req, res) => {
  const dataMsg = req.body;

  mongoData.create(dataMsg, (err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(201).send(data);
      console.log(data);
    }
  });
});

//

app.post("/new/message", (req, res) => {
  mongoData.update(
    {
      _id: req.query.id,
    },
    { $push: { conversation: req.body } },
    (err, data) => {
      if (err) {
        console.log("error saving the message");
        console.log(err);
        res.status(500).send(err);
      } else {
        res.status(200).send(data);
      }
    }
  );
});

app.get("/get/conversationList", (req, res) => {
  mongoData.find((err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      data.sort((b, a) => {
        return a.timestamp - b.timestamp;
      });
      let conversations = [];

      data.map(conversationData => {
        const conversationInfo = {
          id: conversationData._id,
          name: conversationData.chatName,
          timestamp: conversationData.conversation[0].timestamp,
        };

        conversation.push(conversationInfo);
      });
      res.status(200).send(conversations);
    }
  });
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
