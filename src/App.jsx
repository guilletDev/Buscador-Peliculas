import "./App.css";

import { useState, useEffect, useRef, useCallback } from "react";
import debounce from "just-debounce-it";


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
      setError("No se puede buscar una película vacia");
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
  const [sort, setSort] = useState(false)
  const { search, updateSearch, error } = useSearch();
  const { movies, getMovies } = useMovies({search, sort});

  const debounceGetMovies = useCallback(
    debounce((search)=>{
      getMovies({search})
    }, 500),[getMovies]
  ) 


  const handleSubmit = (e) => {
    e.preventDefault();
    getMovies({search})
  };
  
  //Activar o desactivar
  const handleSort = ()=>{
    setSort(!sort)
  }

  const handleChange = (e) => {
    const newSearch = e.target.value
    updateSearch(newSearch);
    debounceGetMovies(newSearch)
  };

  return (
    <div className="page">
      <header>
        <h1>Busca tus peliculas</h1>
        <form className="form" action="" onSubmit={handleSubmit}>
          <input
            onChange={handleChange}
            value={search}
            type="text"
            placeholder="Avengers, Matrix .."
          />
          <input type="checkbox" onChange={handleSort} checked={sort} />
          <button type="submit">Buscar</button>
        </form>
        {error && <p style={{ color: "red", marginLeft: '40px' }}>{error}</p>}
      </header>
      <main>
        <Movies movies={movies} />
      </main>
    </div>
  );
}

export default App;
