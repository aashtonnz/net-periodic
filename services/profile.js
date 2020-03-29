const prependHttp = require("prepend-http");
const Profile = require("../models/Profile");
const User = require("../models/User");
const Post = require("../models/Post");
const fileSystem = require("./fileSystem");
const mailService = require("./mail");
const { publishDate } = require("../utils");

const findMyProfile = async userId => {
  let result = await Profile.findOne({
    user: userId
  })
    .populate("user", ["name", "username", "createdAt", "email"])
    .populate("subscribedTo", ["username", "name"])
    .populate({
      path: "posts",
      select: "title link topics numLikes createdAt"
    })
    .populate({
      path: "likedPosts",
      select: "_id title link topics numLikes profile createdAt",
      populate: {
        path: "profile",
        select: "user imgPath",
        populate: { path: "user", select: "name username" }
      }
    });
  if (!result) {
    return null;
  }
  result = result.toObject();
  result.pendingPost = result.posts.find(
    post => post.createdAt > publishDate()
  );
  result.posts = result.posts.filter(post => post.createdAt <= publishDate());
  result.user.mailSub = await mailService.isSubscribed(result.user.email);
  return result;
};

const findByUser = async userId => {
  const result = await Profile.findOne({ user: userId })
    .populate("user", ["username", "name", "createdAt"])
    .populate({ path: "answers", select: "numWords -_id" })
    .populate("subscribedTo", ["username", "name"])
    .populate({
      path: "posts",
      select: "title link topics numLikes createdAt",
      populate: {
        path: "profile",
        select: "user imgPath",
        populate: { path: "user", select: "name username" }
      }
    })
    .populate({
      path: "likedPosts",
      select: "_id title link topics numLikes profile createdAt",
      populate: {
        path: "profile",
        select: "user imgPath",
        populate: { path: "user", select: "name username" }
      }
    });
  if (!result) {
    return null;
  }
  result.posts = result.posts.filter(post => post.createdAt <= publishDate());
  return result;
};

const remove = async userId => {
  const { posts, imgPath } = await Profile.findOne({ user: userId });
  await Profile.findOneAndDelete({ user: userId });
  await User.findOneAndDelete({ _id: userId });
  await Promise.all(posts.map(post => Post.findByIdAndDelete(post.toString())));
  await fileSystem.remove(imgPath);
};

const updateImg = async (img, userId) => {
  const imgPath = `user${userId}.${img.mimetype.split("/")[1]}`;
  await fileSystem.upload(img.data, imgPath, img.mimetype);
  await Profile.findOneAndUpdate({ user: userId }, { imgPath });
  return imgPath;
};

const updateBio = async (userId, bio) => {
  return await Profile.findOneAndUpdate(
    { user: userId },
    { bio },
    {
      new: true,
      upsert: true
    }
  );
};

const updateLink = async (userId, link) => {
  return await Profile.findOneAndUpdate(
    { user: userId },
    { link: prependHttp(link) },
    {
      new: true,
      upsert: true
    }
  );
};

module.exports = {
  findMyProfile,
  findByUser,
  remove,
  updateImg,
  updateBio,
  updateLink
};
