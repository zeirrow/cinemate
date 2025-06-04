const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

export const getRelatedMovies = async (movieId, type = "genre") => {
  try {
    // 1. Get full movie details (including genres, release date, credits)
    const res = await fetch(
      `https://api.themoviedb.org/3/movie/${movieId}?api_key=${API_KEY}&append_to_response=credits`
    );
    if (!res.ok) throw new Error("Failed to fetch movie details");

    const data = await res.json();

    let url = "";
    switch (type) {
      case "genre": {
        const genreId = data.genres?.[0]?.id;
        if (!genreId) return [];
        url = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_genres=${genreId}`;
        break;
      }

      case "cast": {
        const actorId = data.credits?.cast?.[0]?.id;
        if (!actorId) return [];
        url = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_cast=${actorId}`;
        break;
      }

      case "year": {
        const year = data.release_date?.split("-")[0];
        if (!year) return [];
        url = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&primary_release_year=${year}`;
        break;
      }

      default:
        return [];
    }

    const relatedRes = await fetch(url);
    if (!relatedRes.ok) throw new Error("Failed to fetch related movies");
    const relatedData = await relatedRes.json();

    // Exclude the current movie itself from the list
    return relatedData.results.filter((m) => m.id !== movieId);
  } catch (err) {
    console.error("Error getting related movies:", err.message);
    return [];
  }
};

// Example usage:
// const relatedByGenre = await getRelatedMovies(movie.id, "genre");
// const relatedByActor = await getRelatedMovies(movie.id, "cast");
// const relatedByYear = await getRelatedMovies(movie.id, "year");
