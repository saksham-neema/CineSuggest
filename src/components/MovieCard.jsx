// src/components/MovieCard.jsx
import { Link } from 'react-router-dom'; // Import Link
import './MovieCard.css';

const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';

// We now receive mediaType to build the correct link
function MovieCard({ item, mediaType }) { 
  const rating = item.vote_average.toFixed(1);

  return (
    // Link to the dynamic details page URL
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
  );
}

export default MovieCard;