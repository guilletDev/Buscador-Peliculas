import whitResults from "../mocks/with-results.json";
import withoutResults from "../mocks/no-results.json";
import { useState } from "react";

export const useMovies = ({ search }) => {
  const [responseMovies, setResponseMovies] = useState([]);
  const movies = responseMovies.Search;

  const mappedMovies = movies?.map((movie) => ({
    id: movie.imdbID,
    title: movie.Title,
    year: movie.Year,
    image: movie.Poster,
  }));

  const getMovies = () => {
    if (search) {
      fetch(`https://www.omdbapi.com/?i=tt3896198&apikey=436d6473&s=${search}`)
        .then((res) => res.json())
        .then((json) => setResponseMovies(json));
    } else setResponseMovies(withoutResults);
  };

  return { movies: mappedMovies, getMovies };
};
