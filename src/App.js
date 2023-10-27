import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; // Import BrowserRouter, Routes, and Route
import MovieCard from "./components/MovieCard";
import MovieDetails from "./components/MovieDetails"; // Import the MovieDetails component
import SearchIcon from "./search.svg";
import "./App.css";

const API_URL = "https://www.omdbapi.com?apikey=128dc7d1";

const App = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    searchMovies("Batman");
  }, []);

  const searchMovies = async (title) => {
    const response = await fetch(`${API_URL}&s=${title}`);
    const data = await response.json();

    setMovies(data.Search);
  };

  const handleSearch = (e) => {
    if (e.key === "Enter") {
      searchMovies(searchTerm);
    }
  };

  return (
    <Router>
      <div className="app">
        <h1>MovieLand</h1>

        <div className="search">
          <input
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={handleSearch}
            placeholder="Search for movies"
            
          />
          <img
            src={SearchIcon}
            alt="search"
            onClick={() => searchMovies(searchTerm)}
          />
        </div>

        <Routes>
          <Route path="/" element={<MovieList movies={movies} />} />
          <Route path="/movie/:imdbID" element={<MovieDetails />} />
        </Routes>
      </div>
    </Router>
  );
};

const MovieList = ({ movies }) => (
  <div className="container">
    {movies?.length > 0 ? (
      movies.map((movie) => <MovieCard movie={movie} />)
    ) : (
      <div className="empty">
        <h2>No movies found</h2>
      </div>
    )}
  </div>
);

export default App;
