// src/pages/DetailPage.jsx
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './DetailPage.css';

// We must include the API key here as well, as this page makes its own fetches.
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w1280';

function DetailPage() {
  const { mediaType, itemId } = useParams();
  const [details, setDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Make sure we clear out old details when navigating between pages
    setDetails(null); 
    
    const fetchDetails = async () => {
      setIsLoading(true);
      try {
        // --- THIS IS THE FIX ---
        // The URL now points directly to the live TMDb API for production.
        const url = `https://api.themoviedb.org/3/${mediaType}/${itemId}?api_key=${API_KEY}&language=en-US`;
        
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error("Failed to fetch details");
        }
        const data = await response.json();
        setDetails(data);
      } catch (error) {
        console.error(error);
      }
      setIsLoading(false);
    };

    fetchDetails();
  }, [mediaType, itemId]);

  if (isLoading) {
    return <p style={{ textAlign: 'center', fontSize: '1.5rem', marginTop: '5rem' }}>Loading details...</p>;
  }
  
  if (!details) {
    return <p style={{ textAlign: 'center', fontSize: '1.5rem', marginTop: '5rem' }}>Details not found.</p>;
  }

  return (
    <div className="detail-page">
      <div className="backdrop-image" style={{ backgroundImage: `url(${IMAGE_BASE_URL}${details.backdrop_path})` }}></div>
      <div className="detail-content">
        <h1 className="detail-title">{details.title || details.name}</h1>
        <p className="detail-tagline">{details.tagline}</p>
        <p className="detail-overview">{details.overview}</p>
        {/* We will add trailers and cast here in the next part */}
      </div>
    </div>
  );
}

export default DetailPage;