const mongoose = require("mongoose");
const { defaultTopics } = require("../utils/constants");

const ProfileSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "user", required: true },
  imgPath: { type: String },
  bio: { type: String, default: "" },
  link: { type: String, default: "" },
  posts: [{ type: mongoose.Schema.Types.ObjectId, ref: "post" }],
  subscribedTo: [{ type: mongoose.Schema.Types.ObjectId, ref: "user" }],
  followedTopics: { type: Array, default: defaultTopics },
  likedPosts: [{ type: mongoose.Schema.Types.ObjectId, ref: "post" }],
  numSubscribed: { type: Number, default: 0 },
  prevNumSubscribed: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("profile", ProfileSchema);
