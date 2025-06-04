import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import AppLayout from "./ui/AppLayout";
import MovieDetail from "./pages/MovieDetail";
import Bookmarks from "./pages/Bookmarks";
import RatedPage from "./pages/RatedPage";
import ScrollToTop from "./ui/ScrollToTop";
import NotFoundPage from "./components/NotFoundPage";
import BackToTop from "./ui/BackToTop";

const App = () => {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route element={<AppLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/movie/:id" element={<MovieDetail />} />
          <Route path="/bookmarks" element={<Bookmarks />} />
          <Route path="/rated" element={<RatedPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
      <BackToTop />
    </>
  );
};

export default App;
