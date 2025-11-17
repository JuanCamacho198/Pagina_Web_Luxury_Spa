// src/views/LoginView.jsx
import { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from '../styles/LoginView.module.css';

const LoginView = ({ onLogin, error }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin(email, password);
  };

  return (
    <div className = {styles['login-container']}>
      <div className={styles['login-content']}> 
        <h2>Iniciar Sesión</h2>
        {error && <p className={styles['error-message']}>{"Contraseña Incorrecta"}</p>}
        <form onSubmit={handleSubmit} className={styles['login-form']}>
          <div className={styles['loginform-group']}>
            <label htmlFor="email">Correo:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className={styles['loginform-input']}
            />
          </div>
          <div className={styles['loginform-group']}>
            <label htmlFor="password">Contraseña:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className={styles['loginform-input']}
            />
          </div>
          <button type="submit" className={styles['login-button']}>Iniciar Sesión</button>
        </form>
        <p className={styles['lregister-link-text']}>
          ¿No tienes cuenta? <Link to="/register" className={styles['lregister-link']}>Regístrate aquí</Link>
        </p>
      </div>
    </div>
  );
};

export default LoginView;