import { useLocation, useParams, useNavigate } from "react-router-dom";
import { FiArrowLeft, FiBookmark } from "react-icons/fi";
import { useAppContext } from "../contexts/AppContext";
import RelatedMovies from "../components/RelatedMovies";
import RateIt from "../components/RateIt";
import { useTrailer } from "../hooks/useTrailer";
import SharePopover from "../ui/SharePopover";

export default function MovieDetail() {
  const { id } = useParams();
  const { state } = useLocation();
  const navigate = useNavigate();

  const { movies, handleAddBookmark, handleRemoveBookmark, bookmarkedMovies } = useAppContext();
  const movie = state?.movie || movies.find((m) => m.id === parseInt(id));
  const isBookmarked = bookmarkedMovies.some((m) => m.id === movie?.id);

  const { trailerKey, isLoading: loadingTrailer } = useTrailer(movie?.id);

  if (!movie) {
    return (
      <div className="text-center py-20 text-white">
        <p className="text-xl mb-4">Movie not found</p>
        <button
          onClick={() => navigate(-1)}
          className="bg-accent px-4 py-2 rounded text-black font-medium"
        >
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 max-w-5xl mx-auto">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 mb-6 hover:text-accent transition-colors"
      >
        <FiArrowLeft /> Back to results
      </button>

      <div className="flex flex-col md:flex-row gap-6">
        <div className="w-full md:w-1/3">
          <img
            src={
              movie.poster_path
                ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                : "/images/fallback.png"
            }
            alt={movie.title}
            className="w-full rounded-xl shadow-lg object-cover aspect-[2/3]"
            onError={(e) => {
              e.target.src = "/placeholder-movie.jpg";
            }}
          />
        </div>

        <div className="flex-1">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold mb-2">{movie.title}</h1>
              <p className="text-gray-400 mb-4">
                {movie.release_date?.split("-")[0]} •{" "}
                {movie.runtime
                  ? `${Math.floor(movie.runtime / 60)}h ${movie.runtime % 60}m`
                  : "N/A"}{" "}
                • {movie.vote_average ? `⭐ ${movie.vote_average.toFixed(1)}/10` : ""}
              </p>
            </div>
            <div className="flex gap-2">
              <button
                className="p-2 rounded-full bg-white/10 hover:bg-white/20 cursor-pointer"
                aria-label="Bookmark"
                onClick={() =>
                  isBookmarked
                    ? handleRemoveBookmark(movie.id)
                    : handleAddBookmark(movie)
                }
              >
                <FiBookmark className={isBookmarked ? "text-red-400" : ""} />
              </button>
                <SharePopover movie={movie} />

            </div>
          </div>

          <div className="flex gap-2 flex-wrap mb-4">
            {movie.genres?.map((genre) => (
              <span
                key={genre.id}
                className="px-3 py-1 text-sm bg-white/10 rounded-full hover:bg-white/20 transition-colors"
              >
                {genre.name}
              </span>
            ))}
          </div>

          <h2 className="text-xl font-semibold mb-2">Overview</h2>
          <p className="mb-6">{movie.overview || "No overview available."}</p>

          <RateIt movie={movie} />

          {movie.production_companies?.length > 0 && (
            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-2">Production</h2>
              <div className="flex flex-wrap gap-4">
                {movie.production_companies.map(
                  (company) =>
                    company.logo_path && (
                      <img
                        key={company.id}
                        src={`https://image.tmdb.org/t/p/w200${company.logo_path}`}
                        alt={company.name}
                        className="h-8 object-contain opacity-80 hover:opacity-100 transition-opacity"
                        title={company.name}
                      />
                    )
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="mt-10">
        <h2 className="text-xl font-semibold mb-4">Trailer</h2>
        {loadingTrailer && <p className="text-accent">Loading trailer...</p>}
        {!loadingTrailer && trailerKey ? (
          <div className="aspect-video w-full bg-black/50 rounded-xl overflow-hidden">
            <iframe
              src={`https://www.youtube.com/embed/${trailerKey}?autoplay=0&rel=0`}
              title={`${movie.title} Trailer`}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full"
            />
          </div>
        ) : !loadingTrailer ? (
          <p className="text-gray-500">No trailer available.</p>
        ) : null}
      </div>

      <RelatedMovies movie={movie} />
    </div>
  );
}
