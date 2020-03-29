import {
  CLEAR_CURRENT_PROFILE,
  SET_CURRENT_PROFILE,
  SET_PROFILE
} from "../actions/types";

const initialState = { myProfile: null, profile: null };

export default (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case CLEAR_CURRENT_PROFILE:
      return { ...state, myProfile: null };
    case SET_CURRENT_PROFILE:
      return { ...state, myProfile: payload };
    case SET_PROFILE:
      return { ...state, profile: payload };
    default:
      return state;
  }
};
