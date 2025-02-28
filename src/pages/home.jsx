// src/pages/Home.jsx
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

  useEffect(() => {
    const interval = setInterval(() => {
      setBackgroundImage((prev) => {
        const currentIndex = fondoImages.indexOf(prev);
        const nextIndex = (currentIndex + 1) % fondoImages.length;
        return fondoImages[nextIndex];
      });
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="home-container">
      <div 
        className="content"
        style={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          transition: "background-image 1s ease-in-out"
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
          <div className="property-card">
            <Swiper navigation={true} modules={[Navigation]} className="swiper-container">
              <SwiperSlide><img src={casa1_1} alt="Casa 1 - Foto 1" /></SwiperSlide>
              <SwiperSlide><img src={casa1_2} alt="Casa 1 - Foto 2" /></SwiperSlide>
              <SwiperSlide><img src={casa1_3} alt="Casa 1 - Foto 3" /></SwiperSlide>
              <SwiperSlide><img src={casa1_4} alt="Casa 1 - Foto 4" /></SwiperSlide>
              <SwiperSlide><img src={casa1_5} alt="Casa 1 - Foto 5" /></SwiperSlide>
              <SwiperSlide><img src={casa1_6} alt="Casa 1 - Foto 6" /></SwiperSlide>
              <SwiperSlide><img src={casa1_7} alt="Casa 1 - Foto 7" /></SwiperSlide>
              <SwiperSlide><img src={casa1_8} alt="Casa 1 - Foto 8" /></SwiperSlide>
              <SwiperSlide><img src={casa1_9} alt="Casa 1 - Foto 9" /></SwiperSlide>
              <SwiperSlide><img src={casa1_10} alt="Casa 1 - Foto 10" /></SwiperSlide>
              <SwiperSlide><img src={casa1_11} alt="Casa 1 - Foto 11" /></SwiperSlide>
              <SwiperSlide><img src={casa1_12} alt="Casa 1 - Foto 12" /></SwiperSlide>

            </Swiper>
            <h3>Casa en la Playa</h3>
            <p>$250,000 - 3 Habitaciones</p>
            </div>
          {/* Propiedad 2 - Imagen carrusel */}
          <div className="property-card">
          <Swiper navigation={true} modules={[Navigation]} className="swiper-container">
              <SwiperSlide><img src={casa2_1} alt="Casa 2 - Foto 1" /></SwiperSlide>
              <SwiperSlide><img src={casa2_2} alt="Casa 2 - Foto 2" /></SwiperSlide>
              <SwiperSlide><img src={casa2_3} alt="Casa 2 - Foto 3" /></SwiperSlide>
              <SwiperSlide><img src={casa2_4} alt="Casa 2 - Foto 4" /></SwiperSlide>
              <SwiperSlide><img src={casa2_5} alt="Casa 2 - Foto 5" /></SwiperSlide>
              <SwiperSlide><img src={casa2_6} alt="Casa 2 - Foto 6" /></SwiperSlide>
              <SwiperSlide><img src={casa2_7} alt="Casa 2 - Foto 7" /></SwiperSlide>
              <SwiperSlide><img src={casa2_8} alt="Casa 2 - Foto 8" /></SwiperSlide>
              <SwiperSlide><img src={casa2_9} alt="Casa 2 - Foto 9" /></SwiperSlide>
              <h3>Casa en la Playa</h3>
              <p>$250,000 - 3 Habitaciones</p>
            </Swiper>
            </div>

          {/* Propiedad 3 - Imagen carrusel */}
          <div className="property-card">
          <Swiper navigation={true} modules={[Navigation]} className="swiper-container">
              <SwiperSlide><img src={casa3_1} alt="Casa 3 - Foto 1" /></SwiperSlide>
              <SwiperSlide><img src={casa3_2} alt="Casa 3 - Foto 2" /></SwiperSlide>
              <SwiperSlide><img src={casa3_3} alt="Casa 3 - Foto 3" /></SwiperSlide>
              <SwiperSlide><img src={casa3_4} alt="Casa 3 - Foto 4" /></SwiperSlide>
              <SwiperSlide><img src={casa3_5} alt="Casa 3 - Foto 5" /></SwiperSlide>
              <SwiperSlide><img src={casa3_6} alt="Casa 3 - Foto 6" /></SwiperSlide>
              <SwiperSlide><img src={casa3_7} alt="Casa 3 - Foto 7" /></SwiperSlide>
              <SwiperSlide><img src={casa3_8} alt="Casa 3 - Foto 8" /></SwiperSlide>
              <SwiperSlide><img src={casa3_9} alt="Casa 3 - Foto 9" /></SwiperSlide>
              <SwiperSlide><img src={casa3_10} alt="Casa 3 - Foto 10" /></SwiperSlide>
              <SwiperSlide><img src={casa3_11} alt="Casa 3 - Foto 11" /></SwiperSlide>
              <SwiperSlide><img src={casa3_12} alt="Casa 3 - Foto 12" /></SwiperSlide>
              <SwiperSlide><img src={casa3_13} alt="Casa 3 - Foto 13" /></SwiperSlide>
              <SwiperSlide><img src={casa3_14} alt="Casa 3 - Foto 14" /></SwiperSlide>
              <SwiperSlide><img src={casa3_15} alt="Casa 3 - Foto 15" /></SwiperSlide>
              <SwiperSlide><img src={casa3_16} alt="Casa 3 - Foto 16" /></SwiperSlide>
              <SwiperSlide><img src={casa3_17} alt="Casa 3 - Foto 17" /></SwiperSlide>
              <SwiperSlide><img src={casa3_18} alt="Casa 3 - Foto 18" /></SwiperSlide>
              <SwiperSlide><img src={casa3_19} alt="Casa 3 - Foto 19" /></SwiperSlide>
              <SwiperSlide><img src={casa3_20} alt="Casa 3 - Foto 20" /></SwiperSlide>
              <SwiperSlide><img src={casa3_21} alt="Casa 3 - Foto 21" /></SwiperSlide>
              <SwiperSlide><img src={casa3_22} alt="Casa 3 - Foto 22" /></SwiperSlide>
              <SwiperSlide><img src={casa3_23} alt="Casa 3 - Foto 23" /></SwiperSlide>
              <SwiperSlide><img src={casa3_24} alt="Casa 3 - Foto 24" /></SwiperSlide>
              <SwiperSlide><img src={casa3_25} alt="Casa 3 - Foto 25" /></SwiperSlide>

              <h3>Casa en la Playa</h3>
              <p>$250,000 - 3 Habitaciones</p>
              
            </Swiper>
            </div>

        </div>
      </section>
    </div>
  );
}

export default Home;

  