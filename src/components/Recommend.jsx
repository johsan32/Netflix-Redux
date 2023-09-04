import axios from "axios";
import { useEffect, useState } from "react";
import { options2 } from "../utils/constants";
import { Splide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
import LoadingSmall from "./LoadingSmall";
import CardFirst from "./CardFirst";


const Recommend = ({ detail }) => {
  const [movieRecommend, setMovieRecommend] = useState(null);
  console.log(detail);
  useEffect(() => {
    axios

      .get(`movie/${detail.id}/recommendations?language=en-US&page=1`, options2)
      .then((res) => setMovieRecommend(res.data.results.slice(0, 12)))
      .catch((err) => console.log(err));
  }, []);

  console.log(movieRecommend);

  return (
    <div className="p-4">
      {!movieRecommend && (
        <p>
          <LoadingSmall />
        </p>
      )}
      {movieRecommend && <h1>Öneriler</h1>}
      <Splide
        options={{
          autoWidth: true,
          rewind: true,
          gap: "10px",
          pagination: false,
        }}
      >
        {movieRecommend?.map((movie) => (
          <CardFirst key={movie.id} movie={movie} />
        ))}
      </Splide>
    </div>
  );
};

export default Recommend;
