import React, { useState, useEffect } from "react";
import { collection, addDoc, updateDoc, doc } from "firebase/firestore";
import { db, storage } from "./firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { useNavigate } from "react-router-dom";

function AgregarPropiedad() {
  const [titulo, setTitulo] = useState(""); // Añade este estado para el título
  const [descripcion, setDescripcion] = useState("");
  const [precio, setPrecio] = useState("");
  const [ubicacion, setUbicacion] = useState("");
  const [habitaciones, setHabitaciones] = useState("");
  const [banos, setBanos] = useState("");
  const [parqueadero, setParqueadero] = useState("");
  const [tipoParqueadero, setTipoParqueadero] = useState("");
  const [metrosCuadrados, setMetrosCuadrados] = useState("");
  const [areaPrivada, setAreaPrivada] = useState("");
  const [areaConstruida, setAreaConstruida] = useState("");
  const [tipo, setTipo] = useState("");
  const [imagenes, setImagenes] = useState([]);
  const [previewUrls, setPreviewUrls] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editId, setEditId] = useState(null);
  const [imagenesOriginales, setImagenesOriginales] = useState([]);

  const navigate = useNavigate();

  // Cargar datos si es edición
  useEffect(() => {
    const editData = localStorage.getItem("editPropiedad");
    if (editData) {
      const prop = JSON.parse(editData);
      setTitulo(prop.titulo || ""); // Cargar el título si existe
      setDescripcion(prop.descripcion || "");
      setPrecio(prop.precio || "");
      setUbicacion(prop.ubicacion || "");
      setHabitaciones(prop.habitaciones || "");
      setBanos(prop.banos || "");
      setParqueadero(prop.parqueadero || "");
      setTipoParqueadero(prop.tipoParqueadero || "");
      setMetrosCuadrados(prop.metrosCuadrados || "");
      setAreaPrivada(prop.areaPrivada || "");
      setAreaConstruida(prop.areaConstruida || "");
      setTipo(prop.tipo || "");
      setEditId(prop.id);
      setImagenesOriginales(prop.imagenes || []);
      setPreviewUrls(prop.imagenes || []);
      localStorage.removeItem("editPropiedad");
    }
  }, []);

  const handleImagenesChange = (e) => {
    const files = Array.from(e.target.files);
    setImagenes(files);

    // Crear URLs de vista previa
    const previews = files.map(file => URL.createObjectURL(file));
    setPreviewUrls(previews);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    let imagenesUrls = [];

    try {
      // Si hay imágenes nuevas, súbelas y usa esas URLs
      if (imagenes.length > 0) {
        for (const imagen of imagenes) {
          const storageRef = ref(storage, `imagenes/${imagen.name}-${Date.now()}`);
          await uploadBytes(storageRef, imagen);
          const url = await getDownloadURL(storageRef);
          imagenesUrls.push(url);
        }
      } else if (editId) {
        // Si no hay imágenes nuevas pero es edición, usa las originales
        imagenesUrls = imagenesOriginales;
      }

      const data = {
         titulo,
        descripcion,
        precio,
        ubicacion,
        habitaciones,
        banos,
        parqueadero,
        tipoParqueadero,
        metrosCuadrados,
        areaPrivada,
        areaConstruida,
        tipo,
        imagenes: imagenesUrls
      };

      if (editId) {
        // Actualizar propiedad existente
        const refDoc = doc(db, "propiedades", editId);
        await updateDoc(refDoc, data);
        alert("Propiedad actualizada!");
      } else {
        // Crear nueva propiedad
        await addDoc(collection(db, "propiedades"), data);
        alert("Propiedad guardada!");
      }

      // Limpiar formulario y navegar
        setTitulo("");
      setDescripcion("");
      setPrecio("");
      setUbicacion("");
      setHabitaciones("");
      setBanos("");
      setParqueadero("");
      setTipoParqueadero("");
      setMetrosCuadrados("");
      setAreaPrivada("");
      setAreaConstruida("");
      setTipo("");
      setImagenes([]);
      setPreviewUrls([]);
      setEditId(null);
      setImagenesOriginales([]);
      navigate("/properties");
    } catch (e) {
      alert("Error al guardar: " + e.message);
    }
    setLoading(false);
  };

  return (
    <div className="agregar-propiedad-container">
      <h2>{editId ? "Editar Propiedad" : "Agregar Propiedad"}</h2>
      <form className="agregar-propiedad-form" onSubmit={handleSubmit}>
         <label>Título</label>
        <input
          type="text"
          placeholder="Título de la propiedad"
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
          required
        />
        <label>Descripción</label>
        <input
          type="text"
          placeholder="Descripción"
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
          required
        />
        <label>Precio</label>
        <input
          type="text"
          placeholder="Precio"
          value={precio}
          onChange={(e) => setPrecio(e.target.value)}
          required
        />
        <label>Ubicación</label>
        <input
          type="text"
          placeholder="Ubicación"
          value={ubicacion}
          onChange={(e) => setUbicacion(e.target.value)}
          required
        />
        <label>Habitaciones</label>
        <input
          type="number"
          min="0"
          placeholder="Número de habitaciones"
          value={habitaciones}
          onChange={(e) => setHabitaciones(e.target.value)}
          required
        />
        <label>Baños</label>
        <input
          type="number"
          min="0"
          placeholder="Número de baños"
          value={banos}
          onChange={(e) => setBanos(e.target.value)}
          required
        />
        <label>Parqueadero</label>
        <select
          value={parqueadero}
          onChange={(e) => setParqueadero(e.target.value)}
          required
        >
          <option value="">¿Tiene parqueadero?</option>
          <option value="sí">Sí</option>
          <option value="no">No</option>
        </select>
        {parqueadero === "sí" && (
          <>
            <label>Tipo de parqueadero</label>
            <select
              value={tipoParqueadero}
              onChange={(e) => setTipoParqueadero(e.target.value)}
              required
            >
              <option value="">Selecciona una opción</option>
              <option value="carro">Carro</option>
              <option value="moto">Moto</option>
              <option value="ambos">Ambos</option>
            </select>
          </>
        )}
        <label>Metros cuadrados</label>
        <input
          type="number"
          min="0"
          placeholder="Metros cuadrados"
          value={metrosCuadrados}
          onChange={(e) => setMetrosCuadrados(e.target.value)}
        />
        <label>Área privada</label>
        <input
          type="number"
          min="0"
          placeholder="Área privada (m²)"
          value={areaPrivada}
          onChange={(e) => setAreaPrivada(e.target.value)}
        />
        <label>Área construida</label>
        <input
          type="number"
          min="0"
          placeholder="Área construida (m²)"
          value={areaConstruida}
          onChange={(e) => setAreaConstruida(e.target.value)}
        />
        <label>Tipo de propiedad</label>
        <select
          value={tipo}
          onChange={(e) => setTipo(e.target.value)}
          required
        >
          <option value="">Selecciona una opción</option>
          <option value="campestre">Campestre</option>
          <option value="urbano">Urbano</option>
          <option value="lote">Lote</option>
          <option value="bodega">Bodega</option>
          <option value="apartamento">Apartamento</option>
          <option value="casa">Casa</option>
          <option value="oficina">Oficina</option>
          <option value="local">Local</option>
        </select>
        <label>Imágenes</label>
        <input
          type="file"
          multiple
          onChange={handleImagenesChange}
          accept="image/*"
        />
        {/* Vista previa de imágenes */}
        <div className="imagenes-preview">
          {previewUrls.map((url, idx) => (
            <img
              key={idx}
              src={url}
              alt={`preview-${idx}`}
            />
          ))}
        </div>
        <button type="submit" disabled={loading}>
          {loading ? "Guardando..." : editId ? "Actualizar Propiedad" : "Guardar Propiedad"}
        </button>
      </form>
    </div>
  );
}

export default AgregarPropiedad;