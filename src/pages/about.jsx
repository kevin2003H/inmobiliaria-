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
            Somos una inmobiliaria con más de 10 años de experiencia en el sector, 
            ayudando a nuestros clientes a encontrar su hogar ideal o la inversión perfecta. 
            Nuestra misión es brindar un servicio personalizado y profesional para que tu 
            experiencia de compra o alquiler sea lo más fácil y satisfactoria posible.
          </p>
          <p>
            Nos especializamos en propiedades de alta calidad, tanto residenciales como comerciales, 
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

  