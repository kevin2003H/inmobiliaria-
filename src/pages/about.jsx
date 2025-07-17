import React from 'react';
import '../index.css';

function About() {
  return (
    <div className="about-container" style={{ maxWidth: 1100, margin: "0 auto", padding: "2rem 1rem" }}>
      <h2 className="about-title" style={{ textAlign: "center", fontSize: "2.5rem", marginBottom: "1.5rem", color: "#1d3557" }}>
        Sobre Nosotros
      </h2>
      <div className="about-content" style={{ display: "flex", flexWrap: "wrap", gap: "2.5rem", alignItems: "flex-start", background: "#fff", borderRadius: 16, boxShadow: "0 4px 24px rgba(0,0,0,0.07)", padding: "2rem" }}>
        <div className="about-text" style={{ flex: 2, minWidth: 300 }}>
          <section style={{ marginBottom: "2rem" }}>
            <h3 style={{ color: "#457b9d", fontWeight: 700, fontSize: "1.4rem", marginBottom: 8 }}>Presentación</h3>
            <p style={{ lineHeight: 1.7, color: "#333" }}>
              Carmona inmobiliaria es una empresa en la ciudad de Pereira, capital del eje cafetero, dedicada a la
              prestación de servicios inmobiliarios dándote una asesoría personalizada basada en la honestidad y
              cumplimiento de las negociaciones y el seguimiento continuo a sus clientes.
              Nos especializamos en propiedades de alta calidad y trabajamos incansablemente para ofrecer las
              mejores opciones a nuestros clientes.
            </p>
          </section>
          <section style={{ marginBottom: "2rem" }}>
            <h3 style={{ color: "#457b9d", fontWeight: 700, fontSize: "1.4rem", marginBottom: 8 }}>Misión</h3>
            <p style={{ lineHeight: 1.7, color: "#333" }}>
              Ayudar a nuestros clientes a tomar la decisión más adecuada en sus operaciones inmobiliarias,
              facilitando la compra, venta y administración de tu inmueble en el menor tiempo posible, el mejor
              tiempo del mercado, protegiendo legalmente el patrimonio de todas las partes, con transparencia y
              confiabilidad, impulsando el desarrollo sostenible de nuevos proyectos inmobiliarios y contribuyendo
              a la mejor calidad de vida de nuestros clientes, nuestros colaboradores, con el entorno y con una justa
              remuneración.
            </p>
          </section>
          <section>
            <h3 style={{ color: "#457b9d", fontWeight: 700, fontSize: "1.4rem", marginBottom: 8 }}>Visión</h3>
            <p style={{ lineHeight: 1.7, color: "#333" }}>
              Seremos una empresa que contará con la conquista del mercado y certificada con todos los sellos de
              calidad, servicio y tecnología para que nuestros clientes tengan las mejores soluciones integrales en
              propiedad raíz. Estamos seguros de lograrlo con el apoyo y la confianza incondicional que siempre
              hemos recibido de nuestros clientes, abonado al esmero, dedicación, profesionalismo y el sentido de
              pertenencia de nuestros funcionarios.
            </p>
          </section>
        </div>
        <div className="about-values" style={{ flex: 1, minWidth: 260, background: "#f1faee", borderRadius: 12, padding: "1.5rem", boxShadow: "0 2px 12px rgba(69,123,157,0.07)" }}>
          <h3 style={{ color: "#1d3557", fontWeight: 700, fontSize: "1.2rem", marginBottom: 16, textAlign: "center" }}>Nuestros Valores</h3>
          <ul style={{ listStyle: "none", padding: 0, color: "#222", fontSize: "1rem" }}>
            <li style={{ marginBottom: 12 }}>
              <strong style={{ color: "#457b9d" }}>Confianza:</strong> Construimos relaciones duraderas con nuestros clientes.
            </li>
            <li style={{ marginBottom: 12 }}>
              <strong style={{ color: "#457b9d" }}>Compromiso:</strong> Nos comprometemos a ofrecer el mejor servicio posible.
            </li>
            <li style={{ marginBottom: 12 }}>
              <strong style={{ color: "#457b9d" }}>Transparencia:</strong> Actuamos con honestidad en cada transacción.
            </li>
            <li>
              <strong style={{ color: "#457b9d" }}>Innovación:</strong> Siempre buscamos nuevas formas de mejorar nuestros servicios.
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default About;