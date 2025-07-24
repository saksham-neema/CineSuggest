// src/App.jsx
import HomePage from './pages/HomePage.jsx';
import Footer from './components/Footer/Footer.jsx'; // Import the new Footer
import './App.css';

function App() {
  return (
    // Using a React Fragment <>...</> allows us to have multiple top-level elements
    <>
      <main>
        <HomePage />
      </main>
      <Footer /> {/* Add the Footer component here */}
    </>
  );
}

export default App;