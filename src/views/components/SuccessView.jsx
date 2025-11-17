import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../../styles/SuccessView.css';
import { FaCheckCircle } from 'react-icons/fa'; // Importa un icono de "check"

// Si no tienes react-icons instalado, puedes instalarlo:
// npm install react-icons

export default function SuccessView() {
  const location = useLocation();
  const navigate = useNavigate();

  // Recupera los detalles del estado de la navegación
  const {
    appointmentIds,
    totalAmount,
    schedulingDetails,
    paymentMethod,
    paymentStatus // Aunque en este caso siempre será 'success'
  } = location.state || {};

  // Opcional: Redirigir si no hay datos (ej. si acceden directamente a la URL)
  useEffect(() => {
    if (!appointmentIds || !Array.isArray(appointmentIds) || appointmentIds.length === 0) {
      console.warn("SuccessView: No se recibieron IDs de citas. Redirigiendo a inicio.");
      // navigate('/'); // O a una página de error, según la lógica de tu app
    }
  }, [appointmentIds, navigate]);

  // Formatear el método de pago para que sea más legible
  const getPaymentMethodName = (id) => {
    switch (id) {
      case 'credit_card': return 'Tarjeta de Crédito/Débito';
      case 'pse': return 'PSE (Pagos Seguros en Línea)';
      case 'nequi': return 'Nequi';
      case 'bancolombia_app': return 'Bancolombia App';
      default: return 'Método de Pago Desconocido';
    }
  };

  return (
    <div className="success-page">
      <div className="success-icon-container">
        <FaCheckCircle className="success-icon" /> {/* Icono de éxito */}
      </div>
      <h1>¡Agendamiento y Pago Confirmados!</h1>

      <div className="success-details">
        <p>Tu cita ha sido agendada exitosamente y el pago ha sido procesado.</p>
        
        {totalAmount && (
          <p><strong>Monto Total Pagado:</strong> <span className="highlight-amount">{totalAmount} COL</span></p>
        )}
        {paymentMethod && (
          <p><strong>Método de Pago:</strong> {getPaymentMethodName(paymentMethod)}</p>
        )}
        {appointmentIds && appointmentIds.length > 0 && (
          <p><strong>Número de Servicios:</strong> {appointmentIds.length}</p>
        )}
        {/* Aquí podrías añadir más detalles de schedulingDetails si los necesitas mostrar */}
      </div>

      <p className="thank-you-message">Gracias por tu compra.</p>

      <div className="success-actions">
        <a href="/citas" className="btn btn-secondary">Ver mis citas agendadas</a>
        <a href="/" className="btn btn-primary">Volver a la página principal</a>
      </div>
    </div>
  );
}