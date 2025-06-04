import { useEffect } from "react";
import Hero from "../components/hero/Hero";
import MovieRow from "../components/MovieRow";
import { useAppContext } from "../contexts/AppContext";
import FAQ from "../components/FAQ";

export const HomePage = () => {
  const { movies, setSearchOpen } = useAppContext();

  useEffect(() => {
    const handleKeydown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setSearchOpen((prev) => !prev); // Toggle open/close
      }
    };

    window.addEventListener("keydown", handleKeydown);
    return () => window.removeEventListener("keydown", handleKeydown);
  }, [setSearchOpen]);

  return (
    <>
      <Hero />
      <MovieRow
        id="main-content"
        title="Trending Today"
        movies={movies}
        endpoint="trending/movie/day"
      />
      <MovieRow
        title=" Trending Week"
        movies={movies}
        endpoint="trending/movie/week"
      />
      <MovieRow title="Top Rated" movies={movies} endpoint="movie/top_rated" />
      <MovieRow
        title="Popular interests"
        movies={movies}
        endpoint="movie/popular"
      />
      <FAQ />
    </>
  );
};

export default HomePage;
