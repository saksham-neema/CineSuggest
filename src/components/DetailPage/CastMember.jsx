// src/components/DetailPage/CastMember.jsx

const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w185'; // Smaller image size for profile
const PLACEHOLDER_IMAGE = 'https://via.placeholder.com/185x278.png?text=No+Image'; // A placeholder

function CastMember({ person }) {
  const imageUrl = person.profile_path 
    ? `${IMAGE_BASE_URL}${person.profile_path}` 
    : PLACEHOLDER_IMAGE;

  return (
    <div className="cast-member-card">
      <img src={imageUrl} alt={person.name} className="cast-member-photo" />
      <div className="cast-member-info">
        <p className="cast-member-name">{person.name}</p>
        <p className="cast-member-character">{person.character}</p>
      </div>
    </div>
  );
}

export default CastMember;