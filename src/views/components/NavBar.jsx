// src/views/components/NavBar.jsx
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth, db } from '../../firebase/firebaseConfig';
import { FiSettings } from 'react-icons/fi';
import { collection, onSnapshot } from 'firebase/firestore'; 
import '../../styles/NavBar.css';

export default function NavBar({ user }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [cartItemCount, setCartItemCount] = useState(0);
  const navigate = useNavigate();

  //ítems del carrito en tiempo real desde Firestore
  useEffect(() => {
    if (user) {
      const cartRef = collection(db, 'Usuarios', user.uid, 'Carrito');
      const unsubscribe = onSnapshot(cartRef, (snapshot) => {
        setCartItemCount(snapshot.size); // Actualiza con la cantidad de items
      });

      return () => unsubscribe();
    } else {
      setCartItemCount(0); // Si no hay usuario, resetea el contador
    }
  }, [user]);

  const handleLogout = async () => {
    await signOut(auth);
    navigate('/', { replace: true });
  };

  const goToCart = () => {
    navigate('/carrito');
  };

  return (
    <nav className="navbar">
      <div className="nav-left">
        <Link to="/" className="nav-logo-text">Luxury Spa</Link>
      </div>

      <div className="nav-center">
        {!user ? (
          <>
            <Link to="/services" className="nav-link">Servicios</Link>
            <Link to="/sobre-nosotros" className="nav-link">Sobre Nosotros</Link>
            <Link to="/contact" className="nav-link">Contacto</Link>
          </>
        ) : (
          <>
            <Link to="/services" className="nav-link">Servicios</Link>
            <Link to="/contact" className="nav-link">Contacto</Link>
            <Link to="/citas" className="nav-link">Citas</Link>
          </>
        )}
      </div>

      <div className="nav-right">
        {!user ? (//vista para usario sin haber iniciado sesion
          <>
            <Link to="/login" className="nav-btn nav-btn-login">Iniciar Sesión</Link>
            <Link to="/register" className="nav-btn nav-btn-register">Registrarse</Link>
          </>
        ) : ( //vista para usario que ha iniciado sesion
          <>
            <button
              className="cart-icon-button"
              onClick={goToCart}
              aria-label={`Carrito con ${cartItemCount} ítems`}
              style={{ position: 'relative', background: 'none', border: 'none', cursor: 'pointer', color: 'inherit' }}
            >
              🛒
              {cartItemCount > 0 && (
                <span className="cart-count-badge">
                  {cartItemCount}
                </span>
              )}
            </button>

            <button className="settings-btn" onClick={() => setMenuOpen(o => !o)}>
              <FiSettings size={24} />
            </button>

            {menuOpen && (
              <div className="settings-menu">
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
