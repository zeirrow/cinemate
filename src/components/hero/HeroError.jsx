function HeroError() {
  return (
    <div className="relative w-full h-[90vh] bg-gray-900 flex items-center justify-center">
      <div className="text-center px-4">
        <h2 className="text-2xl font-bold text-red-400 mb-4">
          Failed to load featured content
        </h2>
        <p className="text-gray-300 mb-6">
          We couldn't fetch the trending movie. Please try again later.
        </p>
        <button
          onClick={() => window.location.reload()}
          className="px-6 py-3 bg-red-600 hover:bg-red-700 rounded-md text-white font-medium transition"
        >
          Retry
        </button>
      </div>
    </div>
  );
}

export default HeroError;
