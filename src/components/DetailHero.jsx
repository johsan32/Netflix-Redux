import { baseImgUrl } from "../utils/constants";
import Klaket from "../assets/movie.webp";
import ReelMovie from "../assets/reel-movie.svg";
import { useDispatch, useSelector } from "react-redux";
import { getFragman, getVideo } from "../redux/actions/movieActions";
import Play from "../assets/netflixplay.png";
import { useState } from "react";
import Tmdb from "../assets/tmdb.svg";
import ModalSearch from "./ModalSearch";

const DetailHero = ({ detail }) => {
  const budget = detail.budget.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  const state = useSelector((store) => store.movieReducer.video);
  const state2 = useSelector((store) => store.movieReducer.fragman);
  const [showModal, setShowModal] = useState(false);
  const dispatch = useDispatch();

  const handleMovieModal = () => {
    setShowModal(true);
    dispatch(getFragman(detail));
  };

  return (
    <div
      className="row detail d-flex align-items-center align-items-md-start justify-content-md-center justify-content-between"
      style={{ minHeight: "70vh" }}
    >
      <div className="col-md-5 d-flex align-items-center justify-content-center position-relative">
        <img
          src={baseImgUrl.concat(detail.poster_path)}
          className="img-fluid rounded shadow "
        />

        <img
          src={Play}
          className="btn rounded top-0 end-0 mt-5 img-medium position-absolute translate-middle-x p-0"
          style={{ width: "50px", height: "50px" }}
          onClick={() => handleMovieModal(detail)}
        />

        <a href={`${state[0]?.US.link}`} target="_blank">
          <img
            src={Tmdb}
            target="_blank"
            onClick={() => dispatch(getVideo(detail))}
            className=" top-0 end-0  img-medium position-absolute rounded-1 translate-middle-x border p-1 btn bg-dark-subtle mb-5"
          />
        </a>
      </div>
      <div className="col-md-7 ps-3 d-flex flex-column justify-content-between align-items-center">
        <div className="d-flex row mt-2 gap-2 align-items-center justify-content-center ">
          <h2 className=" text-center text-md-start">{detail.title} </h2>
          <span className="fs-6 text-light mb-3 text-center text-md-start">
            {detail.tagline}
          </span>
          <div className="gap-1 d-flex align-items-center mb-3 justify-content-center justify-content-md-start">
            <p className="bg-warning px-2 fs-4 rounded fw-bold">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/IMDB_Logo_2016.svg/2560px-IMDB_Logo_2016.svg.png"
                className="mt-0"
                style={{ width: "50px", height: "30px" }}
                alt=""
              />
              {detail.vote_average.toFixed(1)}
            </p>
            <p className="ms-4 bg-info px-2 fs-4 rounded">
              <img src={Klaket} className="img-fluid pe-1 rounded  img-small" />
              {detail.release_date.substring(0, 4)}
            </p>
            <span></span>
            <p className="ms-4 bg-success px-2 fs-4 rounded">
              <img
                src={ReelMovie}
                className="img-fluid pe-1 rounded  img-small"
              />
              {detail.runtime} dk
            </p>
            <span></span>
          </div>
        </div>
        <div className="d-flex">
          {detail.overview ? (
            <p className="px-2 lead mb-5 text-center text-md-start">
              {detail.overview}
            </p>
          ) : (
            <p className="px-2 lead mb-5">"Henüz açıklama yüklenmedi..."</p>
          )}
        </div>

        <div className="row align-items-center small">
          <div className="d-flex gap-3">
            Kategori:
            {detail?.genres.map((genre) => (
              <p
                className=" px-1 rounded bg-body-secondary text-black fs-6"
                key={genre.id}
              >
                {genre.name}
              </p>
            ))}
          </div>
          <div
            className={`gap-2 ${!detail.english_name ? "d-flex" : "d-none"}`}
          >
            Dil:
            {detail.spoken_languages.map((lang) => (
              <p className="px-2 rounded bg-info text-black fs-6">
                {lang.english_name}
              </p>
            ))}
          </div>
          <div className="d-flex  gap-1 flex-wrap ">
            Prodüksiyon:
            {detail.production_companies.map((comp) => (
              <p className=" px-2 rounded bg-success fw-light ">{comp.name}</p>
            ))}
          </div>
          <div className={`gap-2 ${detail.budget > 0 ? "d-flex" : "d-none"}`}>
            Bütçesi:
            <p className=" px-2 rounded bg-secondary fw-light"> {budget} $</p>
          </div>
        </div>
      </div>
      {showModal &&
        state2.map((video) => (
          <div className=" top-0" key={video.id}>
            <ModalSearch
              item={detail}
              setShowModal={setShowModal}
              video={video}
            />
          </div>
        ))}
    </div>
  );
};

export default DetailHero;
