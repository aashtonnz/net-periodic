const express = require("express");
const auth = require("../../middleware/auth");
const tokenService = require("../../services/token");
const userService = require("../../services/user");
const { errorMsg } = require("../../utils");
const { checkLogin } = require("../../utils/validation");

const router = express.Router();

// @route  GET api/auth
// @desc   Load user
// @access Private
router.get("/", auth, async (req, res) => {
  try {
    const user = await userService.findById(req.user.id);
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json(errorMsg());
  }
});

// @route  POST api/auth
// @desc   Login in and get token
// @access Public
router.post("/", async (req, res) => {
  const { username, password } = req.body;
  const invalidMsg = checkLogin(username, password);
  if (invalidMsg) {
    return res.status(400).json(errorMsg(invalidMsg));
  }
  try {
    let user = await userService.validate(username, password);
    if (!user) {
      return res.status(400).json(errorMsg("Invalid credentials"));
    }
    const token = await tokenService.create(user.id);
    res.json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json(errorMsg());
  }
});

module.exports = router;
