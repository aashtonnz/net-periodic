const mongoose = require("mongoose");

const Post = new mongoose.Schema({
  profile: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "profile",
    required: true
  },
  title: { type: String, required: true },
  link: { type: String, required: true },
  topics: [{ type: String }],
  numLikes: { type: Number, required: true },
  numSubscribed: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("post", Post);
