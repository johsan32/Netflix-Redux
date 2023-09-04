import ReactPlayer from "react-player";
import Close from "../assets/close.png";
import Watch from "../assets/watch.png";
import Favori from "../assets/favori2.png";
import { useDispatch, useSelector } from "react-redux";
import { addFavorite, addWatch, getFavorite, getWatch } from "../redux/actions/listActions";

const ModalSearch = ({ item, setShowModal, video }) => {
  const state = useSelector((store) => store.movieReducer.fragman);
  const dispatch = useDispatch();
  const officialTrailer = video.find(item => item.name === 'Official Trailer');
  const keyToUse = officialTrailer && officialTrailer.key ? officialTrailer.key : video[0].key;
  
  

  const handleMovieModal = () => {
    setShowModal(false);
  };
  const handleFavorite = (item) => {
    dispatch(getFavorite());
   dispatch(addFavorite(item));
  
 };
 const handleWatch = (item) => {
  dispatch(getWatch());
 dispatch(addWatch(item));

};

  return (
    <div className="modal  ">
      <div className="modal-dialog-centered  modal-info">
        <div className="modal-body ">
          <p className="fs-5 ps-2">
         
            {item.title} |{" "}
            <span className="fs-6 text-black fw-medium">
              {item.original_title}
            </span>{" "}
          </p>
          <ReactPlayer
            className="react-player"
            width={"90vw"}
            height={"70vh"}
            url={`https://www.youtube.com/watch?v=${keyToUse}`}
            controls
            playing
          />
        </div>
        <div className="pb-2 d-flex align-items-center justify-content-end gap-5">
          <img
            src={Watch}
            className="btn rounded-circle p-0 img-medium"
            onClick={() => handleWatch(item)}
          />
          <img
            src={Favori}
            className="plus btn rounded-circle p-0 img-medium"
            onClick={() => handleFavorite(item)}
          />
          <img
            src={Close}
            className="btn rounded-circle p-0 img-medium"
            onClick={handleMovieModal}
          />
        </div>
      </div>
    </div>
  );
};

export default ModalSearch;
