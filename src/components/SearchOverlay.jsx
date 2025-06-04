// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useRef } from "react";
import { BiSearch, BiX } from "react-icons/bi";
import { useAppContext } from "../contexts/AppContext";
import { useMovies } from "../hooks/useMovies";
import MovieCard from "./MovieCard";
import { Link } from "react-router-dom";

export default function SearchOverlay({ isOpen, onClose }) {
  const inputRef = useRef(null);
  const { query, setQuery } = useAppContext();
  const { fetchedMovies, isLoading, error } = useMovies(query);

  // Handle escape key and auto-focus
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };

    document.addEventListener("keydown", handleKeyDown);
    inputRef.current?.focus();

    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/90 backdrop-blur-xl z-50 p-4 md:p-6 overflow-y-auto"
    >
      <div className="max-w-4xl mx-auto">
        {/* Search Header */}
        <div className="flex items-center gap-3 mb-6 p-2 border-b border-white/10">
          <BiSearch className="text-white/60 text-xl" />
          <input
            ref={inputRef}
            type="text"
            placeholder="Search for movies..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1 bg-transparent text-white text-lg md:text-xl placeholder:text-white/40 outline-none"
            autoComplete="off"
          />
          <button
            onClick={onClose}
            className="p-1 rounded-full hover:bg-white/10 transition-colors"
            aria-label="Close search"
          >
            <BiX className="text-white text-2xl" />
          </button>
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="flex justify-center py-10">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-white/60"></div>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="text-center text-red-400 py-10">
            Failed to load results. Please try again.
          </div>
        )}

        {/* Results Grid */}
        <AnimatePresence mode="wait">
          {!isLoading && !error && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4"
            >
              {fetchedMovies.map((movie) => (
                <Link
                  key={movie.id}
                  to={`/movie/${movie.id}`}
                  state={{ movie }}
                  onClick={onClose}
                  className="hover:scale-105 transition-transform cursor-pointer active:scale-95"
                >
                  <MovieCard movie={movie} />
                </Link>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Empty State */}
        {!isLoading && fetchedMovies.length === 0 && query.length >= 2 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center text-white/50 py-16"
          >
            <p className="text-lg">No movies found for "{query}"</p>
            <p className="text-sm mt-2">Try different keywords</p>
          </motion.div>
        )}

        {/* Initial State */}
        {!isLoading && query.length < 2 && (
          <div className="text-center text-white/40 py-16">
            <p className="text-lg">Type to search movies</p>
            <p className="text-sm mt-2">Minimum 2 characters</p>
          </div>
        )}
      </div>
    </motion.div>
  );
}
