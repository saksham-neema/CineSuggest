// src/pages/HomePage.jsx
import { useState, useEffect, useCallback } from 'react';
import useInfiniteScroll from '../hooks/useInfiniteScroll.js';
import Header from '../components/Header.jsx';
import Controls from '../components/Controls.jsx';
import Results from '../components/Results.jsx';

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

// --- THE FIX IS HERE: SEPARATE GENRE LISTS FOR MOVIE AND TV ---
const genreLists = {
  movie: [
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
  tv: [
    { value: '10759', name: 'Action & Adventure' }, { value: '16', name: 'Animation' },
    { value: '35', name: 'Comedy' }, { value: '80', name: 'Crime' },
    { value: '99', name: 'Documentary' }, { value: '18', name: 'Drama' },
    { value: '10751', name: 'Family' }, { value: '10762', name: 'Kids' },
    { value: '9648', name: 'Mystery' }, { value: '10763', name: 'News' },
    { value: '10764', name: 'Reality' }, { value: '10765', name: 'Sci-Fi & Fantasy' },
    { value: '10766', name: 'Soap' }, { value: '10767', name: 'Talk' },
    { value: '10768', name: 'War & Politics' }, { value: '37', name: 'Western' },
  ]
};

const fullGenreLanguages = ['en', 'hi', 'ko'];

// Languages where the "Short Film" option should appear
const shortFilmSupportedLanguages = ['en', 'hi'];

function HomePage() {
  // We now have a more descriptive 'selection' state
  const [selection, setSelection] = useState({
    mediaType: 'movie', // Can be 'movie', 'tv', or 'short_film'
    language: 'en',
    genre: '28'
  });

  const [results, setResults] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  // Determine the correct API endpoint and genre list based on the selection
  const apiMediaType = selection.mediaType === 'short_film' ? 'movie' : selection.mediaType;
  const genreListForMediaType = genreLists[apiMediaType] || [];
  
  const availableGenres = fullGenreLanguages.includes(selection.language) 
    ? genreListForMediaType 
    : genreListForMediaType.slice(0, 5); // Fallback to a limited list

  // This hook handles all logic when selections change
  useEffect(() => {
    // 1. Reset genre if it's not valid in the new list
    const isGenreValid = availableGenres.some(g => g.value === selection.genre);
    if (!isGenreValid) {
      setSelection(prev => ({ ...prev, genre: availableGenres[0]?.value || '' }));
    }

    // 2. Reset from "Short Film" if language is no longer supported
    if (selection.mediaType === 'short_film' && !shortFilmSupportedLanguages.includes(selection.language)) {
      setSelection(prev => ({ ...prev, mediaType: 'movie' }));
    }
  }, [selection.mediaType, selection.language, selection.genre, availableGenres]);

  const fetchResults = useCallback(async (pageNum) => {
    setIsLoading(true);
    try {
      let url = `https://api.themoviedb.org/3/discover/${apiMediaType}?api_key=${API_KEY}&with_genres=${selection.genre}&with_original_language=${selection.language}&language=en-US&sort_by=popularity.desc&vote_count.gte=100&page=${pageNum}`;
      
      // Add special parameter for short films
      if (selection.mediaType === 'short_film') {
        url += '&with_runtime.lte=40';
      }
      
      const response = await fetch(url);
      if (!response.ok) throw new Error(`API request failed`);
      
      const data = await response.json();
      const validResults = data.results.filter(item => item.poster_path);
      
      setResults(prev => pageNum === 1 ? validResults : [...prev, ...validResults]);
      setHasMore(data.page < data.total_pages);
    } catch (error) {
      console.error("Failed to fetch data:", error);
    } finally {
      setIsLoading(false);
    }
  }, [apiMediaType, selection.genre, selection.language, selection.mediaType]);

  const handleNewSearch = () => {
    setHasSearched(true);
    setPage(1);
    fetchResults(1);
  };
  
  const loadNextPage = useCallback(() => {
    const nextPage = page + 1;
    setPage(nextPage);
    fetchResults(nextPage);
  }, [page, fetchResults]);

  useInfiniteScroll({ callback: loadNextPage, isLoading: isLoading, hasMore: hasMore });

  const handleSurpriseClick = async () => { /* ... Surprise Me logic ... */ };

  // Helper to update the nested state easily
  const handleSelectionChange = (field, value) => {
    setSelection(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="homepage">
      <Header />
      <Controls
        selection={selection}
        onSelectionChange={handleSelectionChange}
        availableGenres={availableGenres}
        shortFilmSupported={shortFilmSupportedLanguages.includes(selection.language)}
        onSuggestClick={handleNewSearch}
        onSurpriseClick={handleSurpriseClick} // You can adapt this later
      />
      <div className="results-section">
        {isLoading && page === 1 && <p className="status-message">Finding suggestions...</p>}
        {results.length > 0 && <Results items={results} mediaType={apiMediaType} />}
        {isLoading && page > 1 && <p className="status-message">Loading more...</p>}
        {!isLoading && results.length === 0 && hasSearched && (
          <p className="status-message">No results found!</p>
        )}
      </div>
    </div>
  );
}

export default HomePage;