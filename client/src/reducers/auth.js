import { CLEAR_USER, SET_USER, SET_TOKEN } from "../actions/types";

const initialState = {
  token: localStorage.getItem("token"),
  isAuthenticated: false,
  user: null
};

export default (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case CLEAR_USER:
      localStorage.removeItem("token");
      return { token: null, isAuthenticated: false, user: null };
    case SET_TOKEN:
      localStorage.setItem("token", payload);
      return { ...state, token: payload, isAuthenticated: true };
    case SET_USER:
      return { ...state, isAuthenticated: true, user: payload };
    default:
      return state;
  }
};
