// src/pages/Login.jsx
import React, { useState } from "react";
import "../index.css"; // Asegúrate de crear un archivo CSS para el estilo.

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validación básica (por ejemplo, puede ser que el usuario y la contraseña no estén vacíos)
    if (!username || !password) {
      setError("Por favor, completa todos los campos.");
      return;
    }

    // Aquí puedes agregar la lógica para verificar el inicio de sesión, por ejemplo, llamando a una API.
    // Si el login es exitoso, redirigir a otra página, de lo contrario, mostrar error.

    if (username === "usuario" && password === "contraseña") {
      alert("¡Inicio de sesión exitoso!");
      // Aquí podrías redirigir a otra página
    } else {
      setError("Usuario o contraseña incorrectos.");
    }
  };

  return (
    <div className="login-container">
      <h2>Iniciar sesión</h2>
      <form onSubmit={handleSubmit} className="login-form">
        <div className="input-group">
          <label htmlFor="username">Nombre de usuario:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
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
    </div>
  );
}

export default Login;

  