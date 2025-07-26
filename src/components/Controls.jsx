// src/components/Controls.jsx
import './Controls.css';

function Controls({ 
  selection, 
  onSelectionChange, 
  availableGenres, 
  shortFilmSupported,
  onSuggestClick,
  onSurpriseClick
}) {
  return (
    <div className="controls-container">
      {/* Content Type Section */}
      <div className="control-group">
        <label>Content Type:</label>
        <select 
          value={selection.mediaType} 
          onChange={(e) => onSelectionChange('mediaType', e.target.value)}
        >
          <option value="movie">Movies</option>
          <option value="tv">TV Shows</option>
          {/* --- The Short Film option only shows up if supported --- */}
          {shortFilmSupported && (
            <option value="short_film">Short Films</option>
          )}
        </select>
      </div>

      {/* Genre Section - It's disabled if the media type is short film */}
      <div className="control-group">
        <label>Genre:</label>
        <select 
          value={selection.genre}
          onChange={(e) => onSelectionChange('genre', e.target.value)}
          disabled={selection.mediaType === 'short_film'}
        >
          {availableGenres.map((g) => (
            <option key={g.value} value={g.value}>{g.name}</option>
          ))}
        </select>
      </div>

      {/* Language Section */}
      <div className="control-group">
        <label>Language:</label>
        <select
          value={selection.language}
          onChange={(e) => onSelectionChange('language', e.target.value)}
        >
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