import { useState, useRef, useMemo } from "react";
import { searchMovies } from "../services/movies";

export const useMovies = ({ search, sort }) => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const previousSearch = useRef(search);

  const getMovies = useMemo(() => {
    return async ({ search }) => {
      if (search === previousSearch.current) return;

      try {
        setLoading(true);
        setError(null);
        previousSearch.current = search;
        const newMovies = await searchMovies({ search });
        setMovies(newMovies);
      } catch (e) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    };
  }, []);

  /* const getSortedMovies = () => {
    console.log("getSortedMovies");
    const sortedMovies = sort
      ? [...movies].sort((a, b) => a.title.localeCompare(b.title)) //el localeCompare, compara de forma local con acentos
      : movies;

    return sortedMovies;
  }; */

  const sortedMovies = useMemo(() => {
    return sort
      ? [...movies].sort((a, b) => a.title.localeCompare(b.title)) //el localeCompare, compara de forma local con acentos
      : movies;
  }, [sort, movies]); //solo se ejecutará cuando cambien las dependencias de sort y movies y ya no de search

  return { movies: sortedMovies, getMovies, loading };
};
