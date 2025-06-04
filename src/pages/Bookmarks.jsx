import { Link } from "react-router-dom";
import { useAppContext } from "../contexts/AppContext";
import MovieCard from "../components/MovieCard";

export default function Bookmarks() {
  const { bookmarkedMovies } = useAppContext();

  return (
    <section className="px-6 py-8 min-h-[300px]">
      <h1 className="text-2xl font-bold mb-6">🎬 Your Bookmarks</h1>

      {bookmarkedMovies.length === 0 ? (
        <div className="text-center text-gray-400 mt-20">
          <p className="text-lg">You haven&quot;t bookmarked any movies yet.</p>
          <p className="text-sm mt-2">Go find something awesome!</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-6">
          {bookmarkedMovies.map((movie) => (
            <Link key={movie.id} to={`/movie/${movie.id}`} state={{ movie }} className="block">
              <MovieCard movie={movie} className="w-[180px] md:w-[220px]" />
            </Link>
          ))}
        </div>
      )}
    </section>
  );
}
