import { SET_ALL_POSTS, SET_SUBSCRIBED_POSTS } from "../actions/types";

const initialState = {
  all: null,
  subscribed: null
};

export default (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case SET_ALL_POSTS:
      return {
        ...state,
        all: payload
      };
    case SET_SUBSCRIBED_POSTS:
      return {
        ...state,
        subscribed: payload
      };
    default:
      return state;
  }
};
