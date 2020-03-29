import { setLoading, clearLoading, setAlert } from "./page";
import { setMyProfile } from "./profile";
import { SET_USER, CLEAR_USER, SET_TOKEN } from "./types";
import setAuthToken from "../utils/setAuthToken";
import { axios, reqErrorMsg } from "../utils/requests";

export const setUser = () => async dispatch => {
  setAuthToken();
  const loadId = dispatch(setLoading());

  try {
    const res = await axios.get("/auth");
    dispatch({ type: SET_USER, payload: res.data });
    dispatch(setMyProfile());
  } catch (error) {
    dispatch({ type: CLEAR_USER });
  } finally {
    dispatch(clearLoading(loadId));
  }
};

export const login = (username, password) => async dispatch => {
  const body = JSON.stringify({ username, password });
  const loadId = dispatch(setLoading());

  try {
    const res = await axios.post("/auth", body);
    dispatch({ type: SET_TOKEN, payload: res.data.token });
    dispatch(setUser());
  } catch (error) {
    dispatch(setAlert(reqErrorMsg(error), "danger"));
    dispatch({ type: CLEAR_USER });
  } finally {
    dispatch(clearLoading(loadId));
  }
};

export const signup = ({
  username,
  name,
  email,
  mailSub,
  password
}) => async dispatch => {
  const body = JSON.stringify({ username, name, email, mailSub, password });
  const loadId = dispatch(setLoading());

  try {
    const res = await axios.post("/users", body);
    dispatch({ type: SET_TOKEN, payload: res.data.token });
    dispatch(setUser());
  } catch (error) {
    dispatch(setAlert(reqErrorMsg(error), "danger"));
    dispatch({ type: CLEAR_USER });
  } finally {
    dispatch(clearLoading(loadId));
  }
};

export const logout = history => dispatch => {
  dispatch({ type: CLEAR_USER });
  history.push("/login");
};
