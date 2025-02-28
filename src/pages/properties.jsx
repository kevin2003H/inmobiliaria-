import React, { useState, useEffect } from "react";
import { FaWhatsapp } from "react-icons/fa";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import "../index.css";

import casa1_1 from '../assets/casa1-1.jpeg';
import casa1_2 from '../assets/casa1-2.jpeg';
import casa1_3 from '../assets/casa1-3.jpeg';
import casa1_4 from '../assets/casa1-4.jpeg';
import casa1_5 from '../assets/casa1-5.jpeg';
import casa1_6 from '../assets/casa1-6.jpeg';
import casa1_7 from '../assets/casa1-7.jpeg';
import casa1_8 from '../assets/casa1-8.jpeg';
import casa1_9 from '../assets/casa1-9.jpeg';
import casa1_10 from '../assets/casa1-10.jpeg';
import casa1_11 from '../assets/casa1-11.jpeg';
import casa1_12 from '../assets/casa1-12.jpeg';


import casa2_1 from '../assets/casa2-1.jpeg';
import casa2_2 from '../assets/casa2-2.jpeg';
import casa2_3 from '../assets/casa2-3.jpeg';
import casa2_4 from '../assets/casa2-4.jpeg';
import casa2_5 from '../assets/casa2-5.jpeg';
import casa2_6 from '../assets/casa2-6.jpeg';
import casa2_7 from '../assets/casa2-7.jpeg';
import casa2_8 from '../assets/casa2-8.jpeg';
import casa2_9 from '../assets/casa2-9.jpeg';

import casa3_1 from '../assets/casa3-1.jpeg';
import casa3_2 from '../assets/casa3-2.jpeg';
import casa3_3 from '../assets/casa3-3.jpeg';
import casa3_4 from '../assets/casa3-4.jpeg';
import casa3_5 from '../assets/casa3-5.jpeg';
import casa3_6 from '../assets/casa3-6.jpeg';
import casa3_7 from '../assets/casa3-7.jpeg';
import casa3_8 from '../assets/casa3-8.jpeg';
import casa3_9 from '../assets/casa3-9.jpeg';
import casa3_10 from '../assets/casa3-10.jpeg';
import casa3_11 from '../assets/casa3-11.jpeg';
import casa3_12 from '../assets/casa3-12.jpeg';
import casa3_13 from '../assets/casa3-13.jpeg';
import casa3_14 from '../assets/casa3-14.jpeg';
import casa3_15 from '../assets/casa3-15.jpeg';
import casa3_16 from '../assets/casa3-16.jpeg';
import casa3_17 from '../assets/casa3-17.jpeg';
import casa3_18 from '../assets/casa3-18.jpeg';
import casa3_19 from '../assets/casa3-19.jpeg';
import casa3_20 from '../assets/casa3-20.jpeg';
import casa3_21 from '../assets/casa3-21.jpeg';
import casa3_22 from '../assets/casa3-22.jpeg';
import casa3_23 from '../assets/casa3-23.jpeg';
import casa3_24 from '../assets/casa3-24.jpeg';
import casa3_25 from '../assets/casa3-25.jpeg';

// Componente Modal
// Componente Modal (solo si lo necesitas, pero ahora ya no lo usaremos en el contenedor de propiedades)
const Modal = ({ isOpen, onClose, property }) => {
  if (!isOpen) return null; // Si el modal no está abierto, no se renderiza

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="close-btn" onClick={onClose}>X</button>
        <h2>{property.title}</h2>
        <Swiper navigation={true} modules={[Navigation]} className="swiper-container">
          {property.images.map((image, index) => (
            <SwiperSlide key={index}>
              <img src={image} alt={`${property.title} - Foto ${index + 1}`} className="modal-image" />
            </SwiperSlide>
          ))}
        </Swiper>
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
        images: [casa1_1, casa1_2, casa1_3, casa1_4, casa1_5, casa1_6, casa1_7, casa1_8, casa1_9, casa1_10, casa1_11, casa1_12],
        price: "$200,000",
        location: "Cancún, México",
        rooms: 3,
        agentPhone: "1234567890",
      },
      {
        id: 2,
        title: "Departamento en la ciudad",
        images: [casa2_1, casa2_2, casa2_3, casa2_4, casa2_5, casa2_6, casa2_7, casa2_8, casa2_9],
        price: "$150,000",
        location: "Ciudad de México",
        rooms: 2,
        agentPhone: "0987654321",
      },
      {
        id: 3,
        title: "Casa en las montañas",
        images: [casa3_1, casa3_2, casa3_3, casa3_4, casa3_5, casa3_6, casa3_7, casa3_8, casa3_9,casa3_10, casa3_11, casa3_12, casa3_13, casa3_14, casa3_15, casa3_16, casa3_17, casa3_18,casa3_19, casa3_10, casa3_21, casa3_22, casa3_23, casa3_24, casa3_25],
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
            <h3>{property.title}</h3>

            {/* Swiper para deslizar las imágenes dentro de la tarjeta */}
            <Swiper navigation={true} modules={[Navigation]} className="swiper-container">
              {property.images.map((image, index) => (
                <SwiperSlide key={index}>
                  <img src={image} alt={`${property.title} - Foto ${index + 1}`} className="property-image" />
                </SwiperSlide>
              ))}
            </Swiper>

            <div className="property-info">
              <p><strong>Precio:</strong> {property.price}</p>
              <p><strong>Ubicación:</strong> {property.location}</p>
              <p><strong>Habitaciones:</strong> {property.rooms}</p>
              <a href={`https://wa.me/${property.agentPhone}`} target="_blank" rel="noopener noreferrer" className="whatsapp-button">
                <FaWhatsapp /> Contactar
              </a>
              {/* Botón para abrir el modal (si lo necesitas) */}
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