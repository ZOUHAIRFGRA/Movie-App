import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const MovieDetails = () => {
  const { imdbID } = useParams();
  const [movieDetails, setMovieDetails] = useState(null);

  useEffect(() => {
    const API_URL = `https://www.omdbapi.com?apikey=128dc7d1&i=${imdbID}`; // Use the IMDb ID to fetch movie details

    const fetchMovieDetails = async () => {
      try {
        const response = await fetch(API_URL);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setMovieDetails(data);
      } catch (error) {
        console.error("Error fetching movie details:", error);
      }
    };

    fetchMovieDetails();
  }, [imdbID]);

  return (
    <div className="movie-details">
      {movieDetails ? (
        <div>
          <h2>{movieDetails.Title}</h2>
          <p>{movieDetails.Plot}</p>
          <p>Director: {movieDetails.Director}</p>
          <p>Actors: {movieDetails.Actors}</p>
          <p>Genre: {movieDetails.Genre}</p>
          <p>Runtime: {movieDetails.Runtime}</p>
          <p>IMDb Rating: {movieDetails.imdbRating}</p>
        </div>
      ) : (
        <div className="empty">
          <h2>Loading movie details...</h2>
        </div>
      )}
    </div>
  );
};

export default MovieDetails;
