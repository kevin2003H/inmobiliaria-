import React, { useState } from "react";
import emailjs from "emailjs-com";
import {
  FaWhatsapp,
  FaInstagram,
  FaFacebook,
  FaPaperPlane,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaEnvelope
} from "react-icons/fa";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    title: "", // Cambio importante: usar "title" para coincidir con tu template
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const serviceID = "service_bl84lav";
    const templateID = "template_6ydoc3j";
    const publicKey = "SANq0PVJ6-GmkomRZ";

    emailjs
      .send(serviceID, templateID, formData, publicKey)
      .then(() => {
        setIsSubmitting(false);
        setSubmitSuccess(true);
        setFormData({ name: "", email: "", title: "", message: "" });

        setTimeout(() => setSubmitSuccess(false), 5000);
      })
      .catch((error) => {
        console.error("Error al enviar el mensaje:", error);
        setIsSubmitting(false);
      });
  };

  return (
    <div className="contact-page">
      <div className="contact-hero">
        <div className="hero-content">
          <h1>Contáctanos</h1>
          <p>Estamos aquí para ayudarte a encontrar la propiedad de tus sueños</p>
        </div>
      </div>

      <div className="contact-container">
        {/* Formulario de contacto */}
        <div className="contact-form-section">
          <div className="form-container">
            <h2><FaPaperPlane className="form-icon" /> Envíanos un mensaje</h2>
            {submitSuccess && (
              <div className="success-message">
                ¡Gracias por tu mensaje! Nos pondremos en contacto contigo pronto.
              </div>
            )}
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="name">Nombre completo</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="Ingresa tu nombre"
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">Correo electrónico</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="tucorreo@ejemplo.com"
                />
              </div>

              <div className="form-group">
                <label htmlFor="title">Asunto</label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                  placeholder="Motivo de tu mensaje"
                />
              </div>

              <div className="form-group">
                <label htmlFor="message">Tu mensaje</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  placeholder="Cuéntanos cómo podemos ayudarte..."
                  rows="5"
                ></textarea>
              </div>

              <button type="submit" className="submit-button" disabled={isSubmitting}>
                {isSubmitting ? (
                  <span>Enviando...</span>
                ) : (
                  <span>Enviar mensaje <FaPaperPlane className="button-icon" /></span>
                )}
              </button>
            </form>
          </div>
        </div>

        {/* Información de contacto */}
        <div className="contact-info-section">
          <div className="info-container">
            <h2><FaMapMarkerAlt className="info-icon" /> Información de contacto</h2>

            <div className="contact-methods">
              <div className="contact-item">
                <div className="contact-icon">
                  <FaWhatsapp />
                </div>
                <div className="contact-details">
                  <h3>WhatsApp</h3>
                  <a href="https://wa.me/573219536912" target="_blank" rel="noopener noreferrer">
                    +57 321 9536912
                  </a>
                </div>
              </div>

              <div className="contact-item">
                <div className="contact-icon">
                  <FaPhoneAlt />
                </div>
                <div className="contact-details">
                  <h3>Teléfono</h3>
                  <a href="tel:+573219536912">+57 321 9536912</a>
                </div>
              </div>

              <div className="contact-item">
                <div className="contact-icon">
                  <FaEnvelope />
                </div>
                <div className="contact-details">
                  <h3>Email</h3>
                  <a href="mailto:carmonainmobiliaria1@gmail.com">
                    carmonainmobiliaria1@gmail.com
                  </a>
                </div>
              </div>
            </div>

            <div className="social-section">
              <h3>Síguenos en redes</h3>
              <div className="social-links">
              
                <a href="https://wa.me/573219536912" target="_blank" rel="noopener noreferrer" className="social-button whatsapp">
                  <FaWhatsapp /> WhatsApp
                </a>
                <a href="https://instagram.com/carmona_inmobiliaria" target="_blank" rel="noopener noreferrer" className="social-button instagram">
                  <FaInstagram /> Instagram
                </a>
                <a
                  href="https://www.facebook.com/profile.php?id=61552590611903&mibextid=wwXIfr&rdid=SxlxdGRNq0MZxn2T&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2F1CKR1J8gCu%2F%3Fmibextid%3DwwXIfr#"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-button facebook"
                >
                  <FaFacebook /> Facebook
                </a>

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
