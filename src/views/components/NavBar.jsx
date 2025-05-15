import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '../../firebase/firebaseConfig';
import { FiSettings } from 'react-icons/fi';
import { useCart } from './CartContext';
import '../../styles/NavBar.css';

export default function NavBar({ user }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { cartCount } = useCart();

  const handleLogout = async () => {
    await signOut(auth);
    navigate('/', { replace: true });
  };

  // Función para navegar a la página del carrito
  const goToCart = () => {
    navigate('/carrito');
  };


  return (
    <nav className="navbar">
      {/* IZQUIERDA */}
      <div className="nav-left">
        <Link to="/" className="nav-logo-text">Luxury Spa</Link>
      </div>

      {/* CENTRO: público vs. privado */}
      <div className="nav-center">
        {!user ? (
          <>
            <Link to="/services" className="nav-link">Servicios</Link>
            <Link to="/sobre-nosotros" className="nav-link">Sobre Nosotros</Link>
            <Link to="/contact"  className="nav-link">Contacto</Link>
            
          </>
        ) : (
          <>
            <Link to="/services" className="nav-link">Servicios</Link>
            <Link to="/contact" className="nav-link">Contacto</Link>
            <Link to="/citas"    className="nav-link">Citas</Link>
          </>
        )}
      </div>

      {/* DERECHA */}
      <div className="nav-right">
        {!user ? (
          <>
            <Link to="/login"    className="nav-btn nav-btn-login">Iniciar Sesión</Link>
            <Link to="/register" className="nav-btn nav-btn-register">Registrarse</Link>
          </>
        ) : (
          <>
            {/* --- Botón/Ícono del Carrito (para usuarios autenticados) --- */}
            <button
              className="cart-icon-button" // Clase para estilizar (usarás en tu NavBar.css)
              onClick={goToCart}
              aria-label={`Carrito con ${cartCount} ítems`} // Buena práctica de accesibilidad
              style={{ position: 'relative', background: 'none', border: 'none', cursor: 'pointer', color: 'inherit' }} // Estilos básicos para que se vea como parte de la navbar
            >
               🛒
               {cartCount > 0 && (
                 <span
                   className="cart-count-badge"
                   style={{
                   }}
                 >
                   {cartCount}
                 </span>
               )}
            </button>

            {/* Botón de configuración */}
            <button className="settings-btn" onClick={() => setMenuOpen(o => !o)}>
              <FiSettings size={24} /> {/* Usas react-icons, esto está bien */}
            </button>

            {/* Menú desplegable de configuración */}
            {menuOpen && (
              <div className="settings-menu"> {/* Asegúrate que settings-menu esté posicionado correctamente (absolute/relative) */}
                <Link to="/profile" onClick={() => setMenuOpen(false)}>Editar Perfil</Link>
                <button onClick={handleLogout}>Cerrar Sesión</button>
              </div>
            )}
          </>
        )}
      </div>
    </nav>
  );
}