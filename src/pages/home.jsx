import React, { useState, useEffect } from 'react';
import logo from '../assets/LOGO.png';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';

// Importamos imágenes locales
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

import fondo1 from '../assets/casa1-1.jpeg';
import fondo2 from '../assets/casa1-2.jpeg';
import fondo3 from '../assets/casa1-3.jpeg';
import fondo4 from '../assets/casa1-4.jpeg';
import fondo5 from '../assets/casa1-5.jpeg';

const fondoImages = [fondo1, fondo2, fondo3, fondo4, fondo5];

function Home() {
  const [backgroundImage, setBackgroundImage] = useState(fondoImages[0]);
  const [showModal, setShowModal] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setBackgroundImage((prev) => {
        const currentIndex = fondoImages.indexOf(prev);
        const nextIndex = (currentIndex + 1) % fondoImages.length;
        return fondoImages[nextIndex];
      });
    }, 4000); // Cambiar fondo cada 4 segundos

    // Limpiar el intervalo cuando el componente se desmonte
    return () => clearInterval(interval);
  }, []);

  const handleOpenModal = (property) => {
    setSelectedProperty(property);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedProperty(null);
  };

  return (
    <div className="home-container">
      <div
        className="content"
        style={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          transition: 'background-image 1s ease-in-out',
        }}
      >
        <img src={logo} alt="Carmona Inmobiliaria" className="home-logo" />
        <h2>Bienvenidos a Carmona Inmobiliaria</h2>
        <p>Asesoría experta para decisiones inmobiliarias inteligentes.</p>
      </div>

      {/* Sección de Propiedades Destacadas */}
      <section className="properties-section">
        <h2>Algunas de nuestras Propiedades</h2>
        <div className="properties-container">
          {/* Propiedad 1 con Carrusel */}
          <div className="property-card" onClick={() => handleOpenModal({
            title: 'casa campestre ubicada en Cerritos Pereira',
            description: 'para mas informacion contactanos',
            price: '',
            images: [casa1_1, casa1_2, casa1_3, casa1_4, casa1_5, casa1_6, casa1_7, casa1_8, casa1_9, casa1_10, casa1_11, casa1_12],
          })}>
            <Swiper navigation={true} modules={[Navigation]} className="swiper-container">
              <SwiperSlide><img src={casa1_1} alt="Casa 1 - Foto 1" /></SwiperSlide>
              <SwiperSlide><img src={casa1_2} alt="Casa 1 - Foto 2" /></SwiperSlide>
              <SwiperSlide><img src={casa1_3} alt="Casa 1 - Foto 3" /></SwiperSlide>
            </Swiper>
            <h3>casa campestre ubicada en Cerritos Pereira</h3>
            <p>para mas informacion contactanos</p>
          </div>

          {/* Propiedad 2 con Carrusel */}
          <div className="property-card" onClick={() => handleOpenModal({
            title: 'Casa campestre ubicada en Cerritos Pereira',
            description: 'Estrato 6. Gas natural - agua de Aguas y Aguas - Energía de Pereira - internet - tv por Claro Satelital y Parqueadero para dos carros, jacuzzi y amílicas zonas verdes',
            description2: 'Dos pisos independientes ',
            description3:'Primer piso: tres habitaciones dos baños, sala comedor, cocina integral, alacena y zona de ropas  ',
            description4:'Piso 2: dos habitaciones, dos baños, sala comedor, cocina integral y zona de ropas ',
            price: 'Precio venta: $1.700MM - Pago Adm $560.000',
            
            images: [casa2_1, casa2_2, casa2_3, casa2_4, casa2_5, casa2_6, casa2_7, casa2_8, casa2_9],
          })}>
            <Swiper navigation={true} modules={[Navigation]} className="swiper-container">
              <SwiperSlide><img src={casa2_1} alt="Casa 2 - Foto 1" /></SwiperSlide>
              <SwiperSlide><img src={casa2_2} alt="Casa 2 - Foto 2" /></SwiperSlide>
              <SwiperSlide><img src={casa2_3} alt="Casa 2 - Foto 3" /></SwiperSlide>
            </Swiper>
            <h3>Casa campestre ubicada en Cerritos Pereira</h3>
            <p>Precio venta: $1.700MM</p>
            <p className="property-description">Disfruta de la tranquilidad y exclusividad de esta moderna casa en Cerritos. Con un diseño elegante y espacios amplios, es ideal para quienes buscan comodidad .</p>



          </div>

          {/* Propiedad 3 con Carrusel */}
          <div className="property-card" onClick={() => handleOpenModal({
            title: 'Casa campestre para la renta, ubicada en Cerritos Pereira',
            description: 'con un área de tres mil setecientos metros cuadrados (3.700) mts² y un área construida de novecientos metros cuadrados (900) mts². La primer (1) planta cuenta con dos (2) alcobas con closet, un (1) estudio, un (1) baño completo, sala, comedor, baño social, cocina integral, zona de ropas, alcoba de servicio con baño, parqueadero cubierto para tres (3) automóviles y descubierto para diez (10) automóviles. La segunda planta consta de tres (3) alcobas, principal con vestier, baño privado y balcón, closet en madera, baño social completo y dos (2) balcones. La casa campestre cuenta con piscina, dos (2) jacuzzis, zona BBQ y zonas verdes. Sector con servicio de transporte público, cerca de colegios, restaurantes y parques.',
            price: '3200millones - ',
            images: [casa3_1, casa3_2, casa3_3, casa3_4, casa3_5, casa3_6, casa3_7, casa3_8, casa3_9, casa3_10, casa3_11, casa3_12, casa3_13, casa3_14,casa3_15,casa3_16,casa3_17,casa3_18,casa3_19,casa3_20,casa3_21,casa3_22,casa3_23,casa3_24,casa3_25],
          })}>
            <Swiper navigation={true} modules={[Navigation]} className="swiper-container">
              <SwiperSlide><img src={casa3_1} alt="Casa 3 - Foto 1" /></SwiperSlide>
              <SwiperSlide><img src={casa3_2} alt="Casa 3 - Foto 2" /></SwiperSlide>
              <SwiperSlide><img src={casa3_3} alt="Casa 3 - Foto 3" /></SwiperSlide>
            </Swiper>
            <h3>Casa campestre para la renta, ubicada en Cerritos Pereira</h3>
            <p>$3200millones</p>
            <p className="property-description">Se renta espectacular casa campestre con amplios espacios, piscina privada, jardines y acabados en ladrillo a la vista. Cuenta con varias habitaciones, balcones con vista panorámica y un diseño elegante que combina modernidad con un estilo rústico. Ideal para disfrutar de la tranquilidad y el contacto con la naturaleza.</p>


          </div>
        </div>
      </section>

      {/* Modal */}
      {showModal && selectedProperty && (
        <div className="modal-overlay" onClick={handleCloseModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2>{selectedProperty.title}</h2>
            <p>{selectedProperty.description}</p>
            <h2>{selectedProperty.description2}</h2>
            <p>{selectedProperty.description3}</p>
            <p>{selectedProperty.description4}</p>
            <p>{selectedProperty.price}</p>
            <Swiper navigation={true} modules={[Navigation]} className="swiper-container">
              {selectedProperty.images.map((image, index) => (
                <SwiperSlide key={index}><img src={image} alt={`Imagen ${index + 1}`} /></SwiperSlide>
              ))}
            </Swiper>
            <button onClick={handleCloseModal}>Cerrar</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;
