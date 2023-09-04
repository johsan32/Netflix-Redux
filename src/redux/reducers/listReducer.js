import { actionTypes } from "../actions/actionTypes";

const initialState = {
  listMovies: [],
  listFavorite: [],
  isLoading: true,
};

export const listReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_WATCH:
      console.log("edd", action.type);
      return {
        ...state,
        listMovies: action.payload,
        isLoading: false,
      };
    case actionTypes.ADD_WATCH:
      console.log("addw", action.payload);

      
      return {
        ...state,
        listMovies: [...state.listMovies, action.payload],
      };
    case actionTypes.REMOVE_WATCH:
      return { ...state, listMovies: [...state.listMovies, action.payload] };

    case actionTypes.FETCH_FAVORITE:
      console.log(action.type);
      return {
        ...state,
        listFavorite: action.payload,
      };
    case actionTypes.ADD_FAVORITE:
      console.log(action.type);
      return {
        ...state,
        listFavorite: [...state.listFavorite, action.payload],
      };
    case actionTypes.REMOVE_FAVORITE:
      console.log(action.type);
      return { ...state, listFavorite: [...state.listFavorite, action.payload] };
    default:
      return state;
  }
};
