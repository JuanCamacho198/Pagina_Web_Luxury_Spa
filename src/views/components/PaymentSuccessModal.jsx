// src/components/PaymentSuccessModal.jsx

import styles from '../../styles/PaymentSuccessModal.module.css'; // Crea este archivo CSS

export default function PaymentSuccessModal({ show, onClose, totalAmount }) {
  if (!show) {
    return null;
  }

  return (
    <div className={styles['modal-overlay']}>
      <div className={styles['modal-content']}>
        <button className={styles['modal-close-button']} onClick={onClose}>&times;</button>
        <h2>¡Pago Confirmado!</h2>
        <p>Tu pago por <strong className={styles.highlight}>{totalAmount} COL</strong> ha sido procesado exitosamente.</p>
        <p>Recibirás una confirmación en tu correo electrónico con los detalles de tu agendamiento.</p>
        <div className={styles['modal-actions']}>
          <button className={`${styles.btn} ${styles['btn-primary']}`} onClick={onClose}>Entendido</button>
        </div>
      </div>
    </div>
  );
}