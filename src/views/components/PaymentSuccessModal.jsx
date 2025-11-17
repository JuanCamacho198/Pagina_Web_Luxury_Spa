// src/components/PaymentSuccessModal.jsx
import React from 'react';
import '../../styles/PaymentSuccessModal.css'; // Crea este archivo CSS

export default function PaymentSuccessModal({ show, onClose, totalAmount }) {
  if (!show) {
    return null;
  }

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="modal-close-button" onClick={onClose}>&times;</button>
        <h2>¡Pago Confirmado!</h2>
        <p>Tu pago por <strong className="highlight">{totalAmount} COL</strong> ha sido procesado exitosamente.</p>
        <p>Recibirás una confirmación en tu correo electrónico con los detalles de tu agendamiento.</p>
        <div className="modal-actions">
          <button className="btn-primary" onClick={onClose}>Entendido</button>
        </div>
      </div>
    </div>
  );
}