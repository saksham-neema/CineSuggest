// src/components/MovieCard.jsx
import './MovieCard.css';

// The base URL for all TMDb poster images
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';

function MovieCard({ item }) {
  // TMDb provides a rating out of 10, let's format it to one decimal place
  const rating = item.vote_average.toFixed(1);

  return (
    <div className="movie-card">
      <img 
        src={`${IMAGE_BASE_URL}${item.poster_path}`} 
        alt={item.title || item.name} 
        className="card-poster"
      />
      <div className="card-info">
        <h3 className="card-title">{item.title || item.name}</h3>
        <span className="card-rating">{rating}</span>
      </div>
    </div>
  );
}

export default MovieCard;