import axios from "axios";
import { useEffect, useState } from "react";
import { options2 } from "../utils/constants";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
import LoadingSmall from "./LoadingSmall";
import { baseImgUrl } from "../utils/constants";
const CardImg = ({ detail }) => {
  const [movieImg, setMovieImg] = useState(null);
  console.log(detail);
  useEffect(() => {
    axios

      .get(`movie/${detail.id}//images`, options2)
      .then((res) => setMovieImg(res.data.backdrops.slice(0, 25)))
      .catch((err) => console.log(err));
  }, []);

  console.log(movieImg);

  return (
    <div className="p-4">
      {!movieImg && (
        <p>
          <LoadingSmall />
        </p>
      )}
      {movieImg && <h1>Resimler</h1>}
      <Splide
        options={{
          autoWidth: true,
          rewind: true,
          gap: "10px",
          pagination: false,
        }}
      >
        {movieImg?.map((movie) => (
          <SplideSlide key={movie.id}>
            <div>
              <img
                className="movie rounded-2 shadow-lg"
                src={`${baseImgUrl}${movie.file_path}`}
              />
            </div>
          </SplideSlide>
        ))}
      </Splide>
    </div>
  );
};
export default CardImg;
