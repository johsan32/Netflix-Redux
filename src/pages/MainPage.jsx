import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCategory, getMovies } from "../redux/actions/movieActions";
import Hero from "../components/Hero";
import Loading from "../components/Loading";
import CategoryList from "../components/CategoryList";
import { getFavorite, getWatch } from "../redux/actions/listActions";


const MainPage = () => {
  const dispatch = useDispatch();
  const state = useSelector((store) => ({movieState :store.movieReducer, listState: store.listReducer}));
  
  console.log(state);
  useEffect(() => {
    dispatch(getMovies());
    dispatch(getCategory());
    dispatch(getWatch());
    dispatch(getFavorite());

  }, []);

  return (
    <div>
      {state.movieState.isLoading && <Loading />}
      {!state.movieState.isLoading && (
        <>
          <div>
            <Hero movieState={state.movieState.populerMovies} />
          </div>
          <div>
            {state.movieState.genres?.map((genre) => (
              <CategoryList key={genre.id} genre={genre} />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default MainPage;
