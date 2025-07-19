import React, { useState, useEffect } from 'react';
import logo from '../assets/LOGO.png';
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import CarruselImagenes from "../components/CarruselImagenes";

import fondo1 from '../assets/casa1-1.jpeg';
import fondo2 from '../assets/casa1-2.jpeg';
import fondo3 from '../assets/casa1-3.jpeg';
import fondo4 from '../assets/casa1-4.jpeg';
import fondo5 from '../assets/casa1-5.jpeg';

const fondoImages = [fondo1, fondo2, fondo3, fondo4, fondo5];

function Home() {
  const [backgroundImage, setBackgroundImage] = useState(fondoImages[0]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [randomProperties, setRandomProperties] = useState([]);

  // Cambia el fondo cada 4 segundos, precargando la imagen antes de mostrarla
  useEffect(() => {
    const interval = setInterval(() => {
      const nextIndex = (currentIndex + 1) % fondoImages.length;
      const nextImg = new window.Image();
      nextImg.src = fondoImages[nextIndex];
      nextImg.onload = () => {
        setBackgroundImage(fondoImages[nextIndex]);
        setCurrentIndex(nextIndex);
      };
    }, 4000);
    return () => clearInterval(interval);
  }, [currentIndex]);

  // Carga 3 propiedades aleatorias de Firestore
  useEffect(() => {
    const fetchProperties = async () => {
      const querySnapshot = await getDocs(collection(db, "propiedades"));
      const propiedades = [];
      querySnapshot.forEach((doc) => {
        propiedades.push({ id: doc.id, ...doc.data() });
      });
      // Mezcla el array y toma 3 propiedades aleatorias
      const shuffled = propiedades.sort(() => 0.5 - Math.random());
      setRandomProperties(shuffled.slice(0, 3));
    };
    fetchProperties();
  }, []);

  const handleOpenModal = (property) => {
    setSelectedProperty(property);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedProperty(null);
  };

  return (
    <div className="home-container">
      <div
        className="content"
        style={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          transition: 'background-image 1s ease-in-out',
        }}
      >
        <img src={logo} alt="Carmona Inmobiliaria" className="home-logo" />
        <h2>Bienvenidos a Carmona Inmobiliaria</h2>
        <p>Asesoría experta para decisiones inmobiliarias inteligentes.</p>
      </div>

      {/* Sección de Propiedades Destacadas desde Firestore */}
      <section className="properties-section">
        <h2>Algunas de nuestras Propiedades</h2>
        <div className="properties-container">
          {randomProperties.map((property) => (
            <div
              className="property-card"
              key={property.id}
              onClick={() => handleOpenModal(property)}
              style={{ cursor: "pointer" }}
            >
              <CarruselImagenes imagenes={property.imagenes} />
              <div className="property-description">{property.descripcion}</div>
              <div className="property-info">
                <p><strong>Precio:</strong> {property.precio}</p>
                <p><strong>Ubicación:</strong> {property.ubicacion}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Sección de Servicios */}
      <section className="services-section">
        <h2>¿Por qué elegirnos?</h2>
        <div className="services-grid">
          <div className="service-card">
            <span role="img" aria-label="Asesoría">💼</span>
            <h3>Asesoría Personalizada</h3>
            <p>Te acompañamos en cada paso de tu inversión inmobiliaria.</p>
          </div>
          <div className="service-card">
            <span role="img" aria-label="Seguridad">🔒</span>
            <h3>Transacciones Seguras</h3>
            <p>Procesos claros y transparentes para tu tranquilidad.</p>
          </div>
          <div className="service-card">
            <span role="img" aria-label="Variedad">🏡</span>
            <h3>Gran Variedad</h3>
            <p>Propiedades para todos los gustos y presupuestos.</p>
          </div>
        </div>
      </section>
      
      <section className="faq-section">
        <h2>Preguntas Frecuentes</h2>
        <div className="faq-list">
          <div className="faq-item">
            <strong>¿Cómo puedo agendar una visita?</strong>
            <p>Puedes contactarnos por WhatsApp o a través del formulario de contacto y coordinaremos una cita.</p>
          </div>
          <div className="faq-item">
            <strong>¿Qué documentos necesito para comprar o arrendar?</strong>
            <p>Te asesoramos en todo el proceso y te indicamos los documentos necesarios según tu caso.</p>
          </div>
        </div>
      </section>

      <section className="map-section">
        <h2>¿Dónde estamos?</h2>
        <div className="map-container">
          <iframe
            title="Ubicación Centro Comercial Palo de Agua"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3977.417524259514!2d-75.7522441!3d4.7934083!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e387d0007d96a71%3A0x161b9bf56b3f7c12!2sMall%20Palo%20de%20Agua!5e0!3m2!1ses!2sco!4v1721140000000!5m2!1ses!2sco"
            width="100%"
            height="250"
            style={{ border: 0, borderRadius: "12px" }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </section>

      {/* Sección de Contacto Rápido */}
      <section className="contact-section">
        <h2>¿Listo para encontrar tu propiedad?</h2>
        <a
          href="https://wa.me/573219536912"
          target="_blank"
          rel="noopener noreferrer"
          className="whatsapp-cta"
        >
          Escríbenos por WhatsApp
        </a>
      </section>

      {/* Modal para ver detalles de la propiedad */}
      {showModal && selectedProperty && (
        <div className="modal-overlay" onClick={handleCloseModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2>{selectedProperty.descripcion}</h2>
            <p><strong>Precio:</strong> {selectedProperty.precio}</p>
            <p><strong>Ubicación:</strong> {selectedProperty.ubicacion}</p>
            <CarruselImagenes imagenes={selectedProperty.imagenes} />
            <button onClick={handleCloseModal}>Cerrar</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;