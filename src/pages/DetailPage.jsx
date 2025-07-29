// src/pages/DetailPage.jsx - FINAL VERSION FOR VERCEL
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaClock, FaTv } from 'react-icons/fa';
import TrailerPlayer from '../components/DetailPage/TrailerPlayer.jsx';
import CastMember from '../components/DetailPage/CastMember.jsx';
import Loader from '../components/Loader.jsx';
import '../components/DetailPage/DetailPageSections.css';
import './DetailPage.css';

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w1280';

const sectionVariant = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 120, damping: 20, duration: 0.5 } }
};

function formatRuntime(minutes) {
  if (!minutes || typeof minutes !== 'number' || minutes <= 0) return null;
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`;
}

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
        // --- URLS CHANGED TO PUBLIC API ---
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
        console.error("Error fetching details:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchAllDetails();
  }, [mediaType, itemId]);

  if (isLoading) return <Loader message="Loading details..." />;
  if (!details) return <p className="status-message">Details could not be loaded.</p>;

  const officialTrailer = videos.find(video => video.site === 'YouTube' && video.type === 'Trailer');
  const formattedRuntime = formatRuntime(details.runtime);
  const releaseYear = details.release_date ? details.release_date.substring(0, 4) : (details.first_air_date ? details.first_air_date.substring(0, 4) : null);

  return (
    <motion.div className="detail-page" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <div className="backdrop-image" style={{ backgroundImage: `url(${IMAGE_BASE_URL}${details.backdrop_path})` }}></div>
      <div className="detail-content">
        <motion.div variants={sectionVariant} initial="hidden" animate="visible">
          <h1 className="detail-title">{details.title || details.name}</h1>
          <div className="metadata">
            {releaseYear && <span className="metadata-item">{releaseYear}</span>}
            {mediaType === 'movie' && formattedRuntime && <span className="metadata-item"><FaClock /> {formattedRuntime}</span>}
            {mediaType === 'tv' && details.number_of_seasons && <span className="metadata-item"><FaTv /> {details.number_of_seasons} Season{details.number_of_seasons > 1 ? 's' : ''}</span>}
          </div>
          <p className="detail-tagline">{details.tagline}</p>
          <p className="detail-overview">{details.overview}</p>
        </motion.div>
        
        {officialTrailer && (
          <motion.div variants={sectionVariant} initial="hidden" animate="visible">
            <h2 className="section-title">Trailer</h2>
            <TrailerPlayer videoKey={officialTrailer.key} />
          </motion.div>
        )}
        
        {cast && cast.length > 0 && (
          <motion.div variants={sectionVariant} initial="hidden" animate="visible">
            <h2 className="section-title">Cast</h2>
            <div className="cast-grid">
              {cast.slice(0, 12).map((person) => <CastMember key={person.cast_id || person.id} person={person} />)}
            </div>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}

export default DetailPage;