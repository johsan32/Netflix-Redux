import { actionTypes } from "./actionTypes";
import axios from "axios";

export const getWatch = () => (dispatch) => {
  axios.get("http://localhost:2023/listMovies").then((res) =>
    dispatch({
      type: actionTypes.FETCH_WATCH,
      payload: res.data,
    })
  );
};

export const getFavorite = () => (dispatch) => {
  axios.get("http://localhost:2023/listFavorite").then((res) =>
    dispatch({
      type: actionTypes.FETCH_FAVORITE,
      payload: res.data,
    })
  );
};

export const deleteWatch = (movie) => (dispatch) => {
  axios.delete(`http://localhost:2023/listMovies/${movie.id}`).then(() =>
    dispatch({
      type: actionTypes.REMOVE_WATCH,
      payload: res.data,
    })
  );
};

export const addWatch = (item) => (dispatch) => {
  axios
    .post("http://localhost:2023/listMovies", item)
    .then((res) =>
      dispatch({
        type: actionTypes.ADD_WATCH,
        payload: res.data,
      })
    )
    .catch((error) => {
      console.error(error);
    });
};

export const addFavorite = (hero) => (dispatch) => {
  axios
    .post("http://localhost:2023/listFavorite", hero)
    .then((res) =>
      dispatch({
        type: actionTypes.ADD_FAVORITE,
        payload: res.data,
      })
    )
    .catch((error) => {
      console.error(error);
    });
};

export const deleteFavorite = (movie) => (dispatch) => {
  axios.delete(`http://localhost:2023/listFavorite/${movie.id}`).then(() =>
    dispatch({
      type: actionTypes.REMOVE_FAVORITE,
      payload: res.data,
    })
  );
};
