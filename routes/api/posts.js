const express = require("express");
const auth = require("../../middleware/auth");
const postService = require("../../services/post");
const profileService = require("../../services/profile");
const { errorMsg, successMsg } = require("../../utils");
const { checkPost } = require("../../utils/validation");

const router = express.Router();

// @route  GET api/posts
// @desc   Get posts
// @access Public
router.get("/", async (_req, res) => {
  try {
    const posts = await postService.findLeading();
    res.json(posts);
  } catch (error) {
    console.error(error);
    res.status(500).json(errorMsg());
  }
});

// @route  GET api/posts/subscribed
// @desc   Get subscribed posts
// @access Private
router.get("/subscribed", auth, async (req, res) => {
  try {
    const posts = await postService.findSubscribed(req.user.id);
    res.json(posts);
  } catch (error) {
    console.error(error);
    res.status(500).json(errorMsg());
  }
});

// @route  POST api/posts
// @desc   Create a post
// @access Private
router.post("/", auth, async (req, res) => {
  const { title, link, topics } = req.body;
  const invalidMsg = checkPost(title, link, topics);
  if (invalidMsg) {
    return res.status(400).json(errorMsg(invalidMsg));
  }
  try {
    const profile = await profileService.findByUser(req.user.id);
    const pending = await postService.findPending(profile);
    if (pending) {
      return res.status(400).json(errorMsg("Post already pending"));
    }
    const post = await postService.create(profile, title, link, topics);
    res.json(post);
  } catch (error) {
    console.error(error);
    res.status(500).json(errorMsg());
  }
});

// @route  PUT api/post/:post_id/like
// @desc   Like a post
// @access Private
router.put("/:post_id/like", auth, async (req, res) => {
  const { post_id: postId } = req.params;
  try {
    let post = await postService.findById(postId);
    if (!post) {
      return res.status(400).json(errorMsg("Post does not exist"));
    }
    await postService.like(post, req.user.id);
    res.json(successMsg(`Liked post ${postId}`));
  } catch (error) {
    console.error(error);
    res.status(500).json(errorMsg());
  }
});

// @route  PUT api/post/:post_id/unlike
// @desc   Unlike a post
// @access Private
router.put("/:post_id/unlike", auth, async (req, res) => {
  const { post_id: postId } = req.params;
  try {
    let post = await postService.findById(postId);
    if (!post) {
      return res.status(400).json(errorMsg("Post does not exist"));
    }
    await postService.unlike(post, req.user.id);
    res.json(successMsg(`Unliked post ${postId}`));
  } catch (error) {
    console.error(error);
    res.status(500).json(errorMsg());
  }
});

// @route  DELETE api/posts/:id
// @desc   Delete post
// @access Private
router.delete("/:id", auth, async (req, res) => {
  const { id } = req.params;
  try {
    const post = await postService.findById(id);
    if (!post) {
      return res.status(400).json(errorMsg("Post not found"));
    }
    const authorized = await postService.isAuthorized(post, req.user.id);
    if (!authorized) {
      return res.status(401).json(errorMsg("User not authorized"));
    }
    await postService.remove(post);
    res.json(successMsg("Post deleted"));
  } catch (error) {
    if (error.kind === "ObjectId") {
      return res.status(400).json(errorMsg("Post not found"));
    }
    res.status(500).json(errorMsg());
  }
});

module.exports = router;
