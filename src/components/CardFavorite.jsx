import { SplideSlide } from "@splidejs/react-splide";
import { baseImgUrl } from "../utils/constants";
import { Link } from "react-router-dom";
import { useState } from "react";
import { getFavorite, deleteFavorite, addWatch, getWatch } from "../redux/actions/listActions";
import { useDispatch } from "react-redux";

const CardFavorite = ({ movie }) => {
  const dispatch = useDispatch();
  const [showContent, setShowContent] = useState(false);
  const [hovered, setHovered] = useState(false);

  const handleMouseEnter = () => {
    setHovered(true);
  };

  const handleMouseLeave = () => {
    setHovered(false);
  };

  const handleDeleteFavorite= (movie) => {
     dispatch(deleteFavorite(movie));
     dispatch(getFavorite());
   
   
  };
  const handleWatchList = (movie) => {
    dispatch(addWatch(movie));
    dispatch(getWatch());
  };

  return (
    <>
    <SplideSlide>
      <div className="position-relative"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
      >
        <Link to={`/movie/${movie.id}`}>
          <img
            className="movie rounded-2 shadow-lg"
            src={`${baseImgUrl}${movie.poster_path}`}
            onLoad={() => setShowContent(true)}
            
          />
          
        </Link>
        {movie.poster_path && showContent && (
          <div>
            <p className="position-absolute top-0 left-0 badge bg-warning m-1">
              {movie.vote_average.toFixed(1)}
            </p>
            <p className="position-absolute top-0  right-0 left-0 end-0 badge bg-success m-1">
              {movie.release_date.substring(0, 4)}
            </p>
            <p className="position-absolute top-0 mt- end-50 badge bg-info m-1">
              {movie.original_language.toUpperCase()}
            </p>

            <p className="position-absolute bottom-0 rounded px-2 mb-0 bg-opacity-75 bg-dark text-white overlay-text text-center w-100 mb-1 ">
              {movie.title}
            </p>
            {hovered && (
              <div className="d-flex">
                
                <p
                    className="plus px-1 outline-none position-absolute top-50 start-0 mt-5  "
                    onClick={() => handleWatchList(movie)}
                  >
                    <i class="fa-solid fa-clapperboard  text-success me-2 fs-4"></i>
                  </p>
                <p
                  className="plus m-0 p-0 remove-button position-absolute top-50 end-0 shadow-none mt-5"
                  onClick={() => handleDeleteFavorite(movie)}
                >
                  <i class="fa-solid fa-trash text-danger me-2 fs-4"></i>
                </p>
                <Link to={`/movie/${movie.id}`}> 
                    <p className="plus  px-1  position-absolute top-50 end-50 start-50 translate-middle ">
                      <i className="fa-solid fa-magnifying-glass text-secondary opacity-25 me-2 fs-2"></i>
                    </p>
                  </Link>
              </div>
            )}
          </div>
        )}
      </div>
    </SplideSlide>
    </>
  );
};

export default CardFavorite ;
