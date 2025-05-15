import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../styles/PaymentView.css';

export default function PaymentView() {
  const location = useLocation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // --- Obtener los datos exactos pasados desde la navegación ---
  // Esperamos appointmentIds (ARRAY), totalAmount (NUMERO) y schedulingDetails (OBJETO)
  const { appointmentIds, totalAmount, schedulingDetails } = location.state || {};


  useEffect(() => {
    // Verificar que tenemos los datos necesarios (al menos los IDs y el total)
    // appointmentIds debe ser un array y tener al menos un elemento
    // totalAmount debe ser un número
    if (!appointmentIds || !Array.isArray(appointmentIds) || appointmentIds.length === 0 || totalAmount === undefined || totalAmount === null) {
      console.error("PaymentView: No se recibió la información de pago o agendamiento necesaria.");
      setError("No se pudo procesar el pago. Información de la orden incompleta.");
      setLoading(false);
    }

    console.log("Página de Pago cargada.");
    console.log("IDs de Citas a Pagar:", appointmentIds);
    console.log("Monto Total:", totalAmount);
    console.log("Detalles de Agendamiento (pasados):", schedulingDetails);


    // --- SIMULACIÓN DE CARGA O INICIALIZACIÓN DE PASARELA (eliminar en prod) ---

    const simulateInitialization = setTimeout(() => {
        setLoading(false);
        console.log("Simulación: Pasarela de pago inicializada.");
    }, 1000);

    // Limpiar el timeout si el componente se desmonta
    return () => clearTimeout(simulateInitialization);

  }, [appointmentIds, totalAmount, schedulingDetails, navigate]); // Dependencias del efecto


  // --- Lógica para PROCESAR EL PAGO CUANDO EL USUARIO INTERACTÚA (Requiere BACKEND SEGURO) ---

  const handlePaymentSubmit = async () => {
    setError(''); // Limpiar errores previos de pago
    console.log("Simulando proceso de confirmación de pago...");

     try {
           alert("¡Pago exitoso!"); // Mensaje al usuario
           // Redirigir a la página de confirmación final
           navigate('/confirmacion-pago', { state: { appointmentIds, totalAmount, schedulingDetails, paymentStatus: 'success' } }); // Pasa datos a la página de confirmación

     } catch (paymentProcessError) {
         // Si falla la comunicación con tu backend o la confirmación del pago
         console.error("Error durante el proceso de confirmación de pago:", paymentProcessError);
         setError(`Error al procesar el pago: ${paymentProcessError.message || 'Inténtalo de nuevo.'}`);
     } finally {
     }
  };


  // --- Renderizado del componente ---

  // Si está cargando (inicializando pasarela)
  if (loading) return <p className="loading">Cargando página de pago…</p>;

  // Si hay un error (datos incompletos o error de inicialización)
  if (error) return <p className="error">{error}</p>;

  // Si no hay datos necesarios (debería ser capturado por el error, pero como fallback)
  if (!appointmentIds || !Array.isArray(appointmentIds) || appointmentIds.length === 0 || totalAmount === undefined || totalAmount === null) {
       return <p className="error">Información de la orden no disponible. Por favor, intenta de nuevo desde el carrito o servicios.</p>;
  }


  // Si todo está bien, renderiza el contenido de la página de pago
  return (
    <div className="payment-page">
      <h1>Confirmar y Pagar</h1>

      <div className="payment-summary">
          <h2>Resumen del Pedido</h2>
          <p><strong>Número de servicios:</strong> {appointmentIds.length}</p>
          <p><strong>Monto Total a Pagar:</strong> {totalAmount.toFixed(2)} USD</p>
      </div>

      <div className="payment-form-container">
          <h2>Método de Pago</h2>
          <div id="payment-element" style={{ border: '1px dashed #ccc', padding: '30px', minHeight: '150px', textAlign: 'center', marginBottom: '20px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>

             <p style={{ color: '#777', fontStyle: 'italic' }}> [ Espacio para el formulario seguro de la pasarela de pago ] </p>
             <p style={{ color: '#777', fontStyle: 'italic', fontSize: '0.9rem' }}> (Integración con Stripe, Mercado Pago Checkout Pro, etc. - Requiere Backend) </p>
          </div>
          <button className="btn btn-primary" onClick={handlePaymentSubmit} style={{ width: '100%' }}>
             Simular Pago Exitoso y Confirmar
          </button>
      </div>

      {/* Mostrar errores de pago si ocurren */}
      {error && <p className="error" style={{ marginTop: '1rem' }}>{error}</p>}
    </div>
  );
}