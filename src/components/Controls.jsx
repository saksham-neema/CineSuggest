// src/components/Controls.jsx
import './Controls.css';

function Controls({ 
  mediaType, setMediaType, 
  genre, setGenre, 
  language, setLanguage, 
  availableGenres, // The new prop with the correct genre list
  onSuggestClick 
}) {
  return (
    <div className="controls-container">
      {/* Content Type Section */}
      <div className="control-group">
        <label>Content Type:</label>
        <select 
          value={mediaType} 
          onChange={(e) => setMediaType(e.target.value)}
        >
          <option value="movie">Movies</option>
          <option value="tv">TV Shows</option>
        </select>
      </div>

      {/* Genre Section - Now dynamically rendered */}
      <div className="control-group">
        <label>Genre:</label>
        <select 
          value={genre}
          onChange={(e) => setGenre(e.target.value)}
        >
          {/* Map over the availableGenres prop to create the options */}
          {availableGenres.map((g) => (
            <option key={g.value} value={g.value}>
              {g.name}
            </option>
          ))}
        </select>
      </div>

      {/* Language Section */}
      <div className="control-group">
        <label>Language:</label>
        <select
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
        >
          <option value="en">English</option>
          <option value="hi">Hindi</option>
          <option value="ko">Korean</option>
          <option value="es">Spanish</option>
          <option value="fr">French</option>
          <option value="ja">Japanese</option>
        </select>
      </div>
      
      <button className="search-button" onClick={onSuggestClick}>
        Suggest
      </button>
    </div>
  );
}

export default Controls;