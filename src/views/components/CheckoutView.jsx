import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { fetchServiceById } from '../../models/servicesModel';
import { addAppointment } from '../../models/citasModel';
import { useCart } from '../components/CartContext';
import '../../styles/CheckoutView.css';

export default function CheckoutView() {
  // --- Estado para los items a procesar ---
  const [itemsToCheckout, setItemsToCheckout] = useState([]);

  // --- Estado de la vista ---
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // --- Estado del formulario de agendamiento ---
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    preferredDate: '',
    preferredTime: '',
  });

  // --- Hooks de Router y Contexto ---
  const location = useLocation();
  const navigate = useNavigate();
  const { cartItems, clearCart, cartCount } = useCart();

  // Obtener el serviceId de los parámetros de la URL (para compra directa)
  const serviceIdFromUrl = new URLSearchParams(location.search).get('serviceId');


  // --- Efecto para determinar qué items cargar (compra directa vs. carrito) ---
  useEffect(() => {
    const processItems = async () => {
      setLoading(true);
      setError('');

      // --- Caso 1: Compra Directa (Hay un serviceId en la URL) ---
      if (serviceIdFromUrl) {
        console.log("Checkout: Detectado flujo de compra directa para ID:", serviceIdFromUrl);
        try {
          const singleService = await fetchServiceById(serviceIdFromUrl);
          if (singleService) {
            setItemsToCheckout([singleService]);
            console.log("Checkout: Servicio individual cargado correctamente.");
          } else {
            setError("Error: El servicio para compra directa no fue encontrado o el ID es inválido.");
             setItemsToCheckout([]);
             console.error("Checkout: Service ID from URL not found.");
          }
        } catch (err) {
          console.error("Error cargando servicio para compra directa:", err);
          setError("Error al cargar los detalles del servicio para la compra directa.");
          setItemsToCheckout([]);
        } finally {
          setLoading(false);
        }
      }
      // --- Caso 2: Compra Desde el Carrito (NO hay serviceId en la URL) ---
      else {
        console.log("Checkout: Detectado flujo de compra desde el carrito.");
        if (cartCount === 0) {
          setError("Tu carrito está vacío. Añade servicios antes de proceder al pago.");
          setItemsToCheckout([]);
           console.warn("Checkout: Carrito vacío al llegar a la página de checkout desde el carrito.");
          // Opcional: redirigir de vuelta al carrito si está vacío
          // navigate('/carrito', { replace: true });
        } else {
          setItemsToCheckout(cartItems);
          console.log("Checkout: Usando ítems del carrito para procesar.");
        }
        setLoading(false);
      }
    };

    // Disparamos el proceso de carga/determinación de ítems
    // Se ejecutará cuando cambie serviceIdFromUrl, cartItems o cartCount
     // Solo disparamos si hay serviceIdFromUrl o si el carrito tiene items.
     // Si llegas aquí sin ID y con carrito vacío, el error se seteará dentro.
     if (serviceIdFromUrl || cartCount > 0) {
         processItems();
     } else {
         // Si no hay serviceId y el carrito está vacío al montar
         setError("No hay servicios para procesar. Tu carrito está vacío.");
         setLoading(false); // Ya está "cargado" con items vacíos
         console.warn("Checkout: Página cargada sin items válidos.");
         // navigate('/carrito', { replace: true }); // Redirigir inmediatamente si es necesario
     }


    // Función de limpieza
    return () => {
        setError('');
    };

  }, [serviceIdFromUrl, cartItems, cartCount, navigate]); // Dependencias

   // Calcular el total
   const total = itemsToCheckout.reduce((sum, item) => sum + parseFloat(item?.Precio || 0), 0);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Manejar el envío del formulario (Agendamiento y Simulación de Pago)
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);

    // --- Validaciones ---
    if (!formData.name || !formData.email || !formData.preferredDate) {
        setError("Por favor, completa todos los campos de agendamiento requeridos (Nombre, Email, Fecha).");
        setIsSubmitting(false);
        return;
    }

    if (itemsToCheckout.length === 0) {
         setError("No hay servicios válidos para procesar en este momento.");
         setIsSubmitting(false);
         return;
    }


    // --- Lógica para GUARDAR CITA(S) y (placeholder de) PROCESAR PAGO ---

    try {
      const savedAppointmentIds = [];

      console.log("Guardando cita(s) en Firestore...");
      for (const item of itemsToCheckout) {
         const appointmentDataToSave = {
             serviceId: item.id,
             serviceName: item.Nombre,
             servicePrice: item.Precio,
             userName: formData.name,
             userEmail: formData.email,
             userPhone: formData.phone,
             appointmentDate: formData.preferredDate,
             appointmentTime: formData.preferredTime,
             status: 'Pending Payment',
             // userId: auth.currentUser?.uid,
             createdAt: new Date()
         };
         const newAppointmentId = await addAppointment(appointmentDataToSave);
         savedAppointmentIds.push(newAppointmentId);
         console.log(`Cita para "${item.Nombre}" (pendiente de pago) guardada con ID:`, newAppointmentId);
      }

      console.log("Todos los agendamientos pre-guardados con IDs:", savedAppointmentIds);


      // 2. LIMPIAR EL CARRITO
      if (!serviceIdFromUrl) {
         clearCart();
         console.log("Carrito vaciado tras pre-agendamiento.");
      }


      // 3. REDIRIGIR a la página de pago
      console.log("Redirigiendo a la página de pago...");
      navigate('/pago', {
        state: {
          appointmentIds: savedAppointmentIds,
          totalAmount: total,
          schedulingDetails: formData
        }
      });

    } catch (submitError) {
      console.error("Error al procesar el agendamiento/orden:", submitError);
      setError(`Hubo un error al procesar la compra: ${submitError.message || 'Inténtalo de nuevo.'}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Muestra mensajes de estado (carga, error, enviando, vacío)
  if (error && !isSubmitting) return <p className="error">{error}</p>;

  if (itemsToCheckout.length === 0 && !loading && !isSubmitting && !error) {
       return <p className="info">No hay servicios válidos para procesar en este momento. Por favor, añade servicios para comprar.</p>;
  }

  if (loading) return <p className="loading">Cargando detalles del servicio…</p>;

  if (isSubmitting) return <p className="loading">Procesando compra...</p>;

  return (
    <div className="checkout-page">
      <h1>Completar Compra ({itemsToCheckout.length} {itemsToCheckout.length === 1 ? 'servicio' : 'servicios'})</h1>
      <div className="checkout-content">

        {/* Resumen de los items que se van a procesar (Columna Izquierda) */}
        <div className="checkout-summary">
            <h2>Resumen del Pedido</h2>
            {itemsToCheckout.map(item => (
                 <div key={item?.id || `item-${Math.random()}`} className="summary-item">
                    {item?.imageFileName && <img src={`/assets/${item.imageFileName}`} alt={item.Nombre} style={{ width: '50px', height: '50px', objectFit: 'cover', borderRadius: '4px', marginRight: '10px' }} />}
                    <span>{item?.Nombre || 'Servicio Desconocido'}</span>
                    <span style={{ float: 'right' }}>{item?.Precio || 'N/A'} COL</span>
                 </div>
            ))}
            {/* Línea separadora y total */}
            <div style={{ borderTop: '1px solid #eee', marginTop: '10px', paddingTop: '10px', fontWeight: 'bold' }}>
                Total: <span style={{ float: 'right' }}>{total} COL</span>
            </div>
        </div>

        {/* Formulario de Agendamiento (Columna Derecha) */}
        <form className="scheduling-form" onSubmit={handleSubmit}>
          <h2>Datos de Agendamiento</h2>
           <div className="form-row">
              <div className="form-group">
                <label htmlFor="email">Email:</label>
                <input type="email" id="email" name="email" value={formData.email} onChange={handleInputChange} required disabled={isSubmitting} />
              </div>
              <div className="form-group">
                <label htmlFor="phone">Teléfono:</label>
                <input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleInputChange} disabled={isSubmitting} />
              </div>
           </div>

           <div className="form-row">
              <div className="form-group">
                <label htmlFor="preferredDate">Fecha Preferida para los servicios:</label>
                <input type="date" id="preferredDate" name="preferredDate" value={formData.preferredDate} onChange={handleInputChange} required disabled={isSubmitting} />
              </div>
               <div className="form-group">
                <label htmlFor="preferredTime">Hora Preferida para los servicios:</label>
                <input type="time" id="preferredTime" name="preferredTime" value={formData.preferredTime} onChange={handleInputChange} disabled={isSubmitting} />
              </div>
           </div>

           {/* Campos que van en su propia fila completa */}
            <div className="form-group">
              <label htmlFor="name">Nombre Completo:</label>
              <input type="text" id="name" name="name" value={formData.name} onChange={handleInputChange} required disabled={isSubmitting} />
            </div>

          {/* Botón de Envío del Formulario (con estilos de la imagen) */}
          <button type="submit" className="btn btn-primary" disabled={isSubmitting || itemsToCheckout.length === 0}>
            {isSubmitting ? 'Procesando...' : `Agendar y Proceder al Pago (${total} COP)`} {/* Texto y formato del botón de la imagen */}
          </button>
           {error && !isSubmitting && <p className="error">{error}</p>}

        </form>
      </div>

    </div>
  );
}