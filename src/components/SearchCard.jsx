import { baseImgUrl } from "../utils/constants";
import imdb from "../assets/imdb.jpg";
import Lang from "../assets/language.png";
import Klaket from "../assets/movie.webp";
import { Link } from "react-router-dom";
import Play from "../assets/netflixplay.png";
import Watch from "../assets/watch.png";
import Favori from "../assets/favori2.png";
import ImgLoad from "../assets/img-load.gif";
import { useState } from "react";
import ModalSearch from "./ModalSearch";
import { useDispatch } from "react-redux";
import { getFragman } from "../redux/actions/movieActions";
import { useSelector } from "react-redux";
import {
  addFavorite,
  getFavorite,
  addWatch,
  getWatch,
} from "../redux/actions/listActions";

const SearchCard = ({ item }) => {
  const state = useSelector((store) => store.movieReducer.fragman);
  const dispatch = useDispatch();

  const [showModal, setShowModal] = useState(false);

  const handleMovieModal = () => {
    setShowModal(true);
    dispatch(getFragman(item));
  };
  const handleWatch = (item) => {
    dispatch(getWatch());
    dispatch(addWatch(item));
  };

  const handleFavorite = (item) => {
    dispatch(getFavorite());
    dispatch(addFavorite(item));
  };

  return (
    <div className="col-sm-12 col-md-6 col-lg-4 mb-4">
      {item.title && (
        <div
          className="card text-dark card-has-bg click-col"
          style={{
            backgroundImage: `url(${baseImgUrl}${item.poster_path})`,
            backgroundSize: "cover",
            objectFit: "fill",
          }}
        >
          {item.poster_path ? (
            <img
              src={`${baseImgUrl}${item.poster_path}`}
              style={{ width: "150px", height: "200px", borderRadius: "8px" }}
            />
          ) : (
            <img
              src={ImgLoad}
              style={{ width: "150px", height: "200px", borderRadius: "8px" }}
            />
          )}
          <div className="card-img-overlay d-flex flex-column">
            <div className="card-body">
              <div className="d-flex gap-2 align-items-center justify-content-between">
                <p className="bg-warning pe-2 rounded fw-semibold text-center fs-6">
                  <img
                    src={imdb}
                    className="img-fluid p-0 me-2 pb-1rounded img-smaller"
                  />
                  {item.vote_average.toFixed(1)}
                </p>
                <p className="bg-success text-white pe-2 rounded fw-semibold fs-6 ">
                  <img
                    src={Klaket}
                    className="img-fluid me-1 p-0 rounded  img-smaller"
                  />
                  {item.release_date.substring(0, 4)}
                </p>
                <p className="bg-info pe-2 rounded text-black ">
                  <img
                    src={Lang}
                    className="img-fluid pe-1 pb-1 rounded img-smaller"
                  />
                  {item.original_language.toUpperCase()}
                </p>
              </div>
              <small className="card-meta mb-2 text-center">
                {item.original_title}
              </small>
              <h4 className="card-title mt-0 ">
                <a className="text-dark">{item.title}</a>
              </h4>
            </div>
            <div className="card-footer mt-3 media d-flex align-items-start justify-content-between mb-5">
              <Link to={`/movie/${item.id}`}>
                {item.backdrop_path ? (
                  <img
                    src={`${baseImgUrl}${item.backdrop_path}`}
                    style={{
                      width: "120px",
                      height: "80px",
                      borderRadius: "8px",
                    }}
                  />
                ) : (
                  <img
                    src={ImgLoad}
                    style={{
                      width: "100px",
                      height: "80px",
                      borderRadius: "8px",
                    }}
                  />
                )}
              </Link>
              <div className="d-flex button  gap-3 flex-column justify-content-end align-items-end ">
                <img
                  src={Play}
                  className="btn rounded p-0 img-medium"
                  onClick={handleMovieModal}
                />
                <img
                  src={Watch}
                  className="plus rounded-circle p-0 img-medium avtive"
                  onClick={() => handleWatch(item)}
                />
                <img
                  src={Favori}
                  className="button rounded-circle p-0 img-medium"
                  onClick={() => handleFavorite(item)}
                />
              </div>
            </div>
          </div>
        </div>
      )}
      {showModal &&
        state.map((video) => (
          <div className=" top-0" key={video.id}>
            <ModalSearch
              item={item}
              setShowModal={setShowModal}
              state={state}
              video={video}
            />
          </div>
        ))}
    </div>
  );
};

export default SearchCard;
