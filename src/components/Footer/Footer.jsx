// src/components/Footer/Footer.jsx
import './Footer.css';
import SocialLink from './SocialLink.jsx';

// Import the specific icons we want to use from the 'react-icons/fa' (Font Awesome) set
import { FaGithub, FaLinkedin } from 'react-icons/fa';

function Footer() {
  // IMPORTANT: Replace these with your actual profile URLs
  const GITHUB_URL = 'https://github.com/saksham-neema/CineSuggest.git';
  const LINKEDIN_URL = 'https://www.linkedin.com/in/saksham-neema/';

  return (
    <footer className="footer-container">
      <div className="social-links">
        <SocialLink 
          Icon={FaLinkedin} 
          url={LINKEDIN_URL} 
          text="Connect via LinkedIn" 
        />
        <SocialLink 
          Icon={FaGithub} 
          url={GITHUB_URL} 
          text="View Source on GitHub" 
        />
      </div>
      <p className="creator-credit">
        - Made by Saksham Neema -
      </p>
    </footer>
  );
}

export default Footer;