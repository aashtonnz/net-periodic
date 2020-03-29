import {
  SET_ALERT,
  CLEAR_ALERT,
  SET_LOADING,
  CLEAR_LOADING
} from "../actions/types";

const initialState = {
  alert: null,
  loadingItems: [],
  isLoading: true
};

export default (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case CLEAR_ALERT:
      return { ...state, alert: null };
    case CLEAR_LOADING: {
      let loadingItems = state.loadingItems.filter(item => item.id !== payload);
      let isLoading = !!loadingItems.length;
      return { ...state, loadingItems, isLoading };
    }
    case SET_ALERT:
      return { ...state, alert: payload };
    case SET_LOADING: {
      let loadingItems = [...state.loadingItems, payload];
      return { ...state, loadingItems, isLoading: true };
    }
    default:
      return state;
  }
};
