import { useEffect } from "react";
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "framer-motion";
import { FiPlay, FiPlus, FiInfo, FiChevronDown } from "react-icons/fi";
import { useDynamicMovies } from "../../hooks/useDynamicMovies";
import { Link } from "react-router-dom";
import HeroSkeleton from "./HeroSkeleton";
import HeroError from "./HeroError";
import { useAppContext } from "../../contexts/AppContext";

export default function Hero() {
  const { dynamicMovie, isLoading, error } =
    useDynamicMovies("trending/movie/day");

  const mainMovie = dynamicMovie?.[0];

    const { setMovies, movies, handleAddBookmark, handleRemoveBookmark, bookmarkedMovies } = useAppContext();
    const isBookmarked = bookmarkedMovies.some((m) => m.id === mainMovie?.id);


  // Fallback movie data
  const fallbackMovie = {
    title: "Turning Red",
    overview:
      "A heartwarming animated film about a 13-year-old girl who turns into a red panda every time she gets excited.",
    backdrop_path: "/qsdjk9oAKSQMWs0Vt5Pyfh6O4GZ.jpg",
  };

  const displayMovie = mainMovie || fallbackMovie;

  // Prevent infinite re-renders by guarding context update
  useEffect(() => {
    if (
      mainMovie &&
      !movies.some((m) => m.id === mainMovie.id)
    ) {
      setMovies([...movies, mainMovie]);
    }
  }, [mainMovie, movies, setMovies]);

  if (isLoading) return <HeroSkeleton />;
  if (error) return <HeroError />;

  return (
    <section className="relative w-full h-[90vh] bg-cover bg-center overflow-hidden">
      {/* Background Image with Enhanced Parallax */}
      <motion.div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(https://image.tmdb.org/t/p/original${displayMovie.backdrop_path})`,
        }}
        initial={{ scale: 1.2 }}
        animate={{ scale: 1 }}
        transition={{
          duration: 1.5,
          ease: [0.16, 1, 0.3, 1],
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-l from-black/30 to-transparent" />
      </motion.div>

      {/* Content with Staggered Animations */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 h-full flex flex-col justify-end pb-16">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="max-w-2xl"
        >
          <AnimatePresence mode="wait">
            <motion.h1
              key={displayMovie.id || "fallback"}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="text-4xl md:text-6xl font-bold mb-4 text-white drop-shadow-2xl"
            >
              {displayMovie.title}
            </motion.h1>
          </AnimatePresence>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="text-lg md:text-xl mb-6 text-gray-100 drop-shadow-md line-clamp-3"
          >
            {displayMovie.overview}
          </motion.p>

          <motion.div
            className="flex flex-wrap gap-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.5 }}
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 bg-white text-black px-6 py-3 rounded-md font-semibold hover:bg-gray-100 transition"
            >
              <FiPlay className="text-lg" /> Watch Trailer
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 bg-gray-800/80 text-white px-6 py-3 rounded-md font-semibold hover:bg-gray-700/80 transition backdrop-blur-sm"
                              onClick={() =>
                  isBookmarked
                    ? handleRemoveBookmark(mainMovie.id)
                    : handleAddBookmark(mainMovie)
                }

            >
              <FiPlus className={`${isBookmarked ? "text-red-400" : ""} text-lg`}  /> My List
            </motion.button>

            {mainMovie && (
              <Link to={`/movie/${mainMovie.id}`}>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center gap-2 bg-transparent text-white px-6 py-3 rounded-md font-semibold hover:bg-white/10 transition border border-white/20"
                >
                  <FiInfo className="text-lg" /> Details
                </motion.button>
              </Link>
            )}
          </motion.div>
        </motion.div>
      </div>

      {/* Enhanced Scrolling Indicator */}
      <motion.div
        className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-20 cursor-pointer"
        onClick={() => {
          const nextSection = document.getElementById("main-content");
          nextSection?.scrollIntoView({ behavior: "smooth" });
        }}
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
      >
        <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
          <motion.div
            className="w-1 h-2 bg-white rounded-full mt-1"
            animate={{ y: [0, 4, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
          />
        </div>
      </motion.div>
    </section>
  );
}
