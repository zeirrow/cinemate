//eslint-disable-next-line
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { useDynamicMovies } from "../hooks/useDynamicMovies";
import MovieCard from "./MovieCard";
import { FiChevronRight } from "react-icons/fi";
import MovieCardSkeleton from "./MovieCardSkeleton";

const SKELETON_COUNT = 5;

export default function MovieRow({ title, endpoint, id = "" }) {
  const { dynamicMovie, isLoading, error } = useDynamicMovies(endpoint);

  return (
    <section className="px-4 sm:px-6 py-8" id={id}>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl md:text-2xl font-bold pb-2 pl-4 relative border-l-4 border-accent after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-0.5 after:w-16 after:bg-accent after:rounded-full after:transition-all after:duration-500">
          {title}
        </h2>
        <button className="text-gray-400 hover:text-white flex items-center text-sm">
          See all <FiChevronRight className="ml-1" />
        </button>
      </div>

      {/* Loading Skeleton */}
      {isLoading && (
        <div className="flex overflow-x-auto gap-4 scrollbar-hide pb-4">
          {[...Array(SKELETON_COUNT)].map((_, i) => (
            <MovieCardSkeleton key={i} className="w-[180px] md:w-[220px]" />
          ))}
        </div>
      )}

      {/* Error State */}
      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-8 text-red-400"
          >
            Failed to load movies. {error}
            <button
              onClick={() => window.location.reload()}
              className="block mx-auto mt-2 text-white underline"
            >
              Try again
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Movie Grid */}
      <AnimatePresence>
        {!isLoading && !error && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="relative"
          >
            <div className="flex overflow-x-auto gap-4 scrollbar-hide pb-4">
              {dynamicMovie.map((movie) => (
                <motion.div
                  key={movie.id}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="flex-none snap-center"
                >
                  <Link
                    to={`/movie/${movie.id}`}
                    state={{ movie }}
                    className="block"
                  >
                    <MovieCard
                      movie={movie}
                      className="w-[180px] md:w-[220px]"
                    />
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
