import axios from "axios";
import { useEffect, useState } from "react";
import { baseImgUrl, options } from "../utils/constants";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
import LoadingSmall from "./LoadingSmall";
import Unknowm from "../assets/unknown.jpg";

const Cast = ({ detail }) => {
  const [movieDetail, setMovieDetail] = useState(null);
  console.log(detail);
  useEffect(() => {
    axios
      .get(`movie/${detail.id}/credits?`, options)
      .then((res) => setMovieDetail(res.data))
      .catch((err) => console.log(err));
  }, []);

  console.log(movieDetail);

  return (
    <div className="p-4">
      {!movieDetail && (
        <p>
          <LoadingSmall />
        </p>
      )}
      {movieDetail && <h1>Oyuncular</h1>}
      <Splide
        options={{
          autoWidth: true,
          rewind: true,
          gap: "10px",
          pagination: false,
        }}
      >
        {movieDetail?.cast.map((item) => (
          <SplideSlide key={item.credit_id}>
            <div className="position-relative">
              {item.profile_path ? (
                <img
                  src={`${baseImgUrl}${item.profile_path}`}
                  className="movie rounded"
                />
              ) : (
                <img
                  src={Unknowm}
                  style={{ height: "375px" }}
                  className="movie rounded img-fluid"
                />
              )}

              <p className="position-absolute top-0 end-0 start-0 px-2 rounded text-center fs-5 bg-warning m-1">
                {item.name}
              </p>
              <p className="position-absolute bottom-0  fs-5 end-0 start-0 rounded px-2 mb-0 bg-opacity-50 bg-dark text-white text-center m-1">
                {item.character}
              </p>
            </div>
          </SplideSlide>
        ))}
      </Splide>
      {movieDetail && <h1 className="mt-4">Film Ekibi</h1>}
      <Splide
        options={{
          autoWidth: true,
          rewind: true,
          gap: "10px",
          pagination: false,
        }}
      >
        {movieDetail?.crew.map((item) => (
          <SplideSlide key={item.credit_id}>
            <div className="position-relative mb-4">
              {item.profile_path ? (
                <img
                  src={`${baseImgUrl}${item.profile_path}`}
                  className="movie rounded"
                />
              ) : (
                <img
                  src="https://www.artibiryapim.com/upload/userfiles/images/film-ekibi-produksiyon-1030x1021.jpg"
                  className="movie rounded opacity-50"
                  style={{ height: "375px" }}
                />
              )}

              <p className="position-absolute top-0 end-0 start-0 px-2 rounded text-center fs-5 bg-info-subtle text-dark m-1">
                {item.name}
              </p>
              <p className="position-absolute bottom-0  fs-5 end-0 start-0 rounded px-2 mb-0 bg-opacity-50 bg-dark text-white text-center m-1">
                {item.known_for_department}
              </p>
            </div>
          </SplideSlide>
        ))}
      </Splide>
    </div>
  );
};

export default Cast;
