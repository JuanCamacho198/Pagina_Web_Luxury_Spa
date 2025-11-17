// src/views/HomeView.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Footer from './components/Footer';
import { fetchServices } from '../models/servicesModel';
import '../styles/HomeView.css';
import '../styles/footer.css'

//inicio
function HomeView() {
  const navigate = useNavigate();
  const [activeIndex, setActiveIndex] = React.useState(0);
  const totalImages = 3;
  const [services, setServices] = React.useState([]);


  React.useEffect(() => {
  async function loadServices() {
    const data = await fetchServices();
    setServices(data);
  }
    loadServices();
  }, []);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % totalImages);
    }, 4000); // Cambia cada 4 segundos

    return () => clearInterval(interval);
  }, []);

  const handlePrev = () => {
    setActiveIndex((prevIndex) => (prevIndex - 1 + totalImages) % totalImages);
  };

  const handleNext = () => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % totalImages);
  };

  return (
    <>
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

      <section className="carousel-section">
        <div className="carousel-container">
          <div className="carousel-images">
            {[1, 2, 3].map((index) => (
              <img
                key={index}
                src={`/assets/carrusel${index}.jpg`}
                alt={`Imagen ${index}`}
                className="carousel-image"
                style={{ transform: `translateX(calc(-100% * ${activeIndex}))` }}
              />
            ))}
          </div>
          <button className="carousel-btn prev-btn" onClick={handlePrev}>&lt;</button>
          <button className="carousel-btn next-btn" onClick={handleNext}>&gt;</button>
        </div>
      </section>

      <section className="recommended-section">
        <h3>Productos Destacados</h3>
        <div className="recommended-services-list">
          {services.slice(0, 3).map((s) => (
            <div
              key={s.id}
              className="recommended-service-card"
              onClick={() => navigate(`/servicio/${s.id}`)}
            >
              {s.imagenURL && (
                <img
                  src={s.imagenURL}
                  alt={s.Nombre}
                  className="recommended-service-image"
                />
              )}
              <h4>{s.Nombre}</h4>
              <p>
                {typeof s.Precio === 'number'
                  ? s.Precio.toLocaleString('es-CO', {
                      style: 'currency',
                      currency: 'COP',
                      minimumFractionDigits: 0,
                    })
                  : 'Precio no disponible'}
              </p>
            </div>
          ))}

        </div>
      </section>


      
    </div>
    <Footer />
    </>
  );
}

export default HomeView;
