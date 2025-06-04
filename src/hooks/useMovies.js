import { useEffect, useState } from "react";

const KEY = import.meta.env.VITE_TMDB_API_KEY;

export const useMovies = (query) => {
  const [fetchedMovies, setFetchedMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  

  useEffect(() => {
    const controller = new AbortController();

    const timeoutId = setTimeout(() => {
      if (!query || query.trim().length < 2) {
        setFetchedMovies([]);
        setError("");
        return;
      }

      const fetchMovies = async () => {
        try {
          setIsLoading(true);
          setError("");

          const res = await fetch(
            `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(
              query
            )}&api_key=${KEY}`,
            { signal: controller.signal }
          );

          if (!res.ok) throw new Error("Failed to fetch movies");

          const data = await res.json();

          if (data.results.length === 0)
            throw new Error("No movies found for that search");

          setFetchedMovies(data.results);
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
    }, 500);

    return () => {
      controller.abort();
      clearTimeout(timeoutId);
    };
  }, [query]);

  return { fetchedMovies, isLoading, error };
};

