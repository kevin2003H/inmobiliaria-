/// src/pages/About.jsx
import React from 'react';
import '../index.css';  // Importa los estilos CSS para esta sección

function About() {
  return (
    <div className="about-container">
      <h2 className="about-title">Sobre Nosotros</h2>
      <div className="about-content">
        <div className="about-text">
          <p>
          Carmona inmobiliaria es una empresa en la ciudad de Pereira capital del eje cafetero, 
          dedicada a la prestación de servicios inmobiliarios dándote una asesoría personalizada basados en la honestidad y cumplimientos de las negociaciones y el seguimiento continuo a sus clientes.
          </p>
          <p>
            Nos especializamos en propiedades de alta calidad 
            y trabajamos incansablemente para ofrecer las mejores opciones a nuestros clientes.
          </p>
        </div>
        <div className="about-values">
          <h3>Nuestros Valores</h3>
          <ul>
            <li><strong>Confianza:</strong> Construimos relaciones duraderas con nuestros clientes.</li>
            <li><strong>Compromiso:</strong> Nos comprometemos a ofrecer el mejor servicio posible.</li>
            <li><strong>Transparencia:</strong> Actuamos con honestidad en cada transacción.</li>
            <li><strong>Innovación:</strong> Siempre buscamos nuevas formas de mejorar nuestros servicios.</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default About;

  