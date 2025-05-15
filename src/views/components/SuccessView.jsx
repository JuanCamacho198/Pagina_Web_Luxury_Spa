import React from 'react';
import '../../styles/SuccessView.css';

export default function SuccessView() {

  return (
    <div className="success-page">
      <h1>¡Agendamiento y Pago Confirmados!</h1>
      <p>Tu cita ha sido agendada exitosamente y el pago ha sido procesado.</p>
      <p>Gracias por tu compra.</p>

      <p><a href="/citas">Ver mis citas agendadas</a></p>
      <p><a href="/">Volver a la página principal</a></p>
    </div>
  );
}