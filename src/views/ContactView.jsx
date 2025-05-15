import React from 'react';
import '../styles/ContactView.css';

export default function ContactView() {
  return (
    <main className="contact-container">
      <section className="banner">
        <div className="banner-content">
          <h1>Contáctanos</h1>
          <p>¡Nos encanta asesorarlo! Si tiene alguna pregunta, no dude en comunicarse con nosotros a través de los diferentes medios de comunicación disponibles.</p>
          <p>Dirección: Cra. 36 #8a-40, Poblado, Medellín, Antioquia</p>
          <p>Correo electrónico: info@luxuryspa.com</p>
          <a href="#reservas">
            <img src="/imagenes/whatsapp.svg" alt="WhatsApp" width="40px" />
          </a>
        </div>
        <div className="banner-image">
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
        </div>
      </section>
    </main>
  );
}
