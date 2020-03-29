const express = require("express");
const auth = require("../../middleware/auth");
const topicService = require("../../services/topic");
const { successMsg } = require("../../utils");

const router = express.Router();

// @route  GET api/
// @desc   Get topics sorted by number of posts
// @access Public
router.get("/", async (_req, res) => {
  try {
    const topics = await topicService.get();
    res.json(topics);
  } catch (error) {
    console.error(error);
    res.status(500).json(errorMsg());
  }
});

// @route  GET api/topics/default
// @desc   Get default topics
// @access Private
router.get("/default", async (_req, res) => {
  const topic = topicService.getDefaultTopics();
  res.json(topic);
});

// @route  PUT api/topics/:topic/follow
// @desc   Add topic to followed topics
// @access Private
router.put("/:topic/follow", auth, async (req, res) => {
  const { topic } = req.params;
  try {
    await topicService.follow(req.user.id, topic);
    res.json(successMsg(`Followed topic: ${topic}`));
  } catch (error) {
    console.error(error);
    res.status(500).json(errorMsg());
  }
});

// @route  PUT api/topics/:topic/unfollow
// @desc   Remove topic from followed topics
// @access Private
router.put("/:topic/unfollow", auth, async (req, res) => {
  const { topic } = req.params;
  try {
    await topicService.unfollow(req.user.id, topic);
    res.json(successMsg(`Unfollowed topic: ${topic}`));
  } catch (error) {
    console.error(error);
    res.status(500).json(errorMsg());
  }
});

module.exports = router;
