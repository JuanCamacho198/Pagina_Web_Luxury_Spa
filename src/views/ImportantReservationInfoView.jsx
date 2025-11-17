// src/views/ImportantReservationInfoView.jsx
import React from 'react';
import Footer from './components/Footer';
import '../styles/PolicyView.css';

export default function ImportantReservationInfoView() {
  return (
    <>
      <main className="policy-container">
        <section className="policy-banner">
          <h1>Información Importante para su Reserva</h1>
          <p>
            Si usted no es quien asiste, agradecemos hacer llegar esta información a <strong>TODAS</strong> las personas que asistirán.
          </p>
          <ul>
            <li>
              El Grupo Luxury Spa facilita el espacio de parqueadero gratuito, pero no se hace responsable por pérdidas materiales de objetos. Por favor, no deje objetos de valor en su vehículo.
            </li>
            <li>
              El Grupo Luxury Spa recomienda que para el disfrute óptimo de su servicio no es necesario asistir con objetos de valor a su reserva o cita, tales como cadenas, anillos, pulseras, etc., ya que estos interfieren con la correcta prestación del servicio. El servicio de casillero que se presta no tiene ningún costo. La empresa no se hace responsable por la pérdida de objetos personales.
            </li>
            <li>
              No asista con joyas que puedan extraviarse o dañarse con el aceite, con los chorros de agua del jacuzzi, piscina lúdica o zonas húmedas. No nos hacemos responsables del extravío de ningún tipo de joyas o accesorios.
            </li>
            <li>
              Asista con traje de baño. Traiga sandalias cómodas para su servicio.
            </li>
            <li>
              Asista 15 minutos antes. Por favor, tome medidas ya que algunos días el tráfico puede ser más congestionado.
            </li>
            <li>
              Verifique su sede. Recuerde que tenemos 2 sedes en El Poblado y debe llegar a la correcta, la elegida al reservar.
            </li>
            <li>
              El uso adecuado de la cristalería suministrada es responsabilidad de cada cliente. No nos hacemos responsables de la mala manipulación que pueda terminar en una autolesión como una cortadura al quebrar una copa o recipiente.
            </li>
            <li>
              El uso de su casillero es importante para garantizar el orden y cuidado de sus pertenencias. Por favor, úselo.
            </li>
            <li>
              No está permitido ingerir sustancias alucinógenas o cualquier tipo de drogas dentro del establecimiento.
            </li>
            <li>
              Evite manipular botones, perillas o similares que puedan provocar daños, ya que serán cargados a su cuenta (perilla de sauna, turco, etc.).
            </li>
            <li>
              Los elementos quebrados, como copas, vasos o platos, deberán ser repuestos y serán cargados a su cuenta. Por favor, haga buen uso de estos.
            </li>
            <li>
              No se permite desplazarse en las instalaciones sin su bata. Por favor, úsela.
            </li>
            <li>
              Esperamos su ayuda con la puntualidad, ya que esto garantiza que pueda disfrutar de todo su ritual.
            </li>
          </ul>
        </section>
      </main>
      <Footer />
    </>
  );
}
