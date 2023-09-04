//import React, { useEffect } from "react";
//import { useDispatch, useSelector } from "react-redux";
//import { getCategory, getMovies } from "../redux/actions/movieActions";
import Loading from "../components/Loading";
import IntroGif from "../assets/intro.gif";
//import { getFavorite, getWatch } from "../redux/actions/listActions";
import { Link } from "react-router-dom";

const Intro = () => {
  return (
    <div className="container" style={{ height: "80vh", overflow: "hidden" }}>
      <Loading />
      <Link to="/">
        <div className="d-flex align-items-center justify-content-center">
          <img
            src={IntroGif}
            alt=""
            style={{ with: "50px", height: "200px" }}
          />
        </div>
      </Link>
    </div>
  );
};

export default Intro;
