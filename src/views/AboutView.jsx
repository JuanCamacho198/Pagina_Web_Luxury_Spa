import React from 'react';
import './../styles/AboutView.css';

export default function AboutView() {
  return (
    <div className="about-container">
      <div className="about-banner">
        <h1>¿Quiénes Somos?</h1>
        <p>
          En <strong>Luxury Spa</strong>, nos dedicamos a ofrecer un servicio integral de calidad en relajación, vitalidad,
          belleza y salud, priorizando la satisfacción del cliente a través de una atención personalizada y eficiente.
          <br /><br />
          Nuestra visión es ser reconocidos como uno de los mejores spas en Medellín, destacando por nuestro compromiso
          con la calidad y la mejora continua. Nos regimos por valores de compromiso, calidad, asistencia personalizada
          y confianza, buscando siempre superar las expectativas de nuestros clientes y promover su bienestar
          físico y emocional.
        </p>
        <a href="/contacto" className="btn">Contáctanos</a>
      </div>
    </div>
  );
}
