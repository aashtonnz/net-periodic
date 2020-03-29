const bcrypt = require("bcryptjs");
const User = require("../models/User");
const Profile = require("../models/Profile");
const fileSystem = require("./fileSystem");
const { generateUserImg } = require("../utils");

const findById = async id => {
  return await User.findById(id).select("-password");
};

const findByUsername = async username => {
  return await User.findOne({ username }).select("-password");
};

const validate = async (username, password) => {
  const user = await User.findOne({ username });
  if (!user) {
    return null;
  }
  const isMatch = await bcrypt.compare(password, user.password);
  return isMatch ? user : null;
};

const create = async (username, name, email, password) => {
  const user = new User({
    username,
    name: name || username,
    email,
    password
  });
  const imgBuffer = await generateUserImg(name || username);
  const imgPath = `user${user._id}.png`;
  await fileSystem.upload(imgBuffer, imgPath, "image/png");
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(password, salt);
  await user.save();
  await Profile.findOneAndUpdate(
    { user: user._id },
    { user: user._id, imgPath },
    { new: true, upsert: true }
  );
  return user;
};

const update = async (userId, name, email, password) => {
  const userData = { name, email };
  if (password) {
    const salt = await bcrypt.genSalt(10);
    userData.password = await bcrypt.hash(password, salt);
  }
  await User.findOneAndUpdate({ _id: userId }, userData, {
    new: true,
    upsert: true
  });
};

const subscribe = async (userId, contributor) => {
  const profile = await Profile.findOne({ user: userId });
  if (
    !profile.subscribedTo.map(user => user.toString()).includes(contributor._id)
  ) {
    const contributorProfile = await Profile.findOne({ user: contributor });
    contributorProfile.numSubscribed++;
    await contributorProfile.save();
    profile.subscribedTo.unshift(contributor);
    await profile.save();
  }
};

const unsubscribe = async (userId, contributor) => {
  const profile = await Profile.findOne({
    user: userId
  }).populate("subscribedTo", ["username"]);
  const contributorProfile = await Profile.findOne({ user: contributor });
  contributorProfile.numSubscribed--;
  await contributorProfile.save();
  profile.subscribedTo = profile.subscribedTo
    .filter(user => user.username !== contributor.username)
    .map(user => user._id);
  await profile.save();
};

module.exports = {
  findById,
  findByUsername,
  validate,
  create,
  update,
  subscribe,
  unsubscribe
};
