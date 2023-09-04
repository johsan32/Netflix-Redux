import { useEffect } from "react";
import { Splide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
import { useDispatch, useSelector } from "react-redux";
import CardWatch from "../components/CardWatch";
import { getFavorite, getWatch } from "../redux/actions/listActions";
import CardFavorite from "../components/CardFavorite";
import ListFree from "../assets/liste.png";

const ListPage = () => {
  const state = useSelector((store) => store.listReducer);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getWatch());
    dispatch(getFavorite());
  }, []);

  console.log(state);

  return (
    <>
      <div className="px-4 py-2">
        <h1 className="text-center mt-4 mb-2">Film İzleme Listesi</h1>

        {state.listMovies.length <= 0 ? (
          <div className="d-flex position-relative">
            <h1 className="position-absolute z-2 top-50 start-50 translate-middle text-center bg-body-secondary text-dark rounded-3 p-2">
              İzleme listenize henüz film eklemediniz...
            </h1>
            <img
              src={ListFree}
              alt=""
              className="postion-absolute opacity-50"
              style={{ width: "100%", maxHeight: "400px" }}
            />
          </div>
        ) : (
          <>
            <Splide
              options={{
                autoWidth: true,
                rewind: true,
                gap: "8px",
                pagination: false,
              }}
            >
              {state.listMovies.map((movie) => (
                <CardWatch key={movie.id} movie={movie} />
              ))}
            </Splide>
          </>
        )}
      </div>

      <div className="px-4 py-2 mb-5">
        <h1 className="text-center mt-4 mb-2">Favori Film Listesi</h1>

        {state.listFavorite.length <= 0 ? (
          <div className="d-flex position-relative">
            <h1 className="position-absolute z-2 top-50 start-50 translate-middle text-center bg-body-secondary text-dark rounded-3 p-2">
             Favori listenize henüz film eklemediniz...
            </h1>
            <img
              src={ListFree}
              alt=""
              className="postion-absolute opacity-50"
              style={{ width: "100%", maxHeight: "400px" }}
            />
          </div>
        ) : (
          <>
            <Splide
              options={{
                autoWidth: true,
                rewind: true,
                gap: "8px",
                pagination: true,
              }}
            >
              {state.listFavorite.map((movie) => (
                <CardFavorite key={movie.id} movie={movie} />
              ))}
            </Splide>
          </>
        )}
      </div>
    </>
  );
};

export default ListPage;
