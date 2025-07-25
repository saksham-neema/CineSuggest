// src/components/Results.jsx
import MovieCard from './MovieCard.jsx';
import './Results.css';

// Accept mediaType as a prop
function Results({ items, mediaType }) {
  return (
    <div className="results-grid">
      {items.map(item => (
        // Pass it down to each MovieCard
        <MovieCard key={item.id} item={item} mediaType={mediaType} />
      ))}
    </div>
  );
}

export default Results;