// src/views/ContactView.jsx

import Footer from '../components/Footer';
import styles from '../../styles/ContactView.module.css';

export default function ContactView() {
  return (
    <>
    <main className={styles['contact-container']}>
      <section className={styles.banner}>
        <div className={styles['banner-content']}>
          <h1>Contactanos</h1>
          <p>
            ¡Nos encanta asesorarlo! Si tiene alguna pregunta, no dude en comunicarse con nosotros a través de los diferentes medios
            de comunicación que tenemos disponible, ya sea por teléfono, WhatsApp o correo electrónico. Estamos aquí para atenderlo
            y nos esforzaremos por responder a todas sus consultas con gusto.
          </p>
          
          <p>Correo electrónico: <a href="mailto:info@luxuryspa.com">info@luxuryspa.com</a></p>
          <a href="https://wa.me/NUMERO_DE_WHATSAPP" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">
            <img src="/src/assets/whatsapp.svg" alt="WhatsApp" width="40px" /> 
          </a>
        </div>
        <div className={styles['banner-image']}>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d891.3024654937047!2d-75.56598343906558!3d6.208142145211063!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e442829c522fdb3%3A0x5abdd43099235c76!2sCra.%2036%20%238a-40%2C%20El%20Poblado%2C%20Medell%C3%ADn%2C%20El%20Poblado%2C%20Medell%C3%ADn%2C%20Antioquia!5e0!3m2!1ses-419!2sco!4v1727018084186!5m2!1ses-419!2sco"
            width="600"
            height="450"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Ubicación"
          ></iframe>
          <h3>Dirección: Cra. 36 #8a-40, Poblado, Medellín, Antioquia</h3>
        </div>
      </section>
    </main>
    <Footer />
    </>
  );
}
