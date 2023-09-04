import axios from "axios";
import { useEffect, useState } from "react";
import { baseImgUrl, options2 } from "../utils/constants";
import Loading from "./Loading";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
import Number1 from "../assets/number-1.png";
import Number2 from "../assets/number-2.png";
import Number3 from "../assets/number-3.png";
import Number4 from "../assets/number-4.png";
import Number5 from "../assets/number-5.png";
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

const CategoryList = ({ genre }) => {
  const [categoryMovie, setCategoryMovie] = useState(null);
  const [showContent, setShowContent] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const state = useSelector((store) => store.movieReducer.fragman);
  const dispatch = useDispatch();
  useEffect(() => {
    axios
      .get(
        `/discover/movie?include_adult=false&include_video=false&language=tr&sort_by=popularity.desc&with_genres=${genre.id}`,
        options2
      )
      .then((res) => setCategoryMovie(res.data.results))
      .catch((err) => console.log(err));
  }, []);

  const handleWatch = (movie) => {
    dispatch(addWatch(movie));
    dispatch(getWatch());
  };
  const handleFavorite = (movie) => {
    dispatch(addFavorite(movie));
    dispatch(getFavorite());
  };

  const handleMovie = (movie) => {
    setSelectedMovie(movie);
    setShowModal(true);
    dispatch(getFragman(movie));
  };

  console.log(showModal);
  //console.log("state", movie);
  return (
    <div className="px-4 py-2">
      {!categoryMovie && <Loading />}
      {categoryMovie && (
        <>
          <div className="d-flex justify-content-between align-items-center mb-2 ">
            <h3 className="ps-3 ">{genre.name}</h3>
            {showContent && (
              <div className=" d-flex align-items-end justify-content-between gap-4">
                <img src={Number1} className="img-small" />
                <img src={Number2} className="img-small" />
                <img src={Number3} className="img-small" />
                <img src={Number4} className="img-small" />
                <img src={Number5} className="img-small me-3" />
              </div>
            )}
          </div>

          <Splide
            options={{
              autoWidth: true,
              rewind: true,
              gap: "8px",
              pagination: false,
            }}
          >
            {categoryMovie?.map((movie) => (
              <SplideSlide key={movie.id}>
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
                  <p
                    className="plus px-1 outline-none position-absolute bottom-50 start-0 mb-5"
                    onClick={() => handleMovie(movie)}
                  >
                    <i className="fa-solid fa-circle-play text-danger me-2 fs-3"></i>
                  </p>
                  <Link to={`/movie/${movie.id}`}>
                    <p className="plus  px-1  position-absolute top-50 end-50 start-50 translate-middle ">
                      <i className="fa-solid fa-magnifying-glass text-secondary opacity-25 me-2 fs-2"></i>
                    </p>
                  </Link>
                </div>
              </SplideSlide>
            ))}
          </Splide>
        </>
      )}
      {showModal &&
        selectedMovie &&
        state?.map((video) => (
          <div className="top-0 z-50">
            <ModalSearch
              setShowModal={setShowModal}
              item={selectedMovie}
              video={video}
            />
          </div>
        ))}
    </div>
  );
};

export default CategoryList;
