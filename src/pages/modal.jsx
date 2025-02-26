import React from "react";
import "../index.css";

const Modal = ({ isOpen, onClose, property }) => {
  if (!isOpen) return null; // Si el modal no está abierto, no se renderiza

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="close-btn" onClick={onClose}>X</button>
        <h2>{property.title}</h2>
        <img src={property.images[0]} alt={property.title} className="modal-image" />
        <p><strong>Precio:</strong> {property.price}</p>
        <p><strong>Ubicación:</strong> {property.location}</p>
        <p><strong>Habitaciones:</strong> {property.rooms}</p>
        <a href={`https://wa.me/${property.agentPhone}`} target="_blank" rel="noopener noreferrer" className="whatsapp-button">
          Contactar
        </a>
      </div>
    </div>
  );
};

export default Modal;
