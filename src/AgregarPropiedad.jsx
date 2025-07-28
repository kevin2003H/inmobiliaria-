import React, { useState, useEffect } from "react";
import { collection, addDoc, updateDoc, doc } from "firebase/firestore";
import { db, storage } from "./firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { useNavigate } from "react-router-dom";

function AgregarPropiedad() {
  const [titulo, setTitulo] = useState("");
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
  const [estrato, setEstrato] = useState(""); // Nuevo campo estrato
  const [imagenes, setImagenes] = useState([]);
  const [previewUrls, setPreviewUrls] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editId, setEditId] = useState(null);
  const [imagenesOriginales, setImagenesOriginales] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const editData = localStorage.getItem("editPropiedad");
    if (editData) {
      const prop = JSON.parse(editData);
      setTitulo(prop.titulo || "");
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
      setEstrato(prop.estrato || ""); // Cargar estrato si existe
      setEditId(prop.id);
      setImagenesOriginales(prop.imagenes || []);
      setPreviewUrls(prop.imagenes || []);
      localStorage.removeItem("editPropiedad");
    }
  }, []);

  // Acumula imágenes seleccionadas y sus previews
  const handleImagenesChange = (e) => {
    const files = Array.from(e.target.files);
    setImagenes(prev => [...prev, ...files]);
    const previews = files.map(file => URL.createObjectURL(file));
    setPreviewUrls(prev => [...prev, ...previews]);
  };

  // Eliminar una imagen seleccionada antes de guardar
  const handleRemoveImagen = (idx) => {
    setPreviewUrls(prev => prev.filter((_, i) => i !== idx));
    setImagenes(prev => prev.filter((_, i) => i !== idx));
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
        estrato, // Guardar estrato
        imagenes: imagenesUrls
      };

      if (editId) {
        const refDoc = doc(db, "propiedades", editId);
        await updateDoc(refDoc, data);
        alert("Propiedad actualizada!");
      } else {
        await addDoc(collection(db, "propiedades"), data);
        alert("Propiedad guardada!");
      }

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
      setEstrato("");
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
          <option value="finca">Finca</option>
          <option value="edificio">Edificio</option>
        </select>
        <label>Estrato</label>
        <select
          value={estrato}
          onChange={e => setEstrato(e.target.value)}
          required
        >
          <option value="">Selecciona el estrato</option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="6">6</option>
        </select>
        <label>Imágenes</label>
        <input
          type="file"
          multiple
          onChange={handleImagenesChange}
          accept="image/*"
        />
        {/* Vista previa de imágenes con botón para eliminar */}
        <div className="imagenes-preview">
          {previewUrls.map((url, idx) => (
            <div key={idx} style={{ position: "relative", display: "inline-block", marginRight: 8 }}>
              <img
                src={url}
                alt={`preview-${idx}`}
                style={{ width: 90, height: 90, objectFit: "cover", borderRadius: 8 }}
              />
              <button
                type="button"
                onClick={() => handleRemoveImagen(idx)}
                style={{
                  position: "absolute",
                  top: 2,
                  right: 2,
                  background: "#e63946",
                  color: "#fff",
                  border: "none",
                  borderRadius: "50%",
                  width: 22,
                  height: 22,
                  cursor: "pointer",
                  fontWeight: "bold",
                  lineHeight: "18px",
                  padding: 0
                }}
                title="Eliminar imagen"
              >×</button>
            </div>
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