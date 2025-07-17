import React, { useState, useEffect } from "react";
import { FaWhatsapp, FaMapMarkerAlt, FaMoneyBillWave, FaExpand, FaEdit, FaTrash } from "react-icons/fa";
import { collection, getDocs, query, where, deleteDoc, doc } from "firebase/firestore";
import { db, auth } from "../firebase";
import CarruselImagenes from "../components/CarruselImagenes";
import { useNavigate } from "react-router-dom";
import "../index.css";

function Properties() {
  const [properties, setProperties] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [loading, setLoading] = useState(true);

  // Galería de imágenes para el modal
  const [galleryOpen, setGalleryOpen] = useState(false);
  const [galleryIndex, setGalleryIndex] = useState(0);

  // Estado para saber si mostrar botones de editar/eliminar
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((firebaseUser) => {
      setUser(firebaseUser);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const fetchProperties = async () => {
      setLoading(true);
      // Leer filtros desde localStorage
      const search = localStorage.getItem("search") || "";
      const tipoFiltro = localStorage.getItem("tipoFiltro") || "";
      let q = collection(db, "propiedades");
      let filters = [];

      if (search.trim()) {
        filters.push(where("ubicacion", ">=", search));
        filters.push(where("ubicacion", "<=", search + "\uf8ff"));
      }
      if (tipoFiltro) {
        filters.push(where("tipo", "==", tipoFiltro));
      }
      if (filters.length > 0) {
        q = query(collection(db, "propiedades"), ...filters);
      }
      try {
        const querySnapshot = await getDocs(q);
        const propiedades = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setProperties(propiedades);
      } catch (error) {
        console.error("Error fetching properties:", error);
      } finally {
        setLoading(false);
        // Limpiar filtros después de usarlos
        localStorage.removeItem("search");
        localStorage.removeItem("tipoFiltro");
        localStorage.removeItem("modoPropiedades");
      }
    };
    fetchProperties();
  }, []);

  const openModal = (property) => {
    setSelectedProperty(property);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setGalleryOpen(false);
  };

  // Abrir galería al hacer click en imagen del carrusel
  const handleImageClick = (idx) => {
    setGalleryIndex(idx);
    setGalleryOpen(true);
  };

  // Eliminar propiedad
  const handleEliminar = async (id) => {
    if (window.confirm("¿Seguro que deseas eliminar esta propiedad?")) {
      await deleteDoc(doc(db, "propiedades", id));
      setProperties(properties.filter(p => p.id !== id));
    }
  };

  // Editar propiedad
  const handleEditar = (property) => {
    // Guardar datos en localStorage para el formulario de edición
    localStorage.setItem("editPropiedad", JSON.stringify(property));
    navigate("/agregar-propiedad");
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Cargando propiedades...</p>
      </div>
    );
  }

  return (
    <div className="properties-page">
      <div className="hero-section">
        <div className="hero-content">
          <h1>Descubre tu propiedad ideal</h1>
          <p>Encuentra el hogar perfecto entre nuestra selección exclusiva</p>
        </div>
      </div>
      
      <div className="properties-container">
        <div className="section-header">
          <h2>Propiedades destacadas</h2>
          <p>Explora nuestra selección de propiedades cuidadosamente seleccionadas</p>
        </div>
        
        <div className="properties-grid">
          {properties.map((property) => {
            // Mostrar botones solo si hay sesión iniciada
            const mostrarBotones = !!user;
            return (
              <div key={property.id} className="property-card">
                <div className="property-badge">
                  {property.tipo || 'En venta'}
                </div>
                
                <div className="property-image-container">
                  <CarruselImagenes
                    imagenes={property.imagenes}
                    onImageClick={idx => {
                      openModal(property);
                      setGalleryIndex(idx);
                      setGalleryOpen(true);
                    }}
                  />
                  <button 
                    className="expand-button"
                    onClick={() => openModal(property)}
                  >
                    <FaExpand />
                  </button>
                </div>
                
                <div className="property-content">
                  <h3>{property.titulo || 'Propiedad sin título'}</h3>
                  
                  <div className="property-description">
                    {property.descripcionCorta || property.descripcion?.substring(0, 100) + '...'}
                  </div>
                  
                  <div className="property-features">
                    <div className="feature">
                      <FaMapMarkerAlt className="feature-icon" />
                      <span>{property.ubicacion || 'Ubicación no especificada'}</span>
                    </div>
                    <div className="feature">
                      <FaMoneyBillWave className="feature-icon" />
                      <span className="price">{property.precio || 'Consultar precio'}</span>
                    </div>
                    <div className="feature">
                      <span className="feature-label">Habitaciones:</span>
                      <span>{property.habitaciones || 'N/A'}</span>
                    </div>
                    <div className="feature">
                      <span className="feature-label">Baños:</span>
                      <span>{property.banos || 'N/A'}</span>
                    </div>
                    <div className="feature">
                      <span className="feature-label">Parqueaderos:</span>
                      <span>{property.parqueaderos || 'N/A'}</span>
                    </div>
                    <div className="feature">
                      <span className="feature-label">Metros²:</span>
                      <span>{property.metrosCuadrados || 'N/A'}</span>
                    </div>
                    <div className="feature">
                      <span className="feature-label">Área privada:</span>
                      <span>{property.areaPrivada || 'N/A'}</span>
                    </div>
                    <div className="feature">
                      <span className="feature-label">Área construida:</span>
                      <span>{property.areaConstruida || 'N/A'}</span>
                    </div>
                    <div className="feature">
                      <span className="feature-label">Tipo:</span>
                      <span>{property.tipo || 'N/A'}</span>
                    </div>
                  </div>
                  
                  <div className="property-actions">
                    <a
                      href={`https://wa.me/573219536912?text=Hola, estoy interesado en la propiedad ${property.titulo || ''}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="whatsapp-button"
                    >
                      <FaWhatsapp /> Contactar por WhatsApp
                    </a>
                    
                    <button 
                      onClick={() => openModal(property)} 
                      className="details-button"
                    >
                      Ver detalles
                    </button>
                  </div>
                  {/* Botones de editar/eliminar SOLO si hay sesión iniciada */}
                  {mostrarBotones && (
                    <div style={{ marginTop: 8, display: "flex", gap: 8 }}>
                      <button
                        className="edit-btn"
                        style={{ background: "#457b9d", color: "#fff", borderRadius: 6, border: "none", padding: "0.4rem 0.8rem", cursor: "pointer" }}
                        onClick={() => handleEditar(property)}
                      >
                        <FaEdit /> Editar
                      </button>
                      <button
                        className="delete-btn"
                        style={{ background: "#e63946", color: "#fff", borderRadius: 6, border: "none", padding: "0.4rem 0.8rem", cursor: "pointer" }}
                        onClick={() => handleEliminar(property.id)}
                      >
                        <FaTrash /> Eliminar
                      </button>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
      
      {/* Modal para más detalles */}
      {isModalOpen && selectedProperty && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <button className="modal-close" onClick={closeModal}>×</button>
            <h2>{selectedProperty.titulo || 'Detalles de la propiedad'}</h2>
            <div className="modal-gallery">
              <CarruselImagenes
                imagenes={selectedProperty.imagenes}
                onImageClick={idx => {
                  setGalleryIndex(idx);
                  setGalleryOpen(true);
                }}
              />
            </div>
            <div className="modal-details">
              <div className="detail-section">
                <h3>Descripción</h3>
                <p>{selectedProperty.descripcion || 'No hay descripción disponible'}</p>
              </div>
              
              <div className="detail-section">
                <h3>Características</h3>
                <div className="features-grid">
                  <div className="feature-item">
                    <span className="feature-label">Ubicación:</span>
                    <span className="feature-value">{selectedProperty.ubicacion || 'No especificada'}</span>
                  </div>
                  <div className="feature-item">
                    <span className="feature-label">Precio:</span>
                    <span className="feature-value">{selectedProperty.precio || 'Consultar'}</span>
                  </div>
                  <div className="feature-item">
                    <span className="feature-label">Habitaciones:</span>
                    <span className="feature-value">{selectedProperty.habitaciones || 'N/A'}</span>
                  </div>
                  <div className="feature-item">
                    <span className="feature-label">Baños:</span>
                    <span className="feature-value">{selectedProperty.banos || 'N/A'}</span>
                  </div>
                  <div className="feature-item">
                    <span className="feature-label">Parqueaderos:</span>
                    <span className="feature-value">{selectedProperty.parqueaderos || 'N/A'}</span>
                  </div>
                  <div className="feature-item">
                    <span className="feature-label">Metros²:</span>
                    <span className="feature-value">{selectedProperty.metrosCuadrados || 'N/A'}</span>
                  </div>
                  <div className="feature-item">
                    <span className="feature-label">Área privada:</span>
                    <span className="feature-value">{selectedProperty.areaPrivada || 'N/A'}</span>
                  </div>
                  <div className="feature-item">
                    <span className="feature-label">Área construida:</span>
                    <span className="feature-value">{selectedProperty.areaConstruida || 'N/A'}</span>
                  </div>
                  <div className="feature-item">
                    <span className="feature-label">Tipo:</span>
                    <span className="feature-value">{selectedProperty.tipo || 'N/A'}</span>
                  </div>
                </div>
              </div>
              
              <div className="contact-section">
                <a
                  href={`https://wa.me/573219536912?text=Hola, estoy interesado en la propiedad ${selectedProperty.titulo || ''}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="whatsapp-button"
                >
                  <FaWhatsapp /> Contactar ahora
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Visor de galería de imágenes tipo lightbox */}
      {galleryOpen && selectedProperty && (
        <div className="gallery-overlay" onClick={() => setGalleryOpen(false)}>
          <div className="gallery-content" onClick={e => e.stopPropagation()}>
            <button className="gallery-close-btn" onClick={() => setGalleryOpen(false)}>×</button>
            <img
              src={selectedProperty.imagenes[galleryIndex]}
              alt={`Imagen ${galleryIndex + 1}`}
              className="gallery-image"
            />
            <div className="gallery-controls">
              <button
                onClick={() => setGalleryIndex((galleryIndex - 1 + selectedProperty.imagenes.length) % selectedProperty.imagenes.length)}
                className="gallery-nav-btn"
              >
                ‹
              </button>
              <span className="gallery-counter">
                {galleryIndex + 1} / {selectedProperty.imagenes.length}
              </span>
              <button
                onClick={() => setGalleryIndex((galleryIndex + 1) % selectedProperty.imagenes.length)}
                className="gallery-nav-btn"
              >
                ›
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Properties;