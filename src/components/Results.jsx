// src/components/Results.jsx
import MovieCard from './MovieCard.jsx';
import './Results.css';

function Results({ items }) {
  return (
    <div className="results-grid">
      {items.map(item => (
        <MovieCard key={item.id} item={item} />
      ))}
    </div>
  );
}

export default Results;