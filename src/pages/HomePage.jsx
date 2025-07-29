// src/pages/HomePage.jsx
import { useState, useEffect, useCallback, useMemo } from 'react';
import useInfiniteScroll from '../hooks/useInfiniteScroll.js';
import Header from '../components/Header.jsx';
import Controls from '../components/Controls.jsx';
import Results from '../components/Results.jsx';
import Loader from '../components/Loader.jsx';

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

const genreLists = {
  movie: [
    { value: '28', name: 'Action' }, { value: '12', name: 'Adventure' },
    { value: '35', name: 'Comedy' }, { value: '80', name: 'Crime' },
    { value: '99', name: 'Documentary' }, { value: '18', name: 'Drama' },
    { value: '10751', name: 'Family' }, { value: '14', name: 'Fantasy' },
    { value: '36', name: 'History' }, { value: '27', name: 'Horror' },
    { value: '10402', name: 'Music' }, { value: '9648', name: 'Mystery' },
    { value: '10749', name: 'Romance' }, { value: '878', name: 'Science Fiction' },
    { value: '53', name: 'Thriller' }, { value: '10752', name: 'War' },
  ],
  tv: [
    { value: '10759', name: 'Action & Adventure' }, { value: '16', name: 'Animation' },
    { value: '35', name: 'Comedy' }, { value: '80', name: 'Crime' },
    { value: '99', name: 'Documentary' }, { value: '18', name: 'Drama' },
    { value: '10751', name: 'Family' }, { value: '10762', name: 'Kids' },
    { value: '9648', name: 'Mystery' }, { value: '10764', name: 'Reality show' },
    { value: '10749', name: 'Romance' }, { value: '10765', name: 'Sci-Fi & Fantasy' },,
    { value: '10768', name: 'War & Politics' }, { value: '37', name: 'Western' },
  ]
};

// Define the languages for which we want specific genre filtering.
const specificGenreLanguages = ['en', 'hi', 'ko'];

function HomePage() {
  const [mediaType, setMediaType] = useState('movie');
  const [language, setLanguage] = useState('en');
  const [genre, setGenre] = useState('28');
  const [results, setResults] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  // --- BUG FIX 2: ALWAYS PROVIDE THE FULL LIST TO THE DROPDOWN ---
  const availableGenres = useMemo(() => {
    return genreLists[mediaType] || [];
  }, [mediaType]);

  useEffect(() => {
    const isGenreValid = availableGenres.some(g => g.value === genre);
    if (!isGenreValid && availableGenres.length > 0) {
      setGenre(availableGenres[0].value);
    }
  }, [availableGenres, genre]);

  const fetchResults = useCallback(async (pageNum) => {
    setIsLoading(true);
    try {
      // --- BUG FIX 3: SMARTER URL BUILDING ---
      let url = `/api/discover/${mediaType}?api_key=${API_KEY}&with_original_language=${language}&language=en-US&sort_by=vote_average.desc&vote_count.gte=200&page=${pageNum}`;
      
      // Only apply the specific genre filter if the language is one of our main ones.
      if (specificGenreLanguages.includes(language)) {
        url += `&with_genres=${genre}`;
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
  }, [mediaType, genre, language]);

  const handleNewSearch = () => {
    setHasSearched(true);
    setPage(1);
    fetchResults(1);
  };
  
  const loadNextPage = useCallback(() => {
    if (!isLoading && hasMore) {
      const nextPage = page + 1;
      setPage(nextPage);
      fetchResults(nextPage);
    }
  }, [page, isLoading, hasMore, fetchResults]);

  useInfiniteScroll({ callback: loadNextPage, isLoading, hasMore });

  const handleSurpriseClick = async () => { /* ... (Your existing surprise logic) ... */ };

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
        onSuggestClick={handleNewSearch}
        onSurpriseClick={handleSurpriseClick}
      />
      <div className="results-section">
        {isLoading && results.length === 0 && <Loader message="Finding suggestions..." />}
        {results.length > 0 && <Results items={results} mediaType={mediaType} />}
        {isLoading && results.length > 0 && <Loader message="Loading more..." />}
        {!isLoading && results.length === 0 && hasSearched && (
          <p className="status-message">
            No results found!
          </p>
        )}
      </div>
    </div>
  );
}

export default HomePage;