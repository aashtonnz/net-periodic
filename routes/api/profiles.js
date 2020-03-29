const express = require("express");
const auth = require("../../middleware/auth");
const profileService = require("../../services/profile");
const userService = require("../../services/user");
const mailService = require("../../services/user");
const { errorMsg, successMsg } = require("../../utils");
const { checkBio, checkLink, checkImg } = require("../../utils/validation");

const router = express.Router();

// @route  GET api/profiles/me
// @desc   Get current profile
// @access Private
router.get("/me", auth, async (req, res) => {
  try {
    const profile = await profileService.findMyProfile(req.user.id);
    if (!profile) {
      return res.status(400).json(errorMsg("Profile not found"));
    }
    res.json(profile);
  } catch (error) {
    console.error(error);
    res.status(500).json(errorMsg());
  }
});

// @route  GET api/profiles/:username
// @desc   Get profile by username
// @access Public
router.get("/:username", async (req, res) => {
  const { username } = req.params;
  try {
    const user = await userService.findByUsername(username);
    if (!user) {
      return res.status(400).json(errorMsg("Profile not found"));
    }
    const profile = await profileService.findByUser(user._id);
    if (!profile) {
      return res.status(400).json(errorMsg("Profile not found"));
    }
    res.json(profile);
  } catch (error) {
    if (error.kind === "ObjectId") {
      return res.status(400).json(errorMsg("Profile not found"));
    }
    res.status(500).json(errorMsg());
  }
});

// @route  DELETE api/profiles/me
// @desc   Delete profile and user
// @access Private
router.delete("/me", auth, async (req, res) => {
  try {
    await profileService.remove(req.user.id);
    res.json(successMsg("User deleted"));
  } catch (error) {
    console.error(error);
    res.status(500).json(errorMsg());
  }
});

// @route  POST api/profiles/me/img
// @desc   Upload profile image
// @access Private
router.post("/me/img", auth, async (req, res) => {
  if (!req.files) {
    return res.status(400).json(errorMsg("No image uploaded"));
  }
  const img = req.files.img;
  const invalidMsg = checkImg(img);
  if (invalidMsg) {
    return res.status(400).json(errorMsg(invalidMsg));
  }
  try {
    const imgPath = await profileService.updateImg(img, req.user.id);
    res.json({ imgName: img.name, imgPath });
  } catch (error) {
    console.error(error);
    return res.status(500).json(errorMsg());
  }
});

// @route  PUT api/profiles/me/bio
// @desc   Update profile bio
// @access Private
router.put("/me/bio", auth, async (req, res) => {
  const { bio } = req.body;
  const invalidMsg = checkBio(bio);
  if (invalidMsg) {
    return res.status(400).json(errorMsg(invalidMsg));
  }
  try {
    const profile = await profileService.updateBio(req.user.id, bio);
    res.json(profile);
  } catch (error) {
    console.error(error);
    res.status(500).json(errorMsg());
  }
});

// @route  PUT api/profiles/me/bio
// @desc   Update profile link
// @access Private
router.put("/me/link", auth, async (req, res) => {
  const { link } = req.body;
  const invalidMsg = checkLink(link);
  if (invalidMsg) {
    return res.status(400).json(errorMsg(invalidMsg));
  }
  try {
    const profile = await profileService.updateLink(req.user.id, link);
    res.json(profile);
  } catch (error) {
    console.error(error);
    res.status(500).json(errorMsg());
  }
});

module.exports = router;
