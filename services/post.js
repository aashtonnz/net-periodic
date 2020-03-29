const prependHttp = require("prepend-http");
const Post = require("../models/Post");
const Topic = require("../models/Topic");
const profileService = require("./profile");
const { prevPublishDate, publishDate } = require("../utils");

const MAX_ALL_POSTS = 1000;

const findById = async id => {
  return await Post.findById(id)
    .select("profile topics numLikes")
    .populate({
      path: "profile",
      select: "user"
    });
};

const findLeading = async () => {
  return await Post.find({
    createdAt: { $gt: prevPublishDate(), $lte: publishDate() }
  })
    .populate({
      path: "profile",
      select: "imgPath user numSubscribed",
      populate: ["user", "name username"]
    })
    .sort({ numSubscribed: "desc" })
    .limit(MAX_ALL_POSTS);
};

const findSubscribed = async userId => {
  const profile = await profileService.findByUser(userId);
  let result = [];
  if (!profile) {
    return result;
  }
  profile.subscribedTo &&
    (await Promise.all(
      profile.subscribedTo.map(async subId => {
        const subProfile = await profileService.findByUser(subId);
        result = result.concat(subProfile.posts);
      })
    ));
  result = result.filter(
    post =>
      post.createdAt <= publishDate() && post.createdAt > prevPublishDate()
  );
  result = result.sort(
    (postA, postB) => postA.numSubscribed - postB.numSubscribed
  );
  return result;
};

const findPending = async profile => {
  return await Post.findOne({
    profile,
    createdAt: { $gt: publishDate() }
  });
};

const create = async (profile, title, link, topicsStr) => {
  const topics = !topicsStr
    ? []
    : topicsStr.split(",").map(topic => topic.trim().toLowerCase());
  const newPost = new Post({
    profile: profile._id,
    title,
    link: prependHttp(link),
    topics,
    numLikes: 0,
    numSubscribed: profile.numSubscribed
  });
  topics.forEach(async topic => {
    await Topic.findOneAndUpdate(
      { value: topic },
      { $inc: { numPosts: 1 } },
      { upsert: true }
    );
  });
  const post = await newPost.save();
  profile.posts.unshift(post);
  await profile.save();
  return post;
};

const like = async (post, userId) => {
  const profile = await profileService.findByUser(userId);
  if (
    !profile.likedPosts
      .map(post => post.toString())
      .includes(post._id.toString())
  ) {
    post.numLikes++;
    profile.likedPosts.unshift(post);
    await profile.save();
    await post.save();
  }
};

const unlike = async (post, userId) => {
  const profile = await profileService.findByUser(userId);
  if (
    profile.likedPosts
      .map(likedPost => likedPost._id.toString())
      .includes(post._id)
  ) {
    post.numLikes--;
    profile.likedPosts = profile.likedPosts
      .map(likedPost => likedPost._id.toString())
      .filter(id => id !== post._id.toString());
    await profile.save();
    await post.save();
  }
};

const isAuthorized = async (post, userId) =>
  post.profile.user.toString() === userId;

const remove = async post => {
  post.topics.forEach(async topic => {
    await Topic.findOneAndUpdate({ value: topic }, { $inc: { numPosts: -1 } });
    await Topic.findOneAndDelete({ value: topic, numPosts: 0 });
  });
  await post.delete();
};

module.exports = {
  findById,
  findLeading,
  findSubscribed,
  findPending,
  create,
  like,
  unlike,
  isAuthorized,
  remove
};
