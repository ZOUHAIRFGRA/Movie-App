import './App.css';
import {useEffect} from 'react';
// 45486baf
const API_URL = "http://www.omdbapi.com?apikey=45486baf";
const App = () => {
  const searchMovies = async (title) => {
    const response = await fetch(`${API_URL}&s=${title}`)
    const data = await response.json();
    console.log(data.Search);

    
  }
  useEffect(() => {
    searchMovies('star wars');
  }, [] )

  return (
    <h1>App</h1>
  );
}

export default App;
