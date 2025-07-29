// src/components/Controls.jsx
import './Controls.css';

function Controls({ 
  mediaType, setMediaType, 
  genre, setGenre, 
  language, setLanguage, 
  availableGenres,
  onSuggestClick,
  onSurpriseClick
}) {
  return (
    <div className="controls-container">
      <div className="control-group">
        <label>Content Type:</label>
        <select value={mediaType} onChange={(e) => setMediaType(e.target.value)}>
          <option value="movie">Movies</option>
          <option value="tv">TV Shows</option>
        </select>
      </div>
      <div className="control-group">
        <label>Genre:</label>
        <select value={genre} onChange={(e) => setGenre(e.target.value)}>
          {availableGenres.map((g) => (
            <option key={g.value} value={g.value}>{g.name}</option>
          ))}
        </select>
      </div>
      <div className="control-group">
        <label>Language:</label>
        <select value={language} onChange={(e) => setLanguage(e.target.value)}>
          <option value="en">English</option>
          <option value="hi">Hindi</option>
          <option value="ko">Korean</option>
          <option value="es">Spanish</option>
          <option value="fr">French</option>
          <option value="ja">Japanese</option>
        </select>
      </div>
      <div className="button-group">
        <button className="search-button" onClick={onSuggestClick}>
          Find
        </button>
        <button className="surprise-button" onClick={onSurpriseClick}>
          Surprise Me ✨
        </button>
      </div>
    </div>
  );
}

export default Controls;