const MovieCard = ({ movie, className="" }) => {
  return (
    <div className={`${className} min-w-[160px] snap-center bg-gray-900 rounded-lg overflow-hidden shadow-md hover:scale-105 transition-transform duration-200`}>
      <img
        src={
          movie.poster_path
            ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
            : "/images/fallback.png"
        }
        alt={movie.title}
        className="w-full h-60 object-cover"
        loading="lazy"
        width={260}
        height={360}
      />
      <div className="p-3">
        <h3 className="text-white text-sm font-medium truncate">
          {movie.title}
        </h3>
        {movie.release_date && (
          <p className="text-gray-400 text-xs mt-1">
            {new Date(movie.release_date).getFullYear()}
          </p>
        )}
      </div>
    </div>
  );
};

export default MovieCard;
