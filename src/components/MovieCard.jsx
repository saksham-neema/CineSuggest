// src/components/MovieCard.jsx
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion'; // Import motion
import './MovieCard.css';

const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';

// Define animation "variants" for each card
const cardVariants = {
  hidden: { y: 25, opacity: 0 },
  visible: { 
    y: 0, 
    opacity: 1,
    // 2. Add a transition with a spring type
    transition: {
      type: "spring",
      stiffness: 100, // How "stiff" the spring is
      damping: 15     // How much opposition/drag it has
    }
  }
};

function MovieCard({ item, mediaType }) { 
  const rating = item.vote_average.toFixed(1);

  return (
    // Wrap the entire component in a motion.div
    <motion.div variants={cardVariants}>
      <Link to={`/${mediaType}/${item.id}`} className="movie-card">
        <img 
          src={`${IMAGE_BASE_URL}${item.poster_path}`} 
          alt={item.title || item.name} 
          className="card-poster"
        />
        <div className="card-info">
          <h3 className="card-title">{item.title || item.name}</h3>
          <span className="card-rating">{rating}</span>
        </div>
      </Link>
    </motion.div>
  );
}

export default MovieCard;