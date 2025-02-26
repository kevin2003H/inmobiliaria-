import React, { useState, useEffect } from "react";
import { FaWhatsapp } from "react-icons/fa";
import "../index.css";

// Componente Modal
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

function Properties() {
  const [properties, setProperties] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false); // Estado para el modal
  const [selectedProperty, setSelectedProperty] = useState(null); // Propiedad seleccionada para el modal

  // Simulación de datos
  useEffect(() => {
    const fakeData = [
      {
        id: 1,
        title: "Casa en la playa",
        images: ["https://via.placeholder.com/300", "https://via.placeholder.com/300"],
        price: "$200,000",
        location: "Cancún, México",
        rooms: 3,
        agentPhone: "1234567890",
      },
      {
        id: 2,
        title: "Departamento en la ciudad",
        images: ["https://via.placeholder.com/300", "https://via.placeholder.com/300"],
        price: "$150,000",
        location: "Ciudad de México",
        rooms: 2,
        agentPhone: "0987654321",
      },
      {
        id: 3,
        title: "Casa en las montañas",
        images: ["https://via.placeholder.com/300", "https://via.placeholder.com/300"],
        price: "$300,000",
        location: "Medellín, Colombia",
        rooms: 4,
        agentPhone: "1122334455",
      },
    ];
    setProperties(fakeData);
  }, []);

  // Función para abrir el modal con la propiedad seleccionada
  const openModal = (property) => {
    setSelectedProperty(property); // Establecer la propiedad seleccionada
    setIsModalOpen(true); // Abrir el modal
  };

  // Función para cerrar el modal
  const closeModal = () => {
    setIsModalOpen(false); // Cerrar el modal
  };

  return (
    <div className="properties-container">
      <h2>Propiedades disponibles</h2>
      <div className="properties-grid">
        {properties.map((property) => (
          <div key={property.id} className="property-card">
            <img src={property.images[0]} alt={property.title} className="property-image" />
            <div className="property-info">
              <h3>{property.title}</h3>
              <p><strong>Precio:</strong> {property.price}</p>
              <p><strong>Ubicación:</strong> {property.location}</p>
              <p><strong>Habitaciones:</strong> {property.rooms}</p>
              <a href={`https://wa.me/${property.agentPhone}`} target="_blank" rel="noopener noreferrer" className="whatsapp-button">
                <FaWhatsapp /> Contactar
              </a>
              {/* Botón para abrir el modal */}
              <button onClick={() => openModal(property)} className="details-button">Ver más</button>
              
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      <Modal 
        isOpen={isModalOpen} 
        onClose={closeModal} 
        property={selectedProperty} 
      />
    </div>
  );
}

export default Properties;
