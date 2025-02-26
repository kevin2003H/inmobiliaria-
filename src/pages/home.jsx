// src/pages/Home.jsx
import React from 'react';
import logo from '../assets/LOGO.png'; // Importamos el logo

function Home() {
  return (
    <div className="home-container">
      <div className="content">
        {/* Sección principal del Home */}
        <img src={logo} alt="Carmona Inmobiliaria" className="home-logo" />
        <h2>Bienvenidos a Carmona Inmobiliaria</h2>
        <p>Asesoría experta para decisiones inmobiliarias inteligentes.</p>
      </div>

      {/* Nueva sección: Propiedades destacadas */}
      <section className="properties-section">
        <h2>algunas de nuestaras Propiedades</h2>
        <div className="properties-container">
          <div className="property-card">
            <img src="https://via.placeholder.com/300x200" alt="Propiedad 1" />
            <h3>Casa en la Playa</h3>
            <p>$250,000 - 3 Habitaciones</p>
          </div>
          <div className="property-card">
            <img src="https://via.placeholder.com/300x200" alt="Propiedad 2" />
            <h3>Apartamento Moderno</h3>
            <p>$180,000 - 2 Habitaciones</p>
          </div>
          <div className="property-card">
            <img src="https://via.placeholder.com/300x200" alt="Propiedad 3" />
            <h3>Mansión de Lujo</h3>
            <p>$1,200,000 - 6 Habitaciones</p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;

  