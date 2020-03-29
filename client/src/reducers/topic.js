import { SET_DEFAULT_TOPICS, SET_TOPICS } from "../actions/types";

const initialState = {
  defaults: null,
  topics: null
};

export default (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case SET_DEFAULT_TOPICS:
      return { ...state, defaults: payload };
    case SET_TOPICS:
      return { ...state, topics: payload };
    default:
      return state;
  }
};
