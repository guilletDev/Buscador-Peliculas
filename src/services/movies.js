const API_KEY = "436d6473";

export const searchMovies = async ({ search }) => {
  if (search === "") return null;

  try {
    const response = await fetch(
      `https://www.omdbapi.com/?i=tt3896198&apikey=${API_KEY}&s=${search}`
    );
    const data = await response.json();

    const movies = data.Search;

    return movies?.map((movie) => ({
      id: movie.imdbID,
      title: movie.Title,
      year: movie.Year,
      image: movie.Poster,
    }));
  } catch (e) {
    throw new Error("Error searching movies");
  }
};
