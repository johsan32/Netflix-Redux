import NetflixLogo from "../assets/logo.png";
import { Link, useLocation } from "react-router-dom";
import "../App.css";
import Watch from "../assets/200w.gif";

const Header = () => {
  const location = useLocation();
  const isSearchPageActive = location.pathname === "/search";

  return (
    <header className="px-4 pt-3">
      <div className="d-flex align-items-center justify-content-between">
        <div className="d-flex">
          <Link to={"/"}>
            <img
              src="https://image.tmdb.org/t/p/original/wwemzKWzjKYJFfCeiB57q3r4Bcm.svg"
              alt=""
              style={{ width: "150px", height: "60px" }}
            />
          </Link>
        </div>
        {isSearchPageActive ? null : (
          <div className="d-flex align-items-center justify-content-center d-none d-md-block">
            <Link to={"/search"}>
              <div className="input-group">
                <input
                  type="search"
                  className="form-control bg-dark text-warning border-danger"
                />

                <button
                  type="button"
                  className="btn btn-outline"
                  style={{ backgroundColor: "rgb(229, 9, 20)" }}
                >
                  <i className="fas fa-search "></i>
                </button>
              </div>
            </Link>
            
          </div>
        )}
        <span className="d-block d-md-none">
          <Link to="/search">
            <button
              type="button"
              className="btn btn-outline search-icon "
              style={{ backgroundColor: "rgb(229, 9, 20)" }}
            >
              <i className="fas fa-search "></i>
            </button>
          </Link>
        </span>

        <div className="d-flex ">
          <Link to={"/watchlist"}>
            <img
              src={Watch}
              className="border rounded-1 align-self-center img-fluid p-0"
              style={{ width: "90px", height: "50px" }}
            />
          </Link>
          <Link to={"/intro"}>
            <img src={NetflixLogo} className="logo" />
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
