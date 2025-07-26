// src/components/Results.jsx
import { motion } from 'framer-motion'; // Import motion
import MovieCard from './MovieCard.jsx';
import './Results.css';

// Define animation "variants" for the container
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1 // This makes each child animate 0.1s after the previous one
    }
  }
};

function Results({ items, mediaType }) {
  return (
    // Wrap the grid in a motion.div and apply the variants
    <motion.div 
      className="results-grid"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {items.map(item => (
        <MovieCard key={item.id} item={item} mediaType={mediaType} />
      ))}
    </motion.div>
  );
}

export default Results;