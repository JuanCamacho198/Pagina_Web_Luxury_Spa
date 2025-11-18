// src/views/PublicHomeViewView.jsx

import Footer from '../components/Footer';
import { Link } from 'react-router-dom';
import styles from '../../styles/PublicHomeView.module.css';

export default function PublicHomeView() {
  return (
    <>
    <div className={styles['public-home']}>
      {/* Banner principal */}
      <header className={styles.banner}>
        <div className={styles['banner-content']}>
          <h1>¡Bienvenido a Luxury Spa!</h1>
          <h2>Spa exclusivo en Medellín</h2>
          <p>
            Sumérgete en un oasis de relajación y belleza. Experimenta
            tratamientos exclusivos diseñados para revitalizarte. ¡Reserva ahora
            y déjate consentir!
          </p>
          <div className={styles.buttons}>
            <Link to="/contacto" className={`${styles.btn} ${styles['btn-primaryP']}`}>
              ¿Quieres Conocernos?
            </Link>
            <Link to="/servicios" className={`${styles.btn} ${styles['btn-secondary']}`}>
              Ver Servicios
            </Link>
          </div>
        </div>
        <div className={styles['banner-image']}>
          <img src="/src/assets/bannerSpa.avif" alt="Spa" />
        </div>
      </header>

      {/* Segundo bloque de información */}
      <section className={styles['info-cards']}>
        <div className={styles.caja}>
          
          <h3>Más de 5 años ofreciendo servicios</h3>
        </div>
        <div className={styles.caja}>
          
          <h3>Encuéntranos en Calle87c #23-52</h3>
        </div>
      </section>
      
    </div>
    <Footer />
    </>
  );
}
