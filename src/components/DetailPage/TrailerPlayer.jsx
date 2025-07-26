// src/components/DetailPage/TrailerPlayer.jsx

function TrailerPlayer({ videoKey }) {
  if (!videoKey) return null; // Don't render anything if there's no trailer

  return (
    <div className="trailer-container">
      <iframe
        src={`https://www.youtube.com/embed/${videoKey}`}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        title="Official Trailer"
      ></iframe>
    </div>
  );
}

export default TrailerPlayer;