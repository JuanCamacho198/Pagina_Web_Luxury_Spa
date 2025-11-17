// src/views/CancellationPolicyView.jsx
import React from 'react';
import Footer from './components/Footer';
import '../styles/PolicyView.css';


export default function CancellationPolicyView() {
  return (
    <>
      <main className="policy-container">
        <section className="policy-banner">
          <h1>Políticas de Cancelación y Reserva</h1>
          <h2>POLÍTICAS DE RESERVA, CANCELACIÓN Y DEVOLUCIÓN</h2>
          <h3>Estimado cliente, agradecemos que lea atentamente nuestras políticas para brindarle un mejor servicio.</h3>

          <h2>Facturación</h2>
          <p>
            Al comprar un servicio a través de cualquiera de nuestros canales (página web, WhatsApp, o presencial), deberá indicarnos si desea que la factura electrónica sea emitida a nombre del comprador o a nombre de un tercero (persona natural o jurídica).
            Si no se especifica, la factura se emitirá a nombre de la persona registrada en el canal de compra.
          </p>

          <h2>Pago con tarjeta de crédito</h2>
          <p>
            Para pagos con tarjeta de crédito, por favor adjunte su documento de identidad o pasaporte para validar la titularidad de la tarjeta.
          </p>

          <h2>Confirmación de reserva</h2>
          <p>
            La reserva será efectiva una vez se haya confirmado el pago mínimo del 50% del valor total del servicio.
            En promociones 2x1 vigentes, se debe cancelar el 100% del valor para confirmar la reserva.
          </p>

          <h2>Modificaciones y cancelaciones</h2>
          <p>Puede modificar o cancelar su reserva las veces que desee, siempre y cuando lo haga con al menos:</p>
          <ul>
            <li>24 horas hábiles de anticipación si la cita es de lunes a viernes (excepto festivos).</li>
            <li>48 horas de anticipación si la cita es en sábado, domingo o festivos.</li>
          </ul>
          <p>
            Cancelaciones realizadas con menos de este tiempo incurrirán en un cargo extra del 30% sobre el valor total del servicio, el cual deberá pagarse antes de reagendar.
            Cancelaciones con menos de 12 horas y hasta 3 horas antes del inicio generarán un cargo del 40% del valor total.
            En caso de no asistir (no show), se perderá el valor total pagado.
          </p>

          <h2>Devoluciones</h2>
          <p>
            Para rituales con precio especial o en oferta 2x1, no se realizan devoluciones en dinero, pero podrá reagendar su cita dentro de los siguientes 6 meses o recibir un bono virtual por el valor pagado.
            Para servicios con tarifa normal, las devoluciones están disponibles hasta 5 días después de la compra, con un cargo del 15% por procesamiento.
            Después de 5 días, no aplica devolución en dinero, pero podrá usar el servicio en un plazo de 6 meses o recibir un bono por el valor pagado.
          </p>
        </section>
      </main>
      <Footer />
    </>
  );
}
