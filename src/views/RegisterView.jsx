import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { registroUsuario } from '../controllers/authController'
import '../styles/RegisterView.css';

const RegisterView = () => {
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const enviarFormulario = async(evento) => {
    evento.preventDefault();
    await registroUsuario(nombre, apellido, email, password, navigate, setError);
    navigate ('/home')
    
  };

  return (
    <div className='register-container'>
      <div className='register-content'>
        <h2>Registro de Usuario</h2>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <form onSubmit={enviarFormulario} className='register-form'>
          <div className='registerform-group'>
            <label htmlFor="nombre">Nombre:</label>
            <input
              type="text"
              id="nombre"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              required
              className="registerform-input"
            />
          </div>
          <div className='registerform-group'>
            <label htmlFor="apellido">Apellido:</label>
            <input
              type="text"
              id="apellido"
              value={apellido}
              onChange={(e) => setApellido(e.target.value)}
              required
              className="registerform-input"
            />
          </div>
          <div className='registerform-group'>
            <label htmlFor="email">Correo:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="registerform-input"
            />
          </div>
          <div className='registerform-group'>
            <label htmlFor="password">Contraseña:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="registerform-input"
            />
          </div>
          <button type="submit" className='register-button'>Registrarse</button>
        </form>
        <p className="register-link-text">
          ¿Ya tienes cuenta? <Link to="/" className="register-link">Inicia sesión aquí</Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterView;