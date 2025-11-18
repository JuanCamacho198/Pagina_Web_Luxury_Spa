// src/views/HomeView.jsx
import {useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import Footer from '../components/Footer';
import { fetchServices } from '../../models/servicesModel';
import styles from '../../styles/HomeView.module.css';

//inicio
function HomeView() {
  const navigate = useNavigate();
  const [activeIndex, setActiveIndex] = useState(0);
  const totalImages = 3;
  const [services, setServices] = useState([]);


  useEffect(() => {
  async function loadServices() {
    const data = await fetchServices();
    setServices(data);
  }
    loadServices();
  }, []);

  useEffect(() => {
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
    <div className={styles['home-container']}>

      <section className={styles['hero-section']}>
        <div className={styles['hero-text']}>
          <h1>¡Bienvenido a Luxury Spa!</h1>
          <h2>Un oasis de relajación en Medellín</h2>
          <p>Descubre una experiencia única de bienestar y belleza. Reserva hoy y consiéntete como nunca antes.</p>
          <div className={styles['hero-buttons']}>
            <button className={styles['primary-btn']}>Conócenos</button>
            <button className={styles['secondary-btn']}>Ver Servicios</button>
          </div>
        </div>
        <div className={styles['hero-image']}></div>
      </section>

      <section className={styles['info-section']}>
        <h3>¿Por qué elegirnos?</h3>
        <p>En Luxury Spa nos dedicamos a ofrecer tratamientos de alta calidad que revitalizan cuerpo, mente y espíritu, en un ambiente de completa tranquilidad.</p>
      </section>

      <section className={styles['carousel-section']}>
        <div className={styles['carousel-container']}>
          <div className={styles['carousel-images']}>
            {[1, 2, 3].map((index) => (
              <img
                key={index}
                src={`/assets/carrusel${index}.jpg`}
                alt={`Imagen ${index}`}
                className={styles['carousel-image']}
                style={{ transform: `translateX(calc(-100% * ${activeIndex}))` }}
              />
            ))}
          </div>
          <button className={styles['carousel-btn']} onClick={handlePrev}>{'<'}</button>
          <button className={styles['carousel-btn']} onClick={handleNext}>{'>'}</button>
        </div>
      </section>

      <section className={styles['recommended-section']}>
        <h3>Productos Destacados</h3>
        <div className={styles['recommended-services-list']}>
          {services.slice(0, 3).map((s) => (
            <div
              key={s.id}
              className={styles['recommended-service-card']}
              onClick={() => navigate(`/servicio/${s.id}`)}
            >
              {s.imagenURL && (
                <img
                  src={s.imagenURL}
                  alt={s.Nombre}
                  className={styles['recommended-service-image']}
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
