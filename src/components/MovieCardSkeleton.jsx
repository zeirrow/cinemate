const MovieCardSkeleton = ({ className = "" }) => {
  return (
    <div
      className={`${className} min-w-[160px] snap-center bg-gray-900 rounded-lg overflow-hidden shadow-md`}
    >
      {/* Image placeholder */}
      <div className="w-full h-60 bg-gray-800 animate-pulse"></div>

      {/* Text placeholders */}
      <div className="p-3">
        <div className="h-4 w-3/4 bg-gray-800 rounded animate-pulse mb-2"></div>
        <div className="h-3 w-1/2 bg-gray-800 rounded animate-pulse"></div>
      </div>
    </div>
  );
};

export default MovieCardSkeleton;
