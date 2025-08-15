// src/pages/DetailPage.jsx
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion'; // Import motion
import TrailerPlayer from '../components/DetailPage/TrailerPlayer.jsx';
import CastMember from '../components/DetailPage/CastMember.jsx';
import '../components/DetailPage/DetailPageSections.css';
import './DetailPage.css';

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w1280';

// Define a simple animation variant for items sliding up
const slideUpVariant = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.5 } }
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
        const detailsUrl = `https://api.themoviedb.org/3/${mediaType}/${itemId}?api_key=${API_KEY}&language=en-US`;
        const creditsUrl = `https://api.themoviedb.org/3/${mediaType}/${itemId}/credits?api_key=${API_KEY}&language=en-US`;
        const videosUrl = `https://api.themoviedb.org/3/${mediaType}/${itemId}/videos?api_key=${API_KEY}&language=en-US`;
        
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

  if (isLoading) return <p className="status-message">Loading details...</p>;
  if (!details) return <p className="status-message">Details not found.</p>;

  const officialTrailer = videos.find(video => video.site === 'YouTube' && video.type === 'Trailer');

  return (
    <motion.div // Animate the whole page fading in
      className="detail-page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="backdrop-image" style={{ backgroundImage: `url(${IMAGE_BASE_URL}${details.backdrop_path})` }}></div>
      <div className="detail-content">
        <motion.h1 variants={slideUpVariant} initial="hidden" animate="visible" className="detail-title">
          {details.title || details.name}
        </motion.h1>
        
        <motion.p variants={slideUpVariant} initial="hidden" animate="visible" className="detail-tagline">
          {details.tagline}
        </motion.p>
        
        <motion.p variants={slideUpVariant} initial="hidden" animate="visible" className="detail-overview">
          {details.overview}
        </motion.p>
        
        <motion.div variants={slideUpVariant} initial="hidden" animate="visible">
          <h2 className="section-title">Trailer</h2>
          <TrailerPlayer videoKey={officialTrailer?.key} />
        </motion.div>
        
        <motion.div variants={slideUpVariant} initial="hidden" animate="visible">
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