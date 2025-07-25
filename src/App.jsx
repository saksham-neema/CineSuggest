// src/App.jsx
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage.jsx';
import DetailPage from './pages/DetailPage.jsx'; // We will create this next
import Footer from './components/Footer/Footer.jsx';
import './App.css';

function App() {
  return (
    <>
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          {/* A dynamic route for details. :mediaType will be 'movie' or 'tv' */}
          <Route path="/:mediaType/:itemId" element={<DetailPage />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}

export default App;