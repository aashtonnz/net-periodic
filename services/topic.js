const Topic = require("../models/Topic");
const { defaultTopics } = require("../utils/constants");

const MAX_NUM_TOPICS = 1000;

const get = async () => {
  return await Topic.find()
    .sort({ numPosts: "desc" })
    .limit(MAX_NUM_TOPICS);
};

const getDefaultTopics = () => defaultTopics;

const follow = async (userId, topic) => {
  const profile = await Profile.findOne({ user: userId });
  if (!profile.followedTopics.includes(topic)) {
    profile.followedTopics.unshift(topic);
  }
  await profile.save();
};

const unfollow = async (userId, topic) => {
  const profile = await Profile.findOne({ user: userId });
  if (profile.followedTopics.includes(topic)) {
    profile.followedTopics = profile.followedTopics.filter(
      trackedTopic => trackedTopic !== topic
    );
  }
  await profile.save();
};

module.exports = {
  get,
  getDefaultTopics,
  follow,
  unfollow
};
