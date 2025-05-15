import React from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebase/firebaseConfig';
import { signOut } from 'firebase/auth';
import Footer from './components/Footer';
import '../styles/HomeView.css';
import '../styles/footer.css'

function HomeView() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/');
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  };

  return (
    <div className='home-container'>

      <section className="hero-section">
        <div className="hero-text">
          <h1>¡Bienvenido a Luxury Spa!</h1>
          <h2>Un oasis de relajación en Medellín</h2>
          <p>Descubre una experiencia única de bienestar y belleza. Reserva hoy y consiéntete como nunca antes.</p>
          <div className="hero-buttons">
            <button className="primary-btn">Conócenos</button>
            <button className="secondary-btn">Ver Servicios</button>
          </div>
        </div>
        <div className="hero-image"></div>
      </section>

      <section className="info-section">
        <h3>¿Por qué elegirnos?</h3>
        <p>En Luxury Spa nos dedicamos a ofrecer tratamientos de alta calidad que revitalizan cuerpo, mente y espíritu, en un ambiente de completa tranquilidad.</p>
      </section>

      <Footer />
    </div>
  );
}

export default HomeView;
