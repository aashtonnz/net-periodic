import { setLoading, clearLoading, setAlert } from "./page";
import { setMyProfile, setProfile } from "./profile";
import { SET_ALL_POSTS, SET_SUBSCRIBED_POSTS } from "./types";
import { axios, reqErrorMsg } from "../utils/requests";

const ALERT_TITLE_CHARS = 20;

export const setAllPosts = (showLoading = true) => async dispatch => {
  const loadId = showLoading ? dispatch(setLoading()) : null;

  try {
    const res = await axios.get("/posts");
    dispatch({ type: SET_ALL_POSTS, payload: res.data });
  } catch (error) {
    dispatch(setAlert(reqErrorMsg(error), "danger"));
  } finally {
    if (loadId) {
      dispatch(clearLoading(loadId));
    }
  }
};

export const setSubscribedPosts = (showLoading = true) => async dispatch => {
  const loadId = showLoading ? dispatch(setLoading()) : null;

  try {
    const res = await axios.get("/posts/subscribed");
    dispatch({ type: SET_SUBSCRIBED_POSTS, payload: res.data });
  } catch (error) {
    dispatch(setAlert(reqErrorMsg(error), "danger"));
  } finally {
    if (loadId) {
      dispatch(clearLoading(loadId));
    }
  }
};

export const createPost = ({ title, link, topics }) => async dispatch => {
  const body = JSON.stringify({ title, link, topics });

  try {
    await axios.post("/posts", body);
    dispatch(setAllPosts(false));
    dispatch(setSubscribedPosts(false));
    dispatch(setMyProfile(false));
  } catch (error) {
    dispatch(setAlert(reqErrorMsg(error), "danger"));
  }
};

export const likePost = (postId, username = null) => async dispatch => {
  try {
    await axios.put(`/posts/${postId}/like`);
    dispatch(setMyProfile(false));
    dispatch(setAllPosts(false));
    dispatch(setSubscribedPosts(false));
    if (username) {
      dispatch(setProfile(username));
    }
  } catch (error) {
    dispatch(setAlert(reqErrorMsg(error), "danger"));
  }
};

export const unlikePost = (postId, username = null) => async dispatch => {
  try {
    await axios.put(`/posts/${postId}/unlike`);
    dispatch(setMyProfile(false));
    dispatch(setAllPosts(false));
    dispatch(setSubscribedPosts(false));
    if (username) {
      dispatch(setProfile(username));
    }
  } catch (error) {
    dispatch(setAlert(reqErrorMsg(error), "danger"));
  }
};

export const deletePost = (postId, title) => async dispatch => {
  try {
    await axios.delete(`/posts/${postId}`);
    dispatch(setMyProfile(false));
    dispatch(
      setAlert(
        `Deleted post "${title.substring(0, ALERT_TITLE_CHARS)}${
          title.length > ALERT_TITLE_CHARS ? "..." : ""
        }"`
      )
    );
  } catch (error) {
    dispatch(setAlert(reqErrorMsg(error), "danger"));
  }
};
