import "./App.css";
import "./lib/fontawesome/css/all.min.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainPage from "./pages/MainPage";
import DetailPage from "./pages/DetailPage";
import Header from "./components/Header";
import SearchPage from "./pages/SearchPage";
import ListPage from "./pages/ListPage";
import Intro from "./pages/Intro";


function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/intro" element={<Intro />} />
          <Route path="/" element={<MainPage />} />
          <Route path="/movie/:movieId" element={<DetailPage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/watchlist" element={<ListPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
