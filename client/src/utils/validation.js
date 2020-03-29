import { isURL, isEmail } from "validator";

const USERNAME_REGEX = /^[0-9a-zA-Z_-]+$/g;
const TOPIC_REGEX = /^[0-9a-zA-Z_-]+$/g;
const MIN_PASSWORD_LEN = 6;
const MIN_USERNAME_LEN = 3;
const MAX_USERNAME_LEN = 20;
const MAX_TITLE_LEN = 100;
const MAX_TOPIC_LEN = 20;
const MAX_IMG_KB = 50;
const MAX_NAME_LEN = 20;
const MAX_BIO_LEN = 200;

export const maxBioLength = MAX_BIO_LEN;

export const checkBio = bio => {
  if (bio && bio.length > MAX_BIO_LEN) {
    return `Bio must be no more than ${MAX_BIO_LEN} characters`;
  }
  return "";
};

export const checkLogin = (username, password) => {
  if (!username) {
    return "Username is required";
  }
  if (!password) {
    return "Password is required";
  }
  if (password.length < MIN_PASSWORD_LEN) {
    return "Invalid credentials";
  }
  return "";
};

export const checkTopics = topics => {
  const topicsArray = topics.split(",").map(topic => topic.trim());
  if (topicsArray.length === 1 && topicsArray[0].includes(" ")) {
    return "Topics must be seperated by commas";
  }
  if (topicsArray.filter(topic => !topic.match(TOPIC_REGEX)).length) {
    return "Topics can contain letters, numbers, dashes, and underscores only";
  }
  if (topicsArray.filter(topic => topic.length > MAX_TOPIC_LEN).length) {
    return `Topics must be less than ${MAX_TOPIC_LEN} characters`;
  }
  return "";
};

export const checkPost = (title, link, topics) => {
  if (!title) {
    return "Title is required";
  }
  if (title.length > MAX_TITLE_LEN) {
    return `Title must be less than ${MAX_TITLE_LEN} characters`;
  }
  if (!link) {
    return "Link is required";
  }
  const invalidLinkMsg = checkLink(link);
  if (invalidLinkMsg) {
    return invalidLinkMsg;
  }
  if (topics) {
    return checkTopics(topics);
  }
  return "";
};

export const checkLink = link => {
  if (!isURL(link, { protocols: ["http", "https"] })) {
    return "Invalid link";
  }
  return "";
};

export const checkSignUp = (username, name, email, password, password2) => {
  if (!username) {
    return "Username is required";
  }
  if (!username.match(USERNAME_REGEX)) {
    return "Username can contain letters, numbers, dashes, and underscores only";
  }
  if (
    username.length < MIN_USERNAME_LEN ||
    username.length > MAX_USERNAME_LEN
  ) {
    return `Username must be between ${MIN_USERNAME_LEN} and ${MAX_USERNAME_LEN} characters`;
  }
  if (name.length > MAX_NAME_LEN) {
    return `Name must be less than ${MAX_NAME_LEN} characters`;
  }
  if (email && !isEmail(email)) {
    return "Email address is not valid";
  }
  if (password.length < MIN_PASSWORD_LEN) {
    return `Please enter a password with ${MIN_PASSWORD_LEN} or more characters`;
  }
  if (password !== password2) {
    return "Passwords do not match";
  }
  return "";
};

export const checkUserEdit = (name, email, password, password2) => {
  if (name.length > MAX_NAME_LEN) {
    return `Name must be less than ${MAX_NAME_LEN} characters`;
  }
  if (email && !isEmail(email)) {
    return "Email address is not valid";
  }
  if (password.length && password.length < MIN_PASSWORD_LEN) {
    return `Please enter a password with ${MIN_PASSWORD_LEN} or more characters`;
  }
  if (password !== password2) {
    return "Passwords do not match";
  }
  return "";
};

export const checkImg = file => {
  const extension = file.name.split(".").pop();
  if (!["jpg", "jpeg", "png"].includes(extension)) {
    return "Image type not valid";
  }
  if (file.size > MAX_IMG_KB * 1000) {
    return `Image must be less than ${MAX_IMG_KB} MB`;
  }
  return "";
};
