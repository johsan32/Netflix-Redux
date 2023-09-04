import axios from "axios";
import React, { useEffect, useState } from "react";
import { options2 } from "../utils/constants";
import SearchCard from "../components/SearchCard";

const SearchPage = () => {
  const [query, setQuery] = useState("");
  const [searchData, setSearchData] = useState([]);

  function onChange(e) {
    e.preventDefault();
    setQuery(e.target.value);
  }
  const handleClick = () => {
    setQuery("");
  };

  useEffect(() => {
    axios
      .get(
        `https://api.themoviedb.org/3/search/movie?query=${query}&include_adult=false&language=tr&page=1`,
        options2
      )
      .then((res) => {
        if (!res.data.errors) {
          setSearchData(res.data.results.slice(0, 20));
        } else {
          setSearchData([]);
        }
      })
      .catch((err) => console.log(err));
  }, [query]);

  return (
    <>
      <div className={`${searchData.length === 0 ? "search" : ""}`}>
        <div className="continer p-4">
          <div className="input-group d-flex align-items-center justify-content-center">
            <form action="" className="d-flex  ">
              <input
                type="text"
                onChange={onChange}
                className="form-control z-5"
                placeholder="arama..."
                value={query}
              />
              <button
                type="button"
                onClick={handleClick}
                className="btn "
                style={{ backgroundColor: "rgb(229, 9, 20)" }}
              >
                <i className="fas fa-search"></i>
              </button>
            </form>
          </div>
        </div>
        <div className="wrapper px-4">
          <div className="row">
            {searchData.length > 0 && (
              <div>
                <h5 className="mb-3 text-center bg-info py-1 rounded-1 text-dark">
                  Arama sonuçlarınız görüntüleniyor.. Bulunan sonuç
                  <span className="text-white ms-3 px-2 fs-4 bg-warning rounded-1">
                    {searchData.length}
                  </span>
                </h5>
              </div>
            )}
          </div>

          {searchData.length > 0 && (
            <div className="row">
              {searchData.map((item) => (
                <SearchCard key={item.id} item={item} />
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default SearchPage;
