// src/components/Footer/SocialLink.jsx

// This component receives the Icon component itself as a prop
function SocialLink({ Icon, url, text }) {
  return (
    <a href={url} target="_blank" rel="noopener noreferrer" className="social-link">
      <Icon className="social-icon" />
      {text}
    </a>
  );
}

export default SocialLink;