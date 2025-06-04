import { createContext, useContext, useState } from "react";
import { useMovies } from "../hooks/useMovies";
import { useLocalStorageState } from "../hooks/useLocalStorageState";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const { fetchedMovies, isLoading, error } = useMovies("Terminator");
  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState(null);
    const [movies, setMovies] = useState(fetchedMovies || []);

  const [searchOpen, setSearchOpen] = useState(false);

  const [bookmarkedMovies, setBookmarkedMovies] = useLocalStorageState(
    [],
    "bookmarked"
  );
  const [watched, setWatched] = useLocalStorageState([], "watched");

  const [reviews, setReviews] = useLocalStorageState({}, "reviews");

  const handleAddReview = (movieId, poster_path, title, review) => {
    setReviews((prev) => ({
      ...prev,
      [movieId]: {
        ...review,
        poster_path,
        title,
      },
    }));
  };

  const handleAddBookmark = (movie) => {
    setBookmarkedMovies((prev) => {
      if (prev.some((m) => m.id === movie.id)) return prev;
      return [...prev, movie];
    });
  };

  const handleRemoveBookmark = (id) => {
    setBookmarkedMovies((bookmarkedMovies) =>
      bookmarkedMovies.filter((movie) => movie.id !== id)
    );
  };

  return (
    <AppContext.Provider
      value={{
        query,
        setQuery,
        selectedId,
        setSelectedId,
        movies,
        setMovies,
        isLoading,
        error,
        watched,
        setWatched,
        searchOpen,
        setSearchOpen,
        bookmarkedMovies,
        setBookmarkedMovies,
        handleAddBookmark,
        handleRemoveBookmark,
        reviews,
        handleAddReview,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppContext;

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
};
