const mongoose = require("mongoose");

const messagesSchema = mongoose.Schema({
  chatName: String,
  conversation: {
    Messages: String,
    timestamp: String,
  },

  user: {
    name: String,
    email: String,
    photo: String,
    uuid: String,
  },
});

module.exports = mongoose.model("messages", messagesSchema);
