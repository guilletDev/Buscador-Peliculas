import "./App.css";

import { useState, useEffect } from "react";
import { useRef } from "react";


import { Movies } from "./components/Movies";
import { useMovies } from "./hook/useMovies";

function useSearch() {
  const [search, updateSearch] = useState("");
  const [error, setError] = useState(null);
  const isfirstInput = useRef(true)

  useEffect(() => {

    if(isfirstInput.current){
      isfirstInput.current = search === ''
      return
    }

    if (search === "") {
      setError("no se puede mostrar una pelicula vacia");
      return;
    }

    if (search.match(/^\d+$/)) {
      setError("No se puede buscar una pelicula con un numero");
      return;
    }

    if (search.length < 3) {
      setError("La busqueda debe tener al menos 3 caracteres");
      return;
    }

    setError(null);

    
  }, [search]);

  return { search, updateSearch, error };
}


function App() {
  const { movies } = useMovies();
  const { search, updateSearch, error } = useSearch()

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(search);
  };

  const handleChange = (e) => {
    updateSearch(e.target.value);
  };

  return (
    <div className="page">
      <header>
        <h1>Buscador de Peliculas</h1>
        <form className="form" action="" onSubmit={handleSubmit}>
          <input
            onChange={handleChange}
            value={search}
            type="text"
            placeholder="Avengers, Matrix .."
          />
          <button type="submit">Buscar</button>
        </form>
        {error && <p style={{ color: "red" }}>{error}</p>}
      </header>
      <main>
        <Movies movies={movies} />
      </main>
    </div>
  );
}

export default App;
