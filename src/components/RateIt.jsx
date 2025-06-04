import { useState } from "react";
import { useAppContext } from "../contexts/AppContext";
import { FiFilm, FiSend, FiStar } from "react-icons/fi";
import StarRating from "../ui/handleRating";

const RateIt = ({ movie }) => {
  const { id: movieId, poster_path, title } = movie ?? {};
  const { reviews, handleAddReview } = useAppContext();
  const existingReview = reviews[movieId];

  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!rating) return;

    setIsSubmitting(true);
    try {
      await handleAddReview(movieId, poster_path, title, {
        rating,
        comment,
        timestamp: Date.now(), // Ensure timestamp gets stored
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // 🚫 Show confirmation if already rated
  if (existingReview) {
    return (
      <div className="bg-gray-900/80 backdrop-blur-sm p-6 rounded-xl border border-gray-700 w-full max-w-2xl text-center">
        <div className="flex flex-col items-center gap-3">
          <FiStar className="text-4xl text-yellow-400" />
          <h3 className="text-white font-semibold text-lg">
            You've already rated this movie
          </h3>
          <p className="text-gray-400 text-sm">
            Your rating:{" "}
            <span className="text-yellow-400 font-medium">
              {existingReview.rating} star
              {existingReview.rating > 1 ? "s" : ""}
            </span>
            {existingReview.comment && ` — "${existingReview.comment}"`}
          </p>
        </div>
      </div>
    );
  }

  // ✅ Show rating form if not yet rated
  return (
    <form
      onSubmit={handleSubmit}
      className="bg-gray-900/80 backdrop-blur-sm p-6 rounded-xl border border-gray-700 w-full max-w-2xl space-y-6"
    >
      <div className="flex items-start gap-3">
        <div className="p-2 bg-accent/10 rounded-lg text-accent">
          <FiFilm className="text-xl" />
        </div>
        <div>
          <h3 className="text-xl text-white font-semibold">Rate this movie</h3>
          <p className="text-gray-400 text-sm mt-1">
            Share your thoughts about {title}
          </p>
        </div>
      </div>

      <div className="space-y-2">
        <StarRating
          maxRating={5}
          onSetRating={setRating}
          defaultRating={0}
          color="text-yellow-400"
          size="h-8 w-8"
        />
        <p className="text-gray-400 text-sm">
          {rating > 0 ? (
            <span className="text-yellow-400">
              You rated it {rating} star{rating > 1 ? "s" : ""}
            </span>
          ) : (
            "Tap to rate"
          )}
        </p>
      </div>

      <div className="space-y-2">
        <label htmlFor="review-comment" className="text-gray-300 text-sm">
          Your review (optional)
        </label>
        <textarea
          id="review-comment"
          rows="3"
          placeholder="What did you think about this movie?"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          className="w-full bg-gray-800 text-white p-3 rounded-md border border-gray-700 focus:outline-none focus:ring-1 focus:ring-accent focus:border-accent transition-colors"
        />
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          disabled={!rating || isSubmitting}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-md font-medium transition-all ${
            rating
              ? "bg-accent hover:bg-accent/90 text-white"
              : "bg-gray-700 text-gray-400 cursor-not-allowed"
          } ${isSubmitting ? "opacity-80" : ""}`}
        >
          {isSubmitting ? (
            <span className="animate-spin">↻</span>
          ) : (
            <FiSend className="text-lg" />
          )}
          Submit Review
        </button>
      </div>
    </form>
  );
};

export default RateIt;
