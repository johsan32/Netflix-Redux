import Play from "../assets/netflixplay.png";
import Watch from "../assets/watch.png";
import Favori from "../assets/favori2.png";
import Number1 from "../assets/number-1.png";
import Number2 from "../assets/number-2.png";
import Number3 from "../assets/number-3.png";
import Number4 from "../assets/number-4.png";
import Number5 from "../assets/number-5.png";
import VotePlay from "../assets/vote.png";
import imdb from "../assets/imdb.jpg";
import Lang from "../assets/language.png";
import Klaket from "../assets/movie.webp";
import { baseImgUrl } from "../utils/constants";
import { useState } from "react";
import { useDispatch } from "react-redux";
import {
  addFavorite,
  addWatch,
  getFavorite,
  getWatch,
} from "../redux/actions/listActions";
import { useSelector } from "react-redux";
import { getFragman } from "../redux/actions/movieActions";
import ModalSearch from "./ModalSearch";
import { Link } from "react-router-dom";

const Hero = ({ movieState }) => {
  const state = useSelector((store) => store.movieReducer.fragman);
  const dispatch = useDispatch();

  const [selectedVideo, setSelectedVideo] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const random = Math.floor(Math.random() * movieState.length);
  const hero = movieState[random];
  console.log(hero);

  const handleMovie = () => {
    setSelectedVideo(hero);
    setShowModal(true);
    dispatch(getFragman(hero));
  };
  const handleWatch = (hero) => {
    dispatch(addWatch(hero));
    dispatch(getWatch());
  };
  const handleFavorite = (hero) => {
    dispatch(addFavorite(hero));
    dispatch(getFavorite());
  };

  return (
    <div className="row p-4 " style={{ minHeight: "85vh" }}>
      <div className="col-md-6 justify-content-between d-flex flex-column py-3">
        <h1 className="text-center text-md-start">{hero.title}</h1>
        <p className="text-center text-md-start">{hero.overview}</p>
        <div className="d-flex gap-4 align-items-center">
          <p className="bg-warning pe-2 rounded  fw-bold text-center">
            <img src={imdb} className="img-fluid pe-1 rounded img-small" />
            {hero.vote_average.toFixed(1)}
          </p>
          <p className="bg-danger pe-2 rounded fw-bold ">
            <img src={Klaket} className="img-fluid pe-1 rounded  img-small" />
            {hero.release_date.substring(0, 4)}
          </p>
          <p className="bg-secondary pe-2 rounded">
            <img src={VotePlay} className="img-fluid pe-1 rounded img-small" />
            {hero.popularity}
          </p>
          <p className="bg-info  pe-2 rounded text-black fw-bold">
            <img src={Lang} className="img-fluid pe-1 rounded  img-small" />
            {hero.original_language.toUpperCase()}
          </p>
        </div>
        <div className=" gap-3 d-flex justify-content-between align-items-center">
          <div className="d-flex gap-2 ">
            <img
              src={Play}
              className="btn rounded-circle p-0 img-medium"
              onClick={() => handleMovie(hero)}
            />
            <img
              src={Watch}
              className="btn rounded-circle p-0 img-medium"
              onClick={() => handleWatch(hero)}
            />
            <img
              src={Favori}
              className="btn rounded-circle p-0 img-medium"
              onClick={() => handleFavorite(hero)}
            />
          </div>

          <div className=" d-flex align-items-end justify-content-between gap-3">
            <img src={Number1} className="img-small" />
            <img src={Number2} className="img-small" />
            <img src={Number3} className="img-small" />
            <img src={Number4} className="img-small" />
            <img src={Number5} className="img-small me-3" />
          </div>
        </div>
      </div>
      <div className="col-md-6 pt-2 position-relative">
        <img
          src={`${baseImgUrl}${hero.backdrop_path}`}
          className="img-fluid h-100 rounded-4 shadow "
        />
        <Link to={`/movie/${hero.id}`}>
          <p className="btn plus  px-1  position-absolute top-50 end-50 start-50 translate-middle ">
            <i className="fa-solid fa-magnifying-glass text-secondary opacity-50 me-2 fs-1"></i>
          </p>
        </Link>
      </div>
      {showModal &&
        state?.map((video) => (
          <div className=" top-0" key={video.id}>
            <ModalSearch
              setShowModal={setShowModal}
              video={video}
              item={selectedVideo}
            />
          </div>
        ))}
    </div>
  );
};

export default Hero;
