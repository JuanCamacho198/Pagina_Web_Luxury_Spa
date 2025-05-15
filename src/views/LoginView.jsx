import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/LoginView.css';

const LoginView = ({ onLogin, error }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin(email, password);
  };

  return (
    <div className = "login-container">
      <div className="login-content"> 
        <h2>Iniciar Sesión</h2>
        {error && <p className="error-message">{"Contraseña Incorrecta"}</p>}
        <form onSubmit={handleSubmit} className="login-form">
          <div className="loginform-group">
            <label htmlFor="email">Correo:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="loginform-input"
            />
          </div>
          <div className="loginform-group">
            <label htmlFor="password">Contraseña:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="loginform-input"
            />
          </div>
          <button type="submit" className="login-button">Iniciar Sesión</button>
        </form>
        <p className="lregister-link-text">
          ¿No tienes cuenta? <Link to="/register" className="lregister-link">Regístrate aquí</Link>
        </p>
      </div>
    </div>
  );
};

export default LoginView;