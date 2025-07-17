import React, { useState, useEffect } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";
import "../index.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [user, setUser] = useState(null);
  const [modo, setModo] = useState(""); // "editar" o "eliminar"
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((firebaseUser) => {
      setUser(firebaseUser);
    });
    return () => unsubscribe();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError("Por favor, completa todos los campos.");
      return;
    }
    try {
      await signInWithEmailAndPassword(auth, email, password);
      setError("");
    } catch (err) {
      setError("Usuario o contraseña incorrectos.");
    }
  };

  const handleLogout = async () => {
    await auth.signOut();
    setUser(null);
    setEmail("");
    setPassword("");
  };

  // Solo un botón, alterna entre editar y eliminar
  const handleGoToProperties = () => {
    const nuevoModo = modo === "editar" ? "eliminar" : "editar";
    setModo(nuevoModo);
    localStorage.setItem("modoPropiedades", nuevoModo);
    navigate("/properties");
  };

  return (
    <div className="login-bg">
      <div className="login-container">
        {!user ? (
          <>
            <h2>Iniciar sesión</h2>
            <form onSubmit={handleSubmit} className="login-form">
              <div className="input-group">
                <label htmlFor="email">Correo electrónico:</label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="input-group">
                <label htmlFor="password">Contraseña:</label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              {error && <p className="error-message">{error}</p>}
              <button type="submit" className="login-btn">
                Iniciar sesión
              </button>
            </form>
          </>
        ) : (
          <div className="perfil-container">
            <div className="perfil-avatar">
              {user.email.charAt(0).toUpperCase()}
            </div>
            <div className="perfil-info">
              <h2 className="perfil-title">¡Bienvenido!</h2>
              <p className="perfil-email">{user.email}</p>
              <button className="logout-btn" onClick={handleLogout}>Cerrar sesión</button>
              <div style={{ marginTop: 24, display: "flex", gap: 12 }}>
                <button
                  className="perfil-action-btn"
                  onClick={handleGoToProperties}
                  style={{
                    background: modo === "editar" ? "#e63946" : "#457b9d",
                    color: "#fff",
                    borderRadius: 8,
                    padding: "0.6rem 1.2rem",
                    border: "none",
                    cursor: "pointer"
                  }}
                >
                  {modo === "editar" ? "Eliminar mis propiedades" : "Editar mis propiedades"}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Login;