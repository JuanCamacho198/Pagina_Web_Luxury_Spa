import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/PublicHomeView.css';

export default function PublicHomeView() {
  return (
    <div className="public-home">
      {/* Banner principal */}
      <header className="banner">
        <div className="banner-content">
          <h1>¡Bienvenido a Luxury Spa!</h1>
          <h2>Spa exclusivo en Medellín</h2>
          <p>
            Sumérgete en un oasis de relajación y belleza. Experimenta
            tratamientos exclusivos diseñados para revitalizarte. ¡Reserva ahora
            y déjate consentir!
          </p>
          <div className="buttons">
            <Link to="/contacto" className="btn btn-primary">
              ¿Quieres Conocernos?
            </Link>
            <Link to="/servicios" className="btn btn-secondary">
              Ver Servicios
            </Link>
          </div>
        </div>
        <div className="banner-image">
          <img src="/src/assets/bannerSpa.avif" alt="Spa" />
        </div>
      </header>

      {/* Segundo bloque de información */}
      <section className="info-cards">
        <div className="caja">
          <img src="/src/assets/cinco.png" alt="Servicio" />
          <h3>Más de 5 años ofreciendo servicios</h3>
        </div>
        <div className="caja">
          <img src="/src/assets/ubicacion.png" alt="Ubicación" />
          <h3>Encuéntranos en Calle87c #23-52</h3>
        </div>
      </section>
    </div>
  );
}
