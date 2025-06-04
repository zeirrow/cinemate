import { useEffect, useState } from "react";

export const useTrailer = (movieId, options = {}) => {
  const [trailerKey, setTrailerKey] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!movieId) return;

    const controller = new AbortController();
    const { signal } = controller;

    const fetchTrailer = async () => {
      setIsLoading(true);
      setError(null);
      
      try {
        const apiKey = import.meta.env.VITE_TMDB_API_KEY || options.apiKey;
        if (!apiKey) {
          throw new Error("API key is required");
        }

        const res = await fetch(
          `https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${apiKey}`,
          { signal }
        );

        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }

        const data = await res.json();
        const trailer = findTrailer(data.results, options);
        
        setTrailerKey(trailer?.key || null);
      } catch (err) {
        if (err.name !== 'AbortError') {
          setError(err.message || "Failed to load trailer");
        }
      } finally {
        setIsLoading(false);
      }
    };

    const findTrailer = (videos, opts = {}) => {
      const {
        type = "Trailer",
        site = "YouTube",
        official = true
      } = opts;
      
      return videos.find(
        (vid) =>
          vid.type === type &&
          vid.site === site &&
          vid.official === official
      );
    };

    fetchTrailer();

    return () => controller.abort();
  }, [movieId, options]);

  return { trailerKey, isLoading, error };
};