// src/pages/DetailPage.jsx
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import TrailerPlayer from '../components/DetailPage/TrailerPlayer.jsx';
import CastMember from '../components/DetailPage/CastMember.jsx';
import Loader from '../components/Loader.jsx'; // Import the Loader
import '../components/DetailPage/DetailPageSections.css';
import './DetailPage.css';

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w1280';

// Animation variant with a spring transition
const sectionVariant = {
  hidden: { y: 20, opacity: 0 },
  visible: { 
    y: 0, 
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 120,
      damping: 20,
      duration: 0.5 
    }
  }
};

function DetailPage() {
  const { mediaType, itemId } = useParams();
  const [details, setDetails] = useState(null);
  const [videos, setVideos] = useState([]);
  const [cast, setCast] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    setDetails(null);
    setVideos([]);
    setCast([]);

    const fetchAllDetails = async () => {
      try {
        const detailsUrl = `/api/details/${mediaType}/${itemId}?api_key=${API_KEY}&language=en-US`;
        const creditsUrl = `/api/credits/${mediaType}/${itemId}?api_key=${API_KEY}&language=en-US`;
        const videosUrl = `/api/videos/${mediaType}/${itemId}?api_key=${API_KEY}&language=en-US`;
        
        const [detailsResponse, creditsResponse, videosResponse] = await Promise.all([
          fetch(detailsUrl), fetch(creditsUrl), fetch(videosUrl),
        ]);

        if (!detailsResponse.ok) throw new Error("Failed to fetch details");

        const detailsData = await detailsResponse.json();
        const creditsData = await creditsResponse.json();
        const videosData = await videosResponse.json();

        setDetails(detailsData);
        setCast(creditsData.cast);
        setVideos(videosData.results);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchAllDetails();
  }, [mediaType, itemId]);

  // Use the Loader component while fetching
  if (isLoading) return <Loader message="Loading details..." />;
  
  if (!details) return <p className="status-message">Details not found.</p>;

  const officialTrailer = videos.find(video => video.site === 'YouTube' && video.type === 'Trailer');

  return (
    <motion.div 
      className="detail-page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="backdrop-image" style={{ backgroundImage: `url(${IMAGE_BASE_URL}${details.backdrop_path})` }}></div>
      <div className="detail-content">
        <motion.div variants={sectionVariant} initial="hidden" animate="visible">
          <h1 className="detail-title">{details.title || details.name}</h1>
          <p className="detail-tagline">{details.tagline}</p>
          <p className="detail-overview">{details.overview}</p>
        </motion.div>
        
        <motion.div variants={sectionVariant} initial="hidden" animate="visible">
          <h2 className="section-title">Trailer</h2>
          <TrailerPlayer videoKey={officialTrailer?.key} />
        </motion.div>
        
        <motion.div variants={sectionVariant} initial="hidden" animate="visible">
          <h2 className="section-title">Cast</h2>
          <div className="cast-grid">
            {cast.slice(0, 12).map((person) => (
              <CastMember key={person.id} person={person} />
            ))}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}

export default DetailPage;