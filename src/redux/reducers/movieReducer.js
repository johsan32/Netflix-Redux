import { actionTypes } from "../actions/actionTypes";

const initialState = {
  populerMovies: [],
  genres: [],
  fragman: [],
  video: [],
  isLoading: true,
};

export const movieReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_MOVIES:
      return {
        ...state,
        populerMovies: action.payload,
        isLoading: false,
      };
    case actionTypes.FETCH_CATEGORY:
      return {
        ...state,
        genres: action.payload,
      };
    case actionTypes.ADD_FRAGMAN:
      console.log(actionTypes);
      return {
        ...state,
        fragman: [action.payload],
      };
    case actionTypes.ADD_VIDEO:
      console.log(actionTypes);
      return {
        ...state,
        video: [action.payload],
      };

    default:
      return state;
  }
};
