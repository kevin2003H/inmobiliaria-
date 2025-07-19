import React, { useState } from "react";
import { FaCheckCircle, FaChartLine, FaFileContract, FaHandshake, 
         FaHome, FaSearchDollar, FaShieldAlt, FaUserTie, FaClipboardCheck } from "react-icons/fa";
import emailjs from "emailjs-com";

const beneficios = [
  {
    icon: <FaFileContract className="benefit-icon" />,
    titulo: "Revisión legal y documental",
    desc: "Nos aseguramos de que toda la documentación esté en orden, para evitar sorpresas o retrasos innecesarios.",
    color: "#3a86ff"
  },
  {
    icon: <FaSearchDollar className="benefit-icon" />,
    titulo: "Asesoría tributaria personalizada",
    desc: "Le orientamos sobre los trámites y costos fiscales derivados de la venta o alquiler de su propiedad.",
    color: "#8338ec"
  },
  {
    icon: <FaChartLine className="benefit-icon" />,
    titulo: "Análisis de mercado comparativo (AMC)",
    desc: "Estudiamos la oferta y demanda de inmuebles similares en su zona para definir el precio justo y competitivo.",
    color: "#ff006e"
  },
  {
    icon: <FaHome className="benefit-icon" />,
    titulo: "Estrategia de comercialización a la medida",
    desc: (
      <>
        <p>Creamos un plan de difusión exclusivo para su inmueble:</p>
        <ul className="benefit-features">
          <li>Publicación en nuestra web y portales inmobiliarios</li>
          <li>Promoción en redes sociales estratégica</li>
          <li>Anuncios impresos/digitales profesionales</li>
          <li>Carteles de alta visibilidad</li>
          <li>Envío a bases de datos segmentadas</li>
        </ul>
      </>
    ),
    color: "#fb5607"
  },
  {
    icon: <FaClipboardCheck className="benefit-icon" />,
    titulo: "Recomendaciones para mejorar el atractivo del inmueble",
    desc: "Le damos sugerencias claras para que su propiedad luzca mejor ante los posibles interesados.",
    color: "#ffbe0b"
  },
  {
    icon: <FaUserTie className="benefit-icon" />,
    titulo: "Atención profesional durante las visitas",
    desc: "Nuestros agentes capacitados se encargan de mostrar su propiedad con empatía, seguridad y conocimiento.",
    color: "#06d6a0"
  },
  {
    icon: <FaShieldAlt className="benefit-icon" />,
    titulo: "Selección y filtrado de interesados",
    desc: "Evitamos visitas innecesarias, y por seguridad, siempre acompañamos cada cita.",
    color: "#118ab2"
  },
  {
    icon: <FaHandshake className="benefit-icon" />,
    titulo: "Negociación de la mejor oferta",
    desc: "Buscamos y gestionamos propuestas serias y por escrito, para que usted tome decisiones con respaldo.",
    color: "#073b4c"
  },
  {
    icon: <FaCheckCircle className="benefit-icon" />,
    titulo: "Acompañamiento hasta el cierre",
    desc: "Le guiamos con cada documento y trámite necesario para finalizar su operación de forma exitosa.",
    color: "#7209b7"
  },
];

// Mini formulario al final
function MiniFormularioOfrezca() {
  const [form, setForm] = useState({
    nombre: "",
    telefono: "",
    tipo: "",
    correo: "",
    lugar: "",
    valor: "",
    comentarios: "",
  });
  const [enviando, setEnviando] = useState(false);
  const [exito, setExito] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setEnviando(true);

    const serviceID = "service_bl84lav";
    const templateID = "template_6ydoc3j";
    const publicKey = "SANq0PVJ6-GmkomRZ";

    emailjs
      .send(serviceID, templateID, form, publicKey)
      .then(() => {
        setExito(true);
        setForm({
          nombre: "",
          telefono: "",
          tipo: "",
          correo: "",
          lugar: "",
          valor: "",
          comentarios: "",
        });
        setTimeout(() => setExito(false), 5000);
      })
      .catch(() => {})
      .finally(() => setEnviando(false));
  };

  return (
    <div className="ofrezca-form-box">
      <h2>¿Quiere que lo contactemos?</h2>
      <p>Complete este formulario y un asesor se comunicará con usted.</p>
      {exito && (
        <div className="ofrezca-form-success">
          ¡Gracias! Hemos recibido su información.
        </div>
      )}
      <form onSubmit={handleSubmit} className="ofrezca-form">
        <input
          type="text"
          name="nombre"
          placeholder="Nombre completo"
          value={form.nombre}
          onChange={handleChange}
          required
        />
        <input
          type="tel"
          name="telefono"
          placeholder="Teléfono"
          value={form.telefono}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="correo"
          placeholder="Correo electrónico"
          value={form.correo}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="tipo"
          placeholder="Tipo de inmueble (casa, apto, lote, etc.)"
          value={form.tipo}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="lugar"
          placeholder="Ubicación del inmueble"
          value={form.lugar}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="valor"
          placeholder="Valor aproximado"
          value={form.valor}
          onChange={handleChange}
        />
        <textarea
          name="comentarios"
          placeholder="Comentarios adicionales"
          value={form.comentarios}
          onChange={handleChange}
          rows={3}
        />
        <button type="submit" disabled={enviando}>
          {enviando ? "Enviando..." : "Enviar"}
        </button>
      </form>
    </div>
  );
}

export default function OfrezcaPropiedad() {
  return (
    <section className="benefits-section">
      <div className="benefits-header">
        <h1 className="benefits-main-title">
          Venda o Alquile su Propiedad con <span>Expertos Inmobiliarios</span>
        </h1>
        <p className="benefits-intro">
          En Inmobiliaria Carmona transformamos el proceso complejo en una experiencia sencilla, estratégica y segura.
        </p>
      </div>

      <div className="benefits-container">
        <div className="benefits-grid">
          {beneficios.map((beneficio, index) => (
            <div 
              key={index} 
              className="benefit-card"
              style={{ borderTop: `4px solid ${beneficio.color}` }}
            >
              <div className="benefit-icon-container" style={{ color: beneficio.color }}>
                {beneficio.icon}
              </div>
              <h3 className="benefit-title">{beneficio.titulo}</h3>
              <div className="benefit-desc">{beneficio.desc}</div>
            </div>
          ))}
        </div>
      </div>

       <div className="benefits-cta">
        <h2 className="cta-title">¿Listo para comenzar?</h2>
        <p className="cta-text">Contáctenos hoy mismo y reciba una consultoría gratuita</p>
        <a
          href="https://wa.me/573219536912?text=Hola%2C%20quiero%20una%20asesor%C3%ADa%20inmobiliaria"
          target="_blank"
          rel="noopener noreferrer"
          className="cta-button"
          style={{ display: "inline-block", textDecoration: "none" }}
        >
          Solicitar Asesoría
        </a>
      </div>
      {/* Mini formulario al final */}
      <MiniFormularioOfrezca />
    </section>
  );
}