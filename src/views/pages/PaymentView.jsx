// src/views/PaymentView.jsx
import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styles from '../../styles/PaymentView.module.css';
import PaymentSuccessModal from '../components/PaymentSuccessModal'; // Importa el modal

// --- IMPORTAR IMÁGENES DESDE ASSETS ---
import creditCardImage from '../../assets/epayco-pagos.png';
import pseImage from '../../assets/PSE.png';
import Nequi from '../../assets/Nequi.png'
import bancolombia from '../../assets/bancolombia.png'
// import nequiImage from '../assets/nequi.png';
// import bancolombiaAppImage from '../assets/bancolombia_app.png';

const AVAILABLE_PAYMENT_METHODS = [
  { id: 'credit_card', name: 'Tarjeta de Crédito/Débito', image: creditCardImage },
  { id: 'pse', name: 'PSE (Pagos Seguros en Línea)', image: pseImage },
  { id: 'nequi', name: 'Nequi', image: Nequi },
  { id: 'bancolombia_app', name: 'Bancolombia App', image: bancolombia },
];

export default function PaymentView() {
  const location = useLocation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('');
  const [showSuccessModal, setShowSuccessModal] = useState(false); // Nuevo estado para el modal

  const { appointmentIds, totalAmount, schedulingDetails } = location.state || {};

  useEffect(() => {
    if (!appointmentIds || !Array.isArray(appointmentIds) || appointmentIds.length === 0 || totalAmount === undefined || totalAmount === null) {
      console.error("PaymentView: No se recibió la información de pago o agendamiento necesaria.");
      setError("No se pudo procesar el pago. Información de la orden incompleta.");
      setLoading(false);
      return;
    }

    console.log("Página de Pago cargada.");
    console.log("IDs de Citas a Pagar:", appointmentIds);
    console.log("Monto Total:", totalAmount);
    console.log("Detalles de Agendamiento (pasados):", schedulingDetails);

    const simulateInitialization = setTimeout(() => {
      setLoading(false);
      console.log("Simulación: Pasarela de pago inicializada (o lista para seleccionar método).");
    }, 1000);

    return () => clearTimeout(simulateInitialization);
  }, [appointmentIds, totalAmount, schedulingDetails]);

  const handlePaymentMethodChange = (event) => {
    setSelectedPaymentMethod(event.target.value);
    setError('');
    console.log("Método de pago seleccionado:", event.target.value);
  };

  const handlePaymentSubmit = async () => {
    if (!selectedPaymentMethod) {
      setError("Por favor, selecciona un método de pago antes de continuar.");
      return;
    }

    setError('');
    console.log(`Simulando proceso de confirmación de pago con método: ${selectedPaymentMethod}...`);

    try {
      // En lugar de alert(), mostramos el modal
      // alert(`¡Pago exitoso con ${AVAILABLE_PAYMENT_METHODS.find(m => m.id === selectedPaymentMethod)?.name}!`);
      
      // Simular un tiempo de procesamiento para el pago
      setLoading(true); // Opcional: mostrar un spinner mientras se "procesa"
      await new Promise(resolve => setTimeout(resolve, 1500)); // Simula 1.5 segundos de procesamiento
      setLoading(false);

      setShowSuccessModal(true); // Muestra el modal de éxito

      // La navegación a la página de confirmación ahora ocurrirá cuando el usuario cierre el modal
    } catch (paymentProcessError) {
      console.error("Error durante el proceso de confirmación de pago:", paymentProcessError);
      setError(`Error al procesar el pago: ${paymentProcessError.message || 'Inténtalo de nuevo.'}`);
      setLoading(false); // Detener la carga si hay un error
    }
  };

  const handleCloseSuccessModal = () => {
    setShowSuccessModal(false); // Oculta el modal
    // Ahora navegamos a la página de confirmación después de cerrar el modal
    navigate('/confirmacion-pago', {
      state: {
        appointmentIds,
        totalAmount,
        schedulingDetails,
        paymentMethod: selectedPaymentMethod,
        paymentStatus: 'success',
      },
    });
  };


  if (loading) return <p className={styles.loading}>Cargando página de pago…</p>;

  if (!appointmentIds || !Array.isArray(appointmentIds) || appointmentIds.length === 0 || totalAmount === undefined || totalAmount === null) {
    return <p className={styles.error}>Información de la orden no disponible. Por favor, intenta de nuevo desde el carrito o servicios.</p>;
  }

    if (error && !selectedPaymentMethod && !loading) {
      return <p className={styles.error}>{error}</p>;
    }

  return (
    <div className={styles['payment-page']}>
      <h1>Confirmar y Pagar</h1>

      <div className={styles['payment-summary']}>
        <h2>Resumen del Pedido</h2>
        <p><strong>Número de Servicios ({appointmentIds.length})</strong></p>
        <p><strong>Total a Pagar:</strong> {totalAmount} COL</p>
      </div>

      <div className={styles['payment-methods-selection']}>
        <h2>Selecciona un Método de Pago</h2>
        <div className={styles['payment-methods-container']}>
          {AVAILABLE_PAYMENT_METHODS.map((method) => (
            <label
              key={method.id}
              htmlFor={method.id}
              className={`${styles['payment-method-option']} ${selectedPaymentMethod === method.id ? styles.selected : ''}`}
            >
              <input
                type="radio"
                id={method.id}
                name="paymentMethod"
                value={method.id}
                checked={selectedPaymentMethod === method.id}
                onChange={handlePaymentMethodChange}
                style={{ display: 'none' }}
              />
              <div className={styles['payment-method-content']}>
                <img src={method.image} alt={method.name} className={styles['payment-method-image']} />
                <span className={styles['payment-method-name']}>{method.name}</span>
              </div>
            </label>
          ))}
        </div>
      </div>

      {error && <p className={styles.error} style={{ marginTop: '1rem', color: 'red' }}>{error}</p>}

      <button
        className={`${styles.btn} ${styles['btn-primary']}`}
        onClick={handlePaymentSubmit}
        disabled={!selectedPaymentMethod || loading}
        style={{ width: '100%', marginTop: '1.5rem' }}
      >
        Pagar {totalAmount} COL
      </button>

      {/* Renderiza el Modal de éxito */}
      <PaymentSuccessModal
        show={showSuccessModal}
        onClose={handleCloseSuccessModal}
        totalAmount={totalAmount}
      />
    </div>
  );
}