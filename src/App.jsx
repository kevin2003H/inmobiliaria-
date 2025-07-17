import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';
import { FaWhatsapp, FaInstagram, FaFilter } from 'react-icons/fa';
import logo from './assets/LOGO.png';
import ProtectedRoute from "./ProtectedRoute";
import { auth } from "./firebase";

import Home from './pages/home';
import Properties from './pages/properties';
import Contact from './pages/contact';
import AboutPage from './pages/about';
import Login from './pages/login';
import AgregarPropiedad from "./AgregarPropiedad";

function AppWrapper() {
  // Necesario para usar useNavigate fuera de App
  return (
    <Router>
      <App />
    </Router>
  );
}

function App() {
  const [user, setUser] = useState(null);
  const [search, setSearch] = useState("");
  const [tipoFiltro, setTipoFiltro] = useState("");
  const [filterModalOpen, setFilterModalOpen] = useState(false);

  // Nuevo estado para ubicación en el filtro
  const [ubicacionFiltro, setUbicacionFiltro] = useState("");

  // Galería de imágenes
  const [galleryOpen, setGalleryOpen] = useState(false);
  const [galleryIndex, setGalleryIndex] = useState(0);

  // Modal de propiedad (para vista previa rápida)
  const [modalPropiedad, setModalPropiedad] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((firebaseUser) => {
      setUser(firebaseUser);
    });
    return () => unsubscribe();
  }, []);

  // Buscar propiedades por ubicación y tipo
  const handleSearch = (e) => {
    if (e) e.preventDefault();
    // Si se usa el filtro modal, usar ubicacionFiltro, si no, usar search
    const ubicacion = filterModalOpen ? ubicacionFiltro : search;
    if (!ubicacion.trim() && !tipoFiltro) return;

    // Guardar filtros en localStorage para usarlos en Properties
    localStorage.setItem("search", ubicacion);
    localStorage.setItem("tipoFiltro", tipoFiltro);

    // Redirigir a /properties
    navigate("/properties");
    setFilterModalOpen(false);
  };

  // Limpiar filtros
  const clearFilters = () => {
    setTipoFiltro("");
    setUbicacionFiltro("");
  };

  // Navegación programática para el botón del modal
  const navigateToProperties = () => {
    setModalPropiedad(null);
    window.location.href = "/properties";
  };

  return (
    <div>
      {/* Header con navegación */}
      <header>
        <h1>
          <Link to="/" className="logo-container">
            <img src={logo} alt="Carmona Inmobiliaria" style={{ height: '50px', width: 'auto' }} />
          </Link>
        </h1>

        {/* Barra de búsqueda y botón de filtro */}
        <div className="search-bar" style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <form onSubmit={handleSearch} style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
            <input
              type="text"
              placeholder="Buscar propiedades por ubicación..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <button type="submit">🔍</button>
          </form>
          <button
            type="button"
            className="filter-btn"
            style={{
              background: "#f1faee",
              border: "none",
              borderRadius: "50%",
              padding: "0.5rem",
              marginLeft: "0.5rem",
              cursor: "pointer",
              boxShadow: "0 2px 8px rgba(69,123,157,0.07)"
            }}
            title="Filtrar por tipo de propiedad"
            onClick={() => setFilterModalOpen(true)}
          >
            <FaFilter style={{ color: "#457b9d", fontSize: 22 }} />
          </button>
        </div>

        <nav>
          <div className="right-links">
            <Link to="/">Inicio</Link>
            <Link to="/properties">Propiedades</Link>
            <Link to="/contact">Contacto</Link>
            <Link to="/about">Conócenos</Link>
            {user && <Link to="/agregar-propiedad">Agregar Propiedad</Link>}
          </div>
          <Link to="/login" className="login">Ingresar</Link>
        </nav>

        <div className="social-media">
          <span>contactanos:</span>
          <a href="https://wa.me/573219536912" target="_blank" rel="noopener noreferrer">
            <FaWhatsapp className="icon whatsapp" />
          </a>
          <a href="https://instagram.com/carmona_inmobiliaria" target="_blank" rel="noopener noreferrer">
            <FaInstagram className="icon instagram" />
          </a>
        </div>
      </header>

      {/* Modal de filtro */}
      {filterModalOpen && (
        <div
          className="filter-modal-overlay"
          style={{
            position: "fixed",
            top: 0, left: 0, right: 0, bottom: 0,
            background: "rgba(0,0,0,0.25)",
            zIndex: 1000,
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
          }}
          onClick={() => setFilterModalOpen(false)}
        >
          <div
            className="filter-modal-content"
            style={{
              background: "#fff",
              borderRadius: 16,
              padding: "2rem",
              minWidth: 320,
              boxShadow: "0 4px 24px rgba(0,0,0,0.13)",
              position: "relative"
            }}
            onClick={e => e.stopPropagation()}
          >
            <button
              style={{
                position: "absolute",
                top: 10,
                right: 16,
                background: "none",
                border: "none",
                fontSize: 22,
                cursor: "pointer",
                color: "#457b9d"
              }}
              onClick={() => setFilterModalOpen(false)}
              aria-label="Cerrar filtro"
            >×</button>
            <h3 style={{ color: "#1d3557", marginBottom: 18 }}>Filtrar propiedades</h3>
            <input
              type="text"
              placeholder="Ubicación"
              value={ubicacionFiltro}
              onChange={e => setUbicacionFiltro(e.target.value)}
              style={{ width: "100%", padding: "0.7rem", borderRadius: 8, marginBottom: 18, fontSize: 16 }}
            />
            <select
              value={tipoFiltro}
              onChange={e => setTipoFiltro(e.target.value)}
              style={{ width: "100%", padding: "0.7rem", borderRadius: 8, marginBottom: 18, fontSize: 16 }}
            >
              <option value="">Todos los tipos</option>
              <option value="campestre">Campestre</option>
              <option value="urbano">Urbano</option>
              <option value="lote">Lote</option>
              <option value="bodega">Bodega</option>
              <option value="apartamento">Apartamento</option>
              <option value="casa">Casa</option>
              <option value="oficina">Oficina</option>
              <option value="local">Local</option>
            </select>
            <div style={{ display: "flex", gap: 12 }}>
              <button
                onClick={handleSearch}
                style={{
                  background: "#457b9d",
                  color: "#fff",
                  border: "none",
                  borderRadius: 8,
                  padding: "0.7rem 1.5rem",
                  fontWeight: 600,
                  cursor: "pointer"
                }}
              >
                Aplicar filtro
              </button>
              <button
                onClick={clearFilters}
                style={{
                  background: "#f1faee",
                  color: "#1d3557",
                  border: "1px solid #a8dadc",
                  borderRadius: 8,
                  padding: "0.7rem 1.5rem",
                  fontWeight: 600,
                  cursor: "pointer"
                }}
              >
                Limpiar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal de imagen grande */}
      {modalPropiedad && (
        <div className="modal-overlay" onClick={() => setModalPropiedad(null)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <button className="modal-close-btn" onClick={() => setModalPropiedad(null)}>×</button>
            {modalPropiedad.imagenes && modalPropiedad.imagenes.length > 0 && (
              <img
                src={modalPropiedad.imagenes[0]}
                alt="Imagen propiedad"
                className="property-image"
                style={{ width: "100%", maxHeight: 350, objectFit: "cover", borderRadius: 12, marginBottom: 20, cursor: "zoom-in" }}
                onClick={() => {
                  setGalleryIndex(0);
                  setGalleryOpen(true);
                }}
              />
            )}
            <h2>{modalPropiedad.descripcion}</h2>
            <div className="property-info">
              <p><b>Ubicación:</b> {modalPropiedad.ubicacion}</p>
              <p><b>Precio:</b> {modalPropiedad.precio}</p>
              <p><b>Habitaciones:</b> {modalPropiedad.habitaciones}</p>
              <p><b>Tipo:</b> {modalPropiedad.tipo}</p>
            </div>
            <div style={{ display: "flex", gap: "1rem", marginTop: 20, flexWrap: "wrap" }}>
              <button
                className="details-button"
                onClick={navigateToProperties}
              >
                Ver todas las propiedades
              </button>
              <a
                href="https://wa.me/573219536912"
                target="_blank"
                rel="noopener noreferrer"
                className="whatsapp-link"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  background: "#25D366",
                  color: "#fff",
                  borderRadius: 8,
                  padding: "10px 18px",
                  fontWeight: 600,
                  fontSize: "1rem",
                  textDecoration: "none",
                  boxShadow: "0 2px 8px rgba(37,211,102,0.10)"
                }}
              >
                <FaWhatsapp style={{ marginRight: 8, fontSize: 20 }} />
                WhatsApp
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Visor de galería de imágenes */}
      {galleryOpen && modalPropiedad && (
        <div className="gallery-overlay" onClick={() => setGalleryOpen(false)}>
          <div className="gallery-content" onClick={e => e.stopPropagation()}>
            <button className="gallery-close-btn" onClick={() => setGalleryOpen(false)}>×</button>
            <img
              src={modalPropiedad.imagenes[galleryIndex]}
              alt={`Imagen ${galleryIndex + 1}`}
              className="gallery-image"
            />
            <div className="gallery-controls">
              <button
                onClick={() => setGalleryIndex((galleryIndex - 1 + modalPropiedad.imagenes.length) % modalPropiedad.imagenes.length)}
                className="gallery-nav-btn"
              >
                ‹
              </button>
              <span className="gallery-counter">
                {galleryIndex + 1} / {modalPropiedad.imagenes.length}
              </span>
              <button
                onClick={() => setGalleryIndex((galleryIndex + 1) % modalPropiedad.imagenes.length)}
                className="gallery-nav-btn"
              >
                ›
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Rutas definidas */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/properties" element={<Properties />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/agregar-propiedad"
          element={
            <ProtectedRoute user={user}>
              <AgregarPropiedad />
            </ProtectedRoute>
          }
        />
      </Routes>

      <footer>
        <p>© 2025 Carmona Inmobiliaria. Todos los derechos reservados.</p>
      </footer>
    </div>
  );
}

export default AppWrapper;