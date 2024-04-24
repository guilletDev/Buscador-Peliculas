
const ListOffMovies = ({movies}) => {
    return (
      <ul>
        {movies.map((movie) => {
          return (
            <li key={movie.id}>
              <h3>{movie.title}</h3>
              <p>{movie.year}</p>
              <img src={movie.image} alt={movie.Title} />
            </li>
          );
        })}
      </ul>
    );
  };

  const NoMoviesResults = ()=>{
      return(
        <h2>Nada para mostrar</h2>
      )
  }

  export const Movies = ({movies})=>{

   
    const hasMovies = movies?.length > 0;

    return(

        hasMovies ? 
            < ListOffMovies movies={movies} /> : 
            <NoMoviesResults />
        
    )
  }