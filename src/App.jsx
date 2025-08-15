// src/App.jsx
import { Routes, Route } from 'react-router-dom'; // 1. Import Routes and Route
import HomePage from './pages/HomePage.jsx';
import DetailPage from './pages/DetailPage.jsx'; // 2. Import the DetailPage
import Footer from './components/Footer/Footer.jsx';
import './App.css';

function App() {
  return (
    <>
      <main>
        {/* 3. Set up the route definitions */}
        <Routes>
          {/* If the URL is "/", show the HomePage */}
          <Route path="/" element={<HomePage />} />
          
          {/* If the URL is "/movie/123" or "/tv/456", show the DetailPage */}
          <Route path="/:mediaType/:itemId" element={<DetailPage />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
} 

export default App;