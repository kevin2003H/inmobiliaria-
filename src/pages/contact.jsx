import React, { useState } from "react";
import { FaWhatsapp, FaInstagram, FaFacebook } from "react-icons/fa";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Mensaje enviado:", formData);
    // Aquí puedes manejar el envío del formulario, como enviarlo a un backend o servicio de correo
  };

  return (
    <div className="contact-container">
      {/* Formulario de contacto */}
      <div className="contact-form">
        <h2>Contáctanos</h2>
        <form onSubmit={handleSubmit}>
          <label>Nombre</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />

          <label>Correo Electrónico</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <label>Mensaje</label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
          ></textarea>

          <button type="submit">Enviar</button>
        </form>
      </div>

      {/* Redes Sociales */}
      <div className="contact-social">
        <h2>Síguenos</h2>
        <p>¡También puedes escribirnos en nuestras redes sociales!</p>

        <div className="social-icons">
          <a href="https://wa.me/123456789" target="_blank" rel="noopener noreferrer">
            <FaWhatsapp className="icon whatsapp" /> WhatsApp
          </a>
          <a href="https://instagram.com/tu_perfil" target="_blank" rel="noopener noreferrer">
            <FaInstagram className="icon instagram" /> Instagram
          </a>
          <a href="https://facebook.com/tu_perfil" target="_blank" rel="noopener noreferrer">
            <FaFacebook className="icon facebook" /> Facebook
          </a>
        </div>
      </div>
    </div>
  );
};

export default Contact;

