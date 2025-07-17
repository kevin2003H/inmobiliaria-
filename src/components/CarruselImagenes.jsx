import React, { useState, useEffect } from "react";

function CarruselImagenes({ imagenes, onImageClick }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (!imagenes || imagenes.length === 0) return;
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % imagenes.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [imagenes]);

  if (!imagenes || imagenes.length === 0) {
    return <div className="property-image-placeholder"><p>Sin imagen</p></div>;
  }

  return (
    <img
      src={imagenes[index]}
      alt="Propiedad"
      className="property-image"
      style={{ width: "100%", height: "200px", objectFit: "cover", cursor: "zoom-in" }}
      onClick={() => onImageClick && onImageClick(index)}
    />
  );
}

export default CarruselImagenes;