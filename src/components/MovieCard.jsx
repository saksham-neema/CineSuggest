// src/components/MovieCard.jsx
import { Link } from 'react-router-dom'; // 1. Import the Link component
import './MovieCard.css';

const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';

// 2. The component now needs to know the mediaType ('movie' or 'tv')
function MovieCard({ item, mediaType }) {
  const rating = item.vote_average.toFixed(1);

  return (
    // 3. Wrap the entire card in a Link component that points to the correct details URL
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