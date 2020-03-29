import uuid from "uuid";
import { SET_ALERT, CLEAR_ALERT, SET_LOADING, CLEAR_LOADING } from "./types";

const ALERT_TIMEOUT_MS = 5000;

export const setAlert = (
  msg,
  status,
  timeout = ALERT_TIMEOUT_MS
) => dispatch => {
  dispatch({ type: SET_ALERT, payload: { msg, status } });
  setTimeout(() => dispatch(clearAlert()), timeout);
};

export const clearAlert = () => (dispatch, getState) => {
  if (getState().page.alert) {
    dispatch({ type: CLEAR_ALERT });
  }
};

export const setLoading = (msg = "") => dispatch => {
  const id = uuid.v4();
  dispatch({ type: SET_LOADING, payload: { id, msg } });
  return id;
};

export const clearLoading = id => (dispatch, getState) => {
  if (getState().page.isLoading) {
    dispatch({ type: CLEAR_LOADING, payload: id });
  }
};
