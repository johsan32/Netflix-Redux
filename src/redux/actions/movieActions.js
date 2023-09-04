import axios from "axios";
import { actionTypes } from "./actionTypes";
import { options, options2 } from "../../utils/constants";

axios.defaults.baseURL = "https://api.themoviedb.org/3";

export const getMovies = () => (dispatch) => {
  axios
    .get("/movie/popular", options)
    .then((res) =>
      dispatch({
        type: actionTypes.FETCH_MOVIES,
        payload: res.data.results,
      })
    )
    .catch((err) => console.log(err));
};

export const getCategory = () => (dispatch) => {
  axios
    .get("/genre/movie/list", options)
    .then((res) =>
      dispatch({
        type: actionTypes.FETCH_CATEGORY,
        payload: res.data.genres,
      })
    )
    .catch((err) => console.log(err));
};

export const getFragman = (item) => (dispatch) => {
  axios
    .get(`/movie/${item.id}/videos?language=en-US`, options2)
    .then((res) =>
      dispatch({
        type: actionTypes.ADD_FRAGMAN,
        payload: res.data.results,
      })
    )
    .catch((err) => console.log(err));
};

export const getVideo = (item) => (dispatch) => {
  axios
    .get(`/movie/${item.id}/watch/providers`, options2)
    .then((res) =>
      dispatch({
        type: actionTypes.ADD_VIDEO,
        payload: res.data.results,
      })
    )
    .catch((err) => console.log(err));
};
