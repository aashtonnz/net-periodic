import { setLoading, clearLoading, setAlert } from "./page";
import {
  SET_CURRENT_PROFILE,
  CLEAR_USER,
  CLEAR_CURRENT_PROFILE,
  SET_PROFILE
} from "./types";
import { axios, reqErrorMsg } from "../utils/requests";

export const setMyProfile = (showLoading = true) => async dispatch => {
  const loadId = showLoading ? dispatch(setLoading()) : null;

  try {
    const res = await axios.get("/profiles/me");
    dispatch({ type: SET_CURRENT_PROFILE, payload: res.data });
  } catch (error) {
    dispatch(setAlert(reqErrorMsg(error), "danger"));
  } finally {
    if (loadId) {
      dispatch(clearLoading(loadId));
    }
  }
};

export const setProfile = (
  username,
  history = null,
  showLoading = false
) => async dispatch => {
  const loadId = showLoading ? dispatch(setLoading()) : null;

  try {
    const res = await axios.get(`/profiles/${username}`);
    dispatch({ type: SET_PROFILE, payload: res.data });
  } catch (error) {
    if (history) {
      history.push("/home");
    }
    dispatch(setAlert(reqErrorMsg(error), "danger"));
  } finally {
    if (loadId) {
      dispatch(clearLoading(loadId));
    }
  }
};

export const subscribe = (username, history) => async dispatch => {
  try {
    await axios.put(`/users/${username}/subscribe`);
    dispatch(setMyProfile(false));
    dispatch(setProfile(username, history, false));
  } catch (error) {
    dispatch(setAlert(reqErrorMsg(error), "danger"));
  }
};

export const unsubscribe = (
  username,
  history,
  alert = false
) => async dispatch => {
  try {
    await axios.put(`/users/${username}/unsubscribe`);
    dispatch(setMyProfile(false));
    dispatch(setProfile(username, history, false));
    if (alert) {
      dispatch(setAlert(`Unsubscribed from ${username}`));
    }
  } catch (error) {
    dispatch(setAlert(reqErrorMsg(error), "danger"));
  }
};

export const deleteUser = history => async dispatch => {
  try {
    await axios.delete("/profiles/me");
    dispatch({ type: CLEAR_USER });
    dispatch({ type: CLEAR_CURRENT_PROFILE });
    history.push("/");
  } catch (error) {
    dispatch(setAlert(reqErrorMsg(error), "danger"));
  }
};

export const updateUser = (
  { name, email, mailSub, password },
  callback
) => async dispatch => {
  const body = JSON.stringify({ name, email, mailSub, password });
  const loadId = dispatch(setLoading());

  try {
    const res = await axios.put("/users", body);
    dispatch({ type: SET_CURRENT_PROFILE, payload: res.data });
    callback();
  } catch (error) {
    dispatch(setAlert(reqErrorMsg(error), "danger"));
  } finally {
    dispatch(clearLoading(loadId));
  }
};

export const updateBio = (bio, callback) => async dispatch => {
  const body = JSON.stringify({ bio });

  try {
    await axios.put("/profiles/me/bio", body);
    dispatch(setMyProfile(false));
    callback();
  } catch (error) {
    dispatch(setAlert(reqErrorMsg(error), "danger"));
  }
};

export const updateLink = (link, callback) => async dispatch => {
  const body = JSON.stringify({ link });

  try {
    await axios.put("/profiles/me/link", body);
    dispatch(setMyProfile(false));
    callback();
  } catch (error) {
    dispatch(setAlert(reqErrorMsg(error), "danger"));
  }
};

export const uploadImg = (img, callback) => async dispatch => {
  const formData = new FormData();
  formData.append("img", img);
  const loadId = dispatch(setLoading());

  try {
    await axios.post("/profiles/me/img", formData, {
      headers: { "Content-Type": "multipart/form-data" }
    });
    dispatch(setMyProfile());
    dispatch(setAlert(`Image successfully uploaded`));
    callback();
  } catch (error) {
    dispatch(setAlert(reqErrorMsg(error), "danger"));
  } finally {
    dispatch(clearLoading(loadId));
  }
};
