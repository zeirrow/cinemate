import { useEffect, useState } from "react";
import { getRelatedMovies } from "../utils/getRelatedMovies";
import MovieCard from "./MovieCard";
import { Link } from "react-router-dom";

const RelatedMovies = ({ movie }) => {
  const [related, setRelated] = useState([]);

  useEffect(() => {
    const fetchRelated = async () => {
      if (!movie?.id) return;
      const relatedByGenre = await getRelatedMovies(movie.id, "genre");
      setRelated(relatedByGenre);
    };

    fetchRelated();
  }, [movie]);

  return (
    <section className="px-6 py-8">
      <h2 className="text-white text-xl font-semibold mb-4">Related Movies</h2>
      <div className="flex overflow-x-auto gap-4 scrollbar-hide snap-x">
        {related.map((movie) => (
          <Link
            to={`/movie/${movie.id}`}
            state={{ movie }}
            className="block"
            key={movie.id}
          >
            <MovieCard movie={movie} className="w-[180px] md:w-[220px]" />
          </Link>
        ))}
      </div>
    </section>
  );
};

export default RelatedMovies;
