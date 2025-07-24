// src/pages/HomePage.jsx
import { useState, useEffect } from 'react'; // Import useEffect
import Header from '../components/Header.jsx';
import Controls from '../components/Controls.jsx';
import Results from '../components/Results.jsx';

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

// Define which languages get the full list
const fullGenreLanguages = ['en', 'hi', 'ko'];

function HomePage() {
  const [language, setLanguage] = useState('en');
  const [mediaType, setMediaType] = useState('movie');
  const [genre, setGenre] = useState('28'); // Default to Action
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // Determine which list of genres to show based on the selected language
  const availableGenres = fullGenreLanguages.includes(language)
    ? genreLists.full
    : genreLists.limited;

  // This special hook runs whenever the 'language' changes
  useEffect(() => {
    // Check if the currently selected genre is valid in the new list of available genres
    const isGenreValid = availableGenres.some(g => g.value === genre);
    // If it's NOT valid (e.g., user chose 'War' then switched to French), reset to the first available genre
    if (!isGenreValid) {
      setGenre(availableGenres[0].value);
    }
  }, [language, availableGenres]); // Dependency array: re-run this logic if language changes

  const handleSuggestClick = async () => {
    setIsLoading(true);
    setResults([]);
    
    // The URL now ALWAYS includes a genre, because every language has at least a limited list
    const url = `/api/discover/${mediaType}?api_key=${API_KEY}&with_genres=${genre}&with_original_language=${language}&language=en-US&sort_by=popularity.desc&vote_count.gte=100`;
    
    console.log("Fetching with dynamic genre URL:", url);

    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`API request via proxy failed with status ${response.status}`);
      }
      const data = await response.json();
      const validResults = data.results.filter(item => item.poster_path);
      setResults(validResults);
    } catch (error) {
      console.error("Failed to fetch data via proxy:", error);
      alert("Failed to fetch suggestions. Check the console for details.");
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
        availableGenres={availableGenres} // Pass the correct list down
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