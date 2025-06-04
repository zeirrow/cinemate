// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FiArrowLeft, FiHome } from "react-icons/fi";
import { useAppContext } from "../contexts/AppContext";

const NotFoundPage = () => {
  const { setSearchOpen } = useAppContext();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-900 to-gray-800 text-white p-6"
    >
      <div className="max-w-md w-full text-center">
        {/* Animated 404 Illustration */}
        <motion.div
          animate={{
            y: [-10, 10, -10],
            rotate: [0, 5, -5, 0],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="mb-8 mx-auto w-64 h-64 relative"
        >
          <div className="absolute inset-0 bg-gray-700 rounded-full opacity-20"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-9xl font-bold">
            404
          </div>
          <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 3, repeat: Infinity }}
            className="absolute bottom-0 left-1/2 transform -translate-x-1/2 text-4xl"
          >
            🚀
          </motion.div>
        </motion.div>

        <h1 className="text-4xl font-bold mb-4">Lost in Space</h1>
        <p className="text-gray-300 mb-8">
          The page you're looking for doesn't exist or has been moved. Let's get
          you back to safety!
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/"
            className="flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg transition-colors"
          >
            <FiHome className="text-lg" />
            Go Home
          </Link>
          <button
            onClick={() => window.history.back()}
            className="flex items-center justify-center gap-2 bg-gray-700 hover:bg-gray-600 text-white px-6 py-3 rounded-lg transition-colors"
          >
            <FiArrowLeft className="text-lg" />
            Go Back
          </button>
        </div>

        <div className="mt-12 text-sm text-gray-500">
          <p>Still lost? Try these helpful links:</p>
          <div className="flex justify-center gap-4 mt-2">
            <Link to="/" className="hover:text-indigo-400 transition-colors">
              Popular Movies
            </Link>
            <Link to="/" className="hover:text-indigo-400 transition-colors">
              TV Shows
            </Link>
            <button
              className="hover:text-indigo-400 transition-colors"
              onClick={() => setSearchOpen(true)}
            >
              Search
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default NotFoundPage;
