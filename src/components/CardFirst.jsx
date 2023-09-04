import { useState } from "react";
import { baseImgUrl } from "../utils/constants";
import { SplideSlide } from "@splidejs/react-splide";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  addFavorite,
  addWatch,
  getWatch,
  getFavorite,
} from "../redux/actions/listActions";
import { getFragman } from "../redux/actions/movieActions";
import ModalSearch from "./ModalSearch";

const CardFirst = ({ movie }) => {
  const [showContent, setShowContent] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const state = useSelector((store) => store.movieReducer.fragman);

  const dispatch = useDispatch();

  const handleLinkClick = () => {
    window.location.href = `/movie/${movie.id}`;
  };

  const handleWatch = (movie) => {
    dispatch(addWatch(movie));
    dispatch(getWatch());
  };
  const handleFavorite = (movie) => {
    dispatch(addFavorite(movie));
    dispatch(getFavorite());
  };

  // const handleMovie = (movie) => {
  //   setShowModal(true);
  //   dispatch(getFragman(movie));
  // };

  return (
    <>
      <SplideSlide>
        <div className="position-relative mb-2">
          <img
            className="movie rounded-2 shadow-lg"
            src={`${baseImgUrl}${movie.poster_path}`}
            onLoad={() => setShowContent(true)}
          />

          <p className="position-absolute top-0 end-0 badge bg-warning m-1">
            {movie.vote_average.toFixed(1)}
          </p>
          <p className="position-absolute bottom-0 rounded px-2 mb-0 bg-opacity-75 bg-dark text-white overlay-text text-center w-100 mb-1 ">
            {movie.title}
          </p>
          <p
            className="plus px-1 outline-none position-absolute top-0 start-0 "
            onClick={() => handleFavorite(movie)}
          >
            <i className="fas fa-star text-warning me-2 fs-4"></i>
          </p>
          <p
            className="plus px-1 outline-none position-absolute top-0 start-0 mt-5 "
            onClick={() => handleWatch(movie)}
          >
            <i className="fa-solid fa-clapperboard text-info me-2 fs-4"></i>
          </p>
          {/* <p
            className="plus px-1 outline-none position-absolute bottom-50 start-0 mb-5"
            onClick={() => handleMovie(movie)}
          >
            <i className="fa-solid fa-circle-play text-danger me-2 fs-3"></i>
          </p> */}
          <Link to={`/movie/${movie.id}`}>
            <p className="plus  px-1  position-absolute top-50 end-50 start-50 translate-middle ">
              <i
                className="fa-solid fa-magnifying-glass text-secondary opacity-25 me-2 fs-2"
                onClick={handleLinkClick}
              ></i>
            </p>
          </Link>
        </div>
      </SplideSlide>

      {/* {showModal &&
        state?.map((video) => (
          <div>
            <ModalSearch
              className="recommend"
              setShowModal={setShowModal}
              item={state}
              video={video}
            />
          </div>
        ))} */}
    </>
  );
};

export default CardFirst;
