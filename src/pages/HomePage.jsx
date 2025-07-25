// src/pages/HomePage.jsx
import { useState, useEffect } from 'react';
import Header from '../components/Header.jsx';
import Controls from '../components/Controls.jsx';
import Results from '../components/Results.jsx';

// This will read the Environment Variable you set in the Vercel dashboard during the build process.
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

// Define our genre lists in one place for easy management
const genreLists = {
  full: [
    { value: '28', name: 'Action' }, { value: '12', name: 'Adventure' },
    { value: '35', name: 'Comedy' }, { value: '80', name: 'Crime' },
    { value: '99', name: 'Documentary' }, { value: '18', name: 'Drama' },
    { value: '10751', name: 'Family' }, { value: '14', name: 'Fantasy' },
    { value: '36', name: 'History' }, { value: '27', name: 'Horror' },
    { value: '10402', name: 'Music' }, { value: '9648', name: 'Mystery' },
    { value: '10749', name: 'Romance' }, { value: '878', name: 'Science Fiction' },
    { value: '10770', name: 'TV Movie' }, { value: '53', name: 'Thriller' },
    { value: '10752', name: 'War' }, { value: '37', name: 'Western' },
  ],
  limited: [
    { value: '18', name: 'Drama' }, { value: '35', name: 'Comedy' },
    { value: '10749', name: 'Romance' }, { value: '28', name: 'Action' },
    { value: '53', name: 'Thriller' }
  ],
};

// Define which languages get the full list of genres
const fullGenreLanguages = ['en', 'hi', 'ko'];

function HomePage() {
  const [language, setLanguage] = useState('en');
  const [mediaType, setMediaType] = useState('movie');
  const [genre, setGenre] = useState('28');
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // Determine which list of genres to show based on the selected language
  const availableGenres = fullGenreLanguages.includes(language)
    ? genreLists.full
    : genreLists.limited;

  // This hook ensures the genre is valid when the language (and thus the genre list) changes
  useEffect(() => {
    const isGenreValid = availableGenres.some(g => g.value === genre);
    if (!isGenreValid) {
      setGenre(availableGenres[0].value);
    }
  }, [language, availableGenres, genre]);

  const handleSuggestClick = async () => {
    setIsLoading(true);
    setResults([]);
    
    // --- THIS IS THE CORRECT URL FOR PRODUCTION ---
    // It calls the TMDb API directly from the user's browser.
    // The Vite proxy is no longer used.
    const url = `https://api.themoviedb.org/3/discover/${mediaType}?api_key=${API_KEY}&with_genres=${genre}&with_original_language=${language}&language=en-US&sort_by=popularity.desc&vote_count.gte=100`;
    
    console.log("Fetching production-ready URL:", url);

    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}`);
      }
      const data = await response.json();
      const validResults = data.results.filter(item => item.poster_path);
      setResults(validResults);
    } catch (error) {
      console.error("Failed to fetch data on production:", error);
      alert("Failed to fetch suggestions. Please check your console for details.");
    }

    setIsLoading(false);
  };

  return (
    <div className="homepage">
      <Header />
      <Controls
        mediaType={mediaType}
        setMediaType={setMediaType}
        genre={genre}
        setGenre={setGenre}
        language={language}
        setLanguage={setLanguage}
        availableGenres={availableGenres}
        onSuggestClick={handleSuggestClick}
      />
      
      <div className="results-section">
        {isLoading && <p style={{textAlign: 'center'}}>Finding suggestions...</p>}
        {!isLoading && results.length > 0 && <Results items={results} />}
      </div>
    </div>
  );
}

export default HomePage;