// src/views/RegisterView.jsx
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { registroUsuario } from '../../controllers/authController';
import styles from '../../styles/RegisterView.module.css';

const RegisterView = () => {
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const enviarFormulario = async (evento) => {
    evento.preventDefault();
    setError('');
    try {
      await registroUsuario(nombre, apellido, email, password, navigate, setError);
    } catch (err) {
      setError(err.message || 'Error al registrar usuario');
    }
  };

  return (
    <div className={styles['register-container']}>
      <div className={styles['register-content']}>
        <h2>Registro de Usuario</h2>
        {error && <p style={{ color: 'red' }}>{error}</p>}

        <form onSubmit={enviarFormulario} className={styles['register-form']}>
          <div className={styles['registerform-group']}>
            <label htmlFor="nombre">Nombre:</label>
            <input
              type="text"
              id="nombre"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              required
              className={styles['registerform-input']}
            />
          </div>

          <div className={styles['registerform-group']}>
            <label htmlFor="apellido">Apellido:</label>
            <input
              type="text"
              id="apellido"
              value={apellido}
              onChange={(e) => setApellido(e.target.value)}
              required
              className={styles['registerform-input']}
            />
          </div>

          <div className={styles['registerform-group']}>
            <label htmlFor="email">Correo:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className={styles['registerform-input']}
            />
          </div>

          <div className={styles['registerform-group']}>
            <label htmlFor="password">Contraseña:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className={styles['registerform-input']}
            />
          </div>

          <button type="submit" className={styles['register-button']}>Registrarse</button>
        </form>

        <p className={styles['register-link-text']}>
          ¿Ya tienes cuenta? <Link to="/" className={styles['register-link']}>Inicia sesión aquí</Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterView;