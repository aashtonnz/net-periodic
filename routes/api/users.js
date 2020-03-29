const express = require("express");
const auth = require("../../middleware/auth");
const userService = require("../../services/user");
const profileService = require("../../services/profile");
const tokenService = require("../../services/token");
const mailService = require("../../services/mail");
const { errorMsg, successMsg } = require("../../utils");
const { checkSignUp, checkUserEdit } = require("../../utils/validation");

const router = express.Router();

// @route  POST api/users
// @desc   Sign up user and get token
// @access Public
router.post("/", async (req, res) => {
  const { username, name, email, mailSub, password } = req.body;
  const invalidMsg = checkSignUp(username, name, email, password);
  if (invalidMsg) {
    return res.status(400).json(errorMsg(invalidMsg));
  }
  try {
    let user = await userService.findByUsername(username);
    if (user) {
      return res.status(400).json(errorMsg("Username already in use"));
    }
    if (email && (await mailService.exists(email))) {
      return res.status(400).json(errorMsg("Email already in use"));
    }
    const newUser = await userService.create(username, name, email, password);
    if (email) {
      await mailService.add(username, email, mailSub);
    }
    const token = await tokenService.create(newUser._id);
    res.json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json(errorMsg());
  }
});

// @route  PUT api/users
// @desc   Update user
// @access Private
router.put("/", auth, async (req, res) => {
  const { name, email, mailSub, password } = req.body;
  const invalidMsg = checkUserEdit(name, email, password);
  if (invalidMsg) {
    return res.status(400).json(errorMsg(invalidMsg));
  }
  try {
    const user = await userService.findById(req.user.id);
    if (email && user.email !== email && (await mailService.exists(email))) {
      return res.status(400).json(errorMsg("Email already in use"));
    }
    await userService.update(req.user.id, name, email, password);
    await mailService.update(user, email, mailSub);
    const profile = await profileService.findMyProfile(req.user.id);
    res.json(profile);
  } catch (error) {
    console.error(error);
    res.status(500).json(errorMsg());
  }
});

// @route  PUT api/user/:username/subscribe
// @desc   Subscribe to a contributor
// @access Private
router.put("/:username/subscribe", auth, async (req, res) => {
  const { username } = req.params;

  try {
    const contributor = await userService.findByUsername(username);
    if (!contributor) {
      return res.status(400).json(errorMsg("Contributor does not exist"));
    }
    await userService.subscribe(req.user.id, contributor);
    res.json(successMsg(`Subscribed to ${username}`));
  } catch (error) {
    console.error(error);
    res.status(500).json(errorMsg());
  }
});

// @route  PUT api/user/:username/unsubscribe
// @desc   Unsubscribe from a contributor
// @access Private
router.put("/:username/unsubscribe", auth, async (req, res) => {
  const { username } = req.params;
  try {
    const contributor = await userService.findByUsername(username);
    if (!contributor) {
      return res.status(400).json(errorMsg("Contributor does not exist"));
    }
    await userService.unsubscribe(req.user.id, contributor);
    res.json(successMsg(`Unsubscribed from ${username}`));
  } catch (error) {
    console.error(error);
    res.status(500).json(errorMsg());
  }
});

module.exports = router;
