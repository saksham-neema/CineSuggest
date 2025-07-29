// src/components/Results.jsx
import { motion } from 'framer-motion';
import MovieCard from './MovieCard.jsx';
import './Results.css';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

function Results({ items, mediaType }) {
  return (
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