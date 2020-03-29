import { setLoading, clearLoading, setAlert } from "./page";
import { setMyProfile } from "./profile";
import { SET_DEFAULT_TOPICS, SET_TOPICS } from "./types";
import { axios, reqErrorMsg } from "../utils/requests";

export const setDefaultTopics = () => async dispatch => {
  const loadId = dispatch(setLoading());

  try {
    const res = await axios.get("/topics/default");
    dispatch({ type: SET_DEFAULT_TOPICS, payload: res.data });
  } catch (error) {
    dispatch(setAlert(reqErrorMsg(error), "danger"));
  } finally {
    dispatch(clearLoading(loadId));
  }
};

export const setTopics = () => async dispatch => {
  const loadId = dispatch(setLoading());

  try {
    const res = await axios.get("/topics");
    dispatch({ type: SET_TOPICS, payload: res.data });
  } catch (error) {
    dispatch(setAlert(reqErrorMsg(error), "danger"));
  } finally {
    dispatch(clearLoading(loadId));
  }
};

export const followTopic = topic => async dispatch => {
  try {
    await axios.put(`/topics/${topic}/follow`);
    dispatch(setMyProfile(false));
  } catch (error) {
    dispatch(setAlert(reqErrorMsg(error), "danger"));
  }
};

export const unfollowTopic = (topic, alert = false) => async dispatch => {
  try {
    await axios.put(`/topics/${topic}/unfollow`);
    dispatch(setMyProfile(false));
    if (alert) {
      dispatch(setAlert(`Unfollowed ${topic}`));
    }
  } catch (error) {
    dispatch(setAlert(reqErrorMsg(error), "danger"));
  }
};
