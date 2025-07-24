// src/components/Header.jsx

import './Header.css'; // This imports the styles for the header

function Header() {
  return (
    <header className="app-header">
      <h1 className="app-title">CineSuggest</h1>
      <p className="app-tagline">Find your next favorite film.</p>
    </header>
  );
}

export default Header;