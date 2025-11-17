// src/views/components/CheckoutView.jsx
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { fetchServiceById } from '../../models/servicesModel';
import { addAppointment } from '../../models/citasModel';
import { useCart } from '../../context/CartContext';
import { useMemo } from 'react';
import styles from '../../styles/CheckoutView.module.css';
import TimePicker from './TimePicker';

export default function CheckoutView() {
  
  const [itemsToCheckout, setItemsToCheckout] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [dateError, setDateError] = useState('');
  const [durationMinutes, setDurationMinutes] = useState(60); //default 60 mins
  const today = new Date();
  const minDate = today.toISOString().split('T')[0]; // fecha actual en formato 'AAAA-MM-DD'

  const maxDateObj = new Date();
  maxDateObj.setDate(today.getDate() + 30);//30 dias despues maximo para agendar
  const maxDate = maxDateObj.toISOString().split('T')[0];

  const [formData, setFormData] = useState({
    name: '',
    lastName: '',
    email: '',
    phone: '',
    userCC: '',
    preferredDate: '',
    preferredTime: '',
    notes: '',
  });

  const location = useLocation();
  const navigate = useNavigate();
  const { cartItems, clearCart, loadCartFromFirestore  } = useCart();
  const serviceIdFromUrl = new URLSearchParams(location.search).get('serviceId');

  // Agrupa items con cantidad para resumen pedido
  const groupedItems = useMemo(() => {
  return itemsToCheckout.reduce((acc, item) => {
    const existing = acc.find(i => i.serviceId === item.serviceId);

    if (existing) {
      existing.cantidad += 1;
    } else {
      acc.push({
        ...item,
        cantidad: 1,
        serviceId: item.serviceId || item.id
      });
    }

    return acc;
  }, []);
}, [itemsToCheckout]);

  useEffect(() => {
    const processItems = async () => {
    setLoading(true);
    setError('');
    
    try {
      //si le da al boton comprar ahora en ServiciosDetalle
      if (serviceIdFromUrl) {
        const singleService = await fetchServiceById(serviceIdFromUrl);
        if (singleService) {
          singleService.imageFileName = singleService.imagenURL;
          setItemsToCheckout([singleService]);
          setDurationMinutes(singleService.Duracion || 60); 
        } else {
          setError("El servicio no fue encontrado.");
          setItemsToCheckout([]);
        }
        return;
      } else {
        await loadCartFromFirestore(); //si hay elementos en el carrito
        if (cartItems.length > 0) {
          setItemsToCheckout(cartItems);
          setDurationMinutes(cartItems[0]?.Duracion || 60);
        } else {
          setError("Tu carrito está vacío.");
        }
      }
    } catch (err) {
      console.error("Error al cargar servicios:", err);
      setError("Error al cargar los servicios.");
      setItemsToCheckout([]);
    } finally {
      setLoading(false);
    }
  };

  processItems();

  return () => {
    setError('');
  };
  }, [serviceIdFromUrl]);

  useEffect(() => {//si no hay elementos
    if (!serviceIdFromUrl && cartItems.length === 0) {
      setItemsToCheckout([]);
    }
  }, [cartItems, serviceIdFromUrl]);

  const total = groupedItems.reduce((sum, item) => sum + parseFloat(item?.Precio || 0), 0);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'preferredDate') {
      const selectedDate = new Date(value);
      const day = selectedDate.getDay(); 
      // 6 = domingo
      if (day === 6) {
        setDateError('Los domingos no hay Laburo. Por favor elige otro día.');
        return; // no actualiza el valor
      } else {
        setDateError('');
      }
    }

    setFormData({ ...formData, [name]: value });
  };

  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);

    if (!formData.name || !formData.email || !formData.preferredDate) {
      setError("Completa todos los campos requeridos.");
      setIsSubmitting(false);
      return;
    }

    if (itemsToCheckout.length === 0) {
      setError("No hay servicios válidos para procesar.");
      setIsSubmitting(false);
      return;
    }

    try {
      const savedAppointmentIds = [];

      for (const item of groupedItems) {
        const appointmentDataToSave = {
          serviceId: item.id,
          serviceName: item.Nombre,
          servicePrice: item.Precio,
          userName: formData.name,
          userLastName: formData.lastName,
          userEmail: formData.email,
          userPhone: formData.phone,
          userCC: formData.userCC,
          notes: formData.notes,
          appointmentDate: formData.preferredDate,
          appointmentTime: formData.preferredTime,
          status: 'Pending Payment',
          createdAt: new Date(),
        };
        const newAppointmentId = await addAppointment(appointmentDataToSave);
        savedAppointmentIds.push(newAppointmentId);
      }

      if (!serviceIdFromUrl) {
        clearCart();
      }

      navigate('/pago', {
        state: {
          appointmentIds: savedAppointmentIds,
          totalAmount: total,
          schedulingDetails: formData,
        },
      });
    } catch (submitError) {
      console.error("Error al agendar:", submitError);
      setError("Error al procesar la compra. Inténtalo nuevamente.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (error && !isSubmitting) return <p className={styles.error}>{error}</p>;
  if (loading) return <p className={styles.loading}>Cargando detalles del servicio…</p>;
  if (isSubmitting) return <p className={styles.loading}>Procesando compra...</p>;

  return (
    <div className={styles['checkout-page']}>
      <h1>Completar Compra</h1>
      <div className={styles['checkout-content']}>
        <form className={styles['scheduling-form']} onSubmit={handleSubmit}>
          <h2>Datos de Agendamiento</h2>

          <div className={styles['form-row']}>
            <div className={styles['form-group']}>
              <label htmlFor="name">Nombre:</label>
              <input type="text" id="name" name="name" value={formData.name} onChange={handleInputChange} required disabled={isSubmitting} />
            </div>
            <div className={styles['form-group']}>
              <label htmlFor="lastName">Apellido:</label>
              <input type="text" id="lastName" name="lastName" value={formData.lastName} onChange={handleInputChange} required disabled={isSubmitting} />
            </div>
          </div>

          <div className={styles['form-row']}>
            <div className={styles['form-group']}>
              <label htmlFor="userCC">CC:</label>
              <input type="text" id="userCC" name="userCC" value={formData.userCC} onChange={handleInputChange} required disabled={isSubmitting} />
            </div>
            <div className={styles['form-group']}>
              <label htmlFor="phone">Teléfono:</label>
              <input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleInputChange} required disabled={isSubmitting} />
            </div>
          </div>

          <div className={styles['form-group']}>
            <label htmlFor="email">Correo Electrónico:</label>
            <input type="email" id="email" name="email" value={formData.email} onChange={handleInputChange} required disabled={isSubmitting} />
          </div>

          <div className={styles['form-group']}>
            <label htmlFor="notes">Información Adicional (Opcional):</label>
            <textarea id="notes" name="notes" value={formData.notes} onChange={handleInputChange} disabled={isSubmitting} />
          </div>

          <div className={styles['form-row']}>
            <div className={styles['form-group']}>
              <label htmlFor="preferredDate">Fecha Preferida:</label>
              <input
                type="date"
                id="preferredDate"
                name="preferredDate"
                value={formData.preferredDate}
                onChange={handleInputChange}
                required
                disabled={isSubmitting}
                min={minDate}
                max={maxDate}
              />
              {dateError && <p className={styles.error}>{dateError}</p>}
            </div>
            <div className={styles['form-group']}>
              <label htmlFor="preferredTime">Hora Preferida:</label>
              <TimePicker
                selectedDate={formData.preferredDate}
                durationMinutes={itemsToCheckout.length > 0 ? itemsToCheckout[0].Duracion || 60 : 60} // duración del primer servicio, 60min default
                value={formData.preferredTime}
                onChange={(value) => handleInputChange({ target: { name: 'preferredTime', value } })}
                disabled={isSubmitting}
              />
            </div>
          </div>

          <button type="submit" className={`${styles.btn} ${styles['btn-primary']}`} disabled={isSubmitting || itemsToCheckout.length === 0}>
            {isSubmitting ? 'Procesando...' : `Agendar y Proceder al Pago ($${total.toLocaleString('es-CO')} COP)`}
          </button>

          {error && !isSubmitting && <p className={styles.error}>{error}</p>}
        </form>

        <div className={styles['checkout-summary']}>
          <h2>Resumen del Pedido</h2>
          {groupedItems.map(item => (
            <div key={item?.id} className={styles['summary-item']}>
              {item?.imageFileName && (
                <img
                  src={item.imageFileName}
                  alt={item.Nombre}
                />
              )}
              <div>
                <span style={{fontWeight: 'bold',fontSize:  18}}>{item?.Nombre || 'Servicio Desconocido'}</span>
                <div>
                  Cantidad: {item.cantidad} &nbsp;|&nbsp; Subtotal: {(item.cantidad * parseFloat(item?.Precio || 0)).toLocaleString()} COP
                </div>
                <div>
                  Duracion: {item.Duracion} minutos
                </div>
              </div>
            </div>
          ))}
          <div style={{ borderTop: '1px solid #eee', marginTop: '10px', paddingTop: '10px', fontWeight: 'bold', fontSize:  18}}>
            Total: <span style={{ float: 'right' }}>${total.toLocaleString('es-CO')} COL</span>
          </div>
        </div>
      </div>
    </div>
  );
}
