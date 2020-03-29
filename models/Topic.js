const mongoose = require("mongoose");

const Topic = new mongoose.Schema({
  value: { type: String, required: true },
  numPosts: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("topic", Topic);
