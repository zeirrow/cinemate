import { useEffect, useState } from "react";

const KEY = import.meta.env.VITE_TMDB_API_KEY;

export const useDynamicMovies = (endpoint = "movie/top_rated") => {
  const [dynamicMovie, setDynamicMovie] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!endpoint) return;

    const controller = new AbortController();

    const fetchMovies = async () => {
      try {
        setIsLoading(true);
        setError("");

        const res = await fetch(
          `https://api.themoviedb.org/3/${endpoint}?api_key=${KEY}`,
          { signal: controller.signal }
        );

        if (!res.ok) throw new Error("Failed to fetch movies");

        const data = await res.json();
        setDynamicMovie(data.results || []);
      } catch (err) {
        if (err.name !== "AbortError") {
          console.error(err.message);
          setError(err.message);
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchMovies();

    return () => controller.abort();
  }, [endpoint]);

  return { dynamicMovie, isLoading, error };
};


// Endpoints You Can Use
// movie/top_rated
// movie/popular
// movie/now_playing
// trending/movie/day
// trending/movie/week
// search/movie?query=batman 

