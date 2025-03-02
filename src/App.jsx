import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { FaWhatsapp, FaInstagram } from 'react-icons/fa'; // Importamos los iconos
import logo from './assets/LOGO.png'; // Ruta al archivo logo.png

// Importa las páginas
import Home from './pages/home';
import Properties from './pages/properties';  // Asegúrate de que la ruta esté bien escrita y que el archivo exista
import Contact from './pages/contact';  // Verifica que esta ruta sea correcta
import AboutPage from './pages/about';
import Login from './pages/login';


function App() {
  return (
    <Router>
      <div>
        {/* Header con navegación */}
        <header>
          <h1>
          <Link to="/" className="logo-container"> {/* Hacemos el logo clickeable */}
            <img src={logo} alt="Carmona Inmobiliaria" style={{ height: '50px', width: 'auto' }} />
          </Link>
          </h1>

          {/* Barra de búsqueda */}
          <div className="search-bar">
            <input type="text" placeholder="Buscar propiedades..." />
            <button>🔍</button>
          </div>

          <nav>
            <div className="right-links">
              <Link to="/">Inicio</Link>
              <Link to="/properties">Propiedades</Link>
              <Link to="/contact">Contacto</Link>
              <Link to="/about">Conócenos</Link>
            </div>
            <Link to="/login" className="login">Ingresar</Link> {/* Login Link */}
          </nav>

          {/* Nueva sección para Redes */}
          <div className="social-media">
            <span>contactanos:</span>
            <a href="https://wa.me/123456789" target="_blank" rel="noopener noreferrer">
              <FaWhatsapp className="icon whatsapp" />
            </a>
            <a href="https://instagram.com/tu_perfil" target="_blank" rel="noopener noreferrer">
              <FaInstagram className="icon instagram" />
            </a>
          </div>
        </header>

        {/* Rutas definidas */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/properties" element={<Properties />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/login" element={<Login />} />
        </Routes>

        {/* Footer */}
        <footer>
          <p>© 2025 Carmona Inmobiliaria. Todos los derechos reservados.</p>
        </footer>
      </div>
    </Router>
  );
}

export default App;
