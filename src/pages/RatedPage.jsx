// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "framer-motion";
import { useAppContext } from "../contexts/AppContext";
import StarRating from "../ui/handleRating";
import { FiStar, FiFilm, FiMessageSquare } from "react-icons/fi";

const RatedPage = () => {
  const { reviews } = useAppContext();

  // Convert reviews object to array and sort by timestamp
  const ratedMovies = Object.entries(reviews)
    .map(([id, { title, poster_path, rating, comment, timestamp }]) => ({
      id: Number(id),
      movie: { title, poster_path },
      rating,
      comment,
      timestamp,
    }))
    .sort((a, b) => new Date(b.timestamp || 0) - new Date(a.timestamp || 0));

  if (ratedMovies.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex flex-col items-center justify-center py-20 text-center"
      >
        <FiStar className="text-4xl text-gray-500 mb-4" />
        <h3 className="text-xl text-gray-400 mb-2">No rated movies yet</h3>
        <p className="text-gray-500 max-w-md">
          Rate movies you've watched to see them appear here
        </p>
      </motion.div>
    );
  }

  return (
    <div className="p-4 sm:p-6">
      <div className="flex items-center gap-3 mb-6">
        <FiStar className="text-2xl text-accent" />
        <h2 className="text-2xl font-bold text-white">Your Rated Movies</h2>
        <span className="ml-auto bg-accent/20 text-accent px-3 py-1 rounded-full text-sm">
          {ratedMovies.length} {ratedMovies.length === 1 ? "movie" : "movies"}
        </span>
      </div>

      <motion.div
        layout
        className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
      >
        <AnimatePresence>
          {ratedMovies.map(({ id, rating, comment, movie }) => (
            <motion.div
              key={id}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-gray-900/80 backdrop-blur-sm rounded-xl overflow-hidden border border-gray-700 hover:border-accent transition-colors group"
            >
              {movie?.poster_path ? (
                <div className="relative aspect-[2/3]">
                  <img
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    alt={movie.title}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                </div>
              ) : (
                <div className="aspect-[2/3] bg-gray-800 flex items-center justify-center">
                  <FiFilm className="text-4xl text-gray-600" />
                </div>
              )}

              <div className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-bold text-white truncate group-hover:text-accent transition-colors">
                    {movie.title}
                  </h3>
                  <span className="bg-accent/10 text-accent px-2 py-1 rounded text-xs font-medium">
                    {rating}/5
                  </span>
                </div>

                <StarRating
                  maxRating={5}
                  defaultRating={rating}
                  color="text-yellow-400"
                  size="h-5 w-5"
                  className="mb-3"
                  readOnly
                />

                {comment && (
                  <div className="flex items-start gap-2 text-sm text-gray-300 mt-3">
                    <FiMessageSquare className="flex-shrink-0 mt-0.5 text-gray-500" />
                    <p className="line-clamp-3">{comment}</p>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default RatedPage;
