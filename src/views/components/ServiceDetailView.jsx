// src/views/components/ServiceDetailView.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { doc, getDoc, collection, addDoc, getDocs } from 'firebase/firestore';
import { db, auth } from '../../firebase/firebaseConfig';
import { useCart } from '../components/CartContext';
import '../../styles/ServiceDetailView.css';

const ServiceDetailView = () => {
  const { id } = useParams();
  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [recommendedServices, setRecommendedServices] = useState([]);
  const [notification, setNotification] = useState(null);
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const navigate = useNavigate();
  const { addItem } = useCart();

  // Función para mostrar notificaciones
  const showNotification = (message, type = 'success') => {
    setNotification({ message, type });
    setTimeout(() => {
      setNotification(null);
    }, 4000);
  };

  //obtener detalles del servicio desde Firebase
  useEffect(() => {
  const fetchServiceDetails = async () => {
    setLoading(true);
    setError(null);
    try {
      const serviceRef = doc(db, 'Servicios', id);
      const serviceSnap = await getDoc(serviceRef);

      if (serviceSnap.exists()) {
        const fetchedService = { id: serviceSnap.id, ...serviceSnap.data() };
        setService(fetchedService);

        // Obtener otros servicios sugeridos (excluyendo el actual)
        const serviciosRef = collection(db, 'Servicios');
        const serviciosSnap = await getDocs(serviciosRef);
        const otrosServicios = [];
        serviciosSnap.forEach((doc) => {
          if (doc.id !== id) {
            otrosServicios.push({ id: doc.id, ...doc.data() });
            }
          });

          // Puedes limitar a 3 o 4 servicios aleatorios
          const seleccionados = otrosServicios
            .sort(() => 0.5 - Math.random())
            .slice(0, 3);

          setRecommendedServices(seleccionados);
        } else {
          setError('Servicio no encontrado.');
        }
      } catch (err) {
        console.error('Error al obtener el servicio:', err);
        setError('Error al cargar el servicio.');
      } finally {
        setLoading(false);
      }
    };

    fetchServiceDetails();
  }, [id]);

  const handleAddToCart = async () => { 
    if (service) {
      if (auth.currentUser) { // si el usuario actual esta logeado
        setIsAddingToCart(true);
        try {
          const userCartRef = collection(db, 'Usuarios', auth.currentUser.uid, 'Carrito');
          await addDoc(userCartRef, { // añade el servicio al carro
            serviceId: service.id,
            Nombre: service.Nombre,
            Precio: service.Precio,
            imageFileName: service.imagenURL,
            Duracion: service.Duracion,
            quantity: 1,
          });
          showNotification(`✅ ${service.Nombre} ha sido añadido al carrito exitosamente`, 'success');
        } catch (e) {
          console.error('Error añadiendo al Carrito', e);
          showNotification('❌ Error al añadir el servicio al carrito. Inténtalo de nuevo.', 'error');
        } finally {
          setIsAddingToCart(false);
        }
      } else {
        showNotification('🔐 Necesitas iniciar sesión para añadir servicios al carrito', 'warning'); 
      }
    }
  };

  //boton comprar ahora
  const handleBuyNow = () => {
    if (service) {
      navigate(`/checkout?serviceId=${service.id}`);
    }
  };

  if (loading) return <p>Cargando detalles del servicio...</p>;
  if (error) return <p className="error">Error: {error}</p>;
  if (!service) return <p>No se ha seleccionado ningún servicio.</p>;

  return (
    <>
      {/* Componente de Notificación */}
      {notification && (
        <div className={`notification notification-${notification.type}`}>
          <div className="notification-content">
            <span className="notification-message">{notification.message}</span>
            <button 
              className="notification-close" 
              onClick={() => setNotification(null)}
              aria-label="Cerrar notificación"
            >
              ×
            </button>
          </div>
        </div>
      )}

      <div className="service-detail">
        <h2 className="service-detail-title">{service.Nombre}</h2>

        <div className="service-detail-content">
          {/* Sección izquierda */}
          <div className="service-detail-left">
            <div className="service-detail-image-container">
              {service.imagenURL && (
                <img src={service.imagenURL} alt={service.Nombre} className="service-detail-image" />
              )}
            </div>

            <div className="service-detail-info">
              {typeof service.Precio === 'number' ? (
                <p className="service-detail-price">
                  Precio: {service.Precio.toLocaleString('es-CO', {
                    style: 'currency',
                    currency: 'COP',
                    minimumFractionDigits: 0,
                    maximumFractionDigits: 0,
                  })}
                </p>
              ) : (
                <p className="service-detail-price">Precio no disponible</p>
              )}

              {service.Duracion && (
                <p className="service-detail-duration">Duración: {service.Duracion} minutos</p>
              )}

              <div className="service-detail-buttons">
                <button className="service-detail-buy-btn" onClick={handleBuyNow}>
                  Comprar Ahora
                </button>
                <button 
                  className={`service-detail-cart-btn ${isAddingToCart ? 'adding' : ''}`}
                  onClick={handleAddToCart}
                  disabled={isAddingToCart}
                >
                  {isAddingToCart ? (
                    <>
                      <span className="loading-spinner"></span>
                      Añadiendo...
                    </>
                  ) : (
                    'Añadir al Carrito'
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Sección derecha */}
          <div className="service-detail-right">
            {service.descripcionDetallada && (
              <div className="service-detail-description">
                <h3>Descripción Detallada</h3>
                <p>{service.descripcionDetallada}</p>
              </div>
            )}

            {service.incluye?.length > 0 && (
              <div className="service-detail-includes">
                <h3>¿Qué incluye?</h3>
                <ul>
                  {service.incluye.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>
            )}

            {service.beneficios?.length > 0 && (
              <div className="service-detail-benefits">
                <h3>Beneficios</h3>
                <ul>
                  {service.beneficios.map((beneficio, index) => (
                    <li key={index}>{beneficio}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>

      {recommendedServices.length > 0 && (
        <div className="recommended-services">
          <h3>También te puede interesar:</h3>
          <div className="recommended-services-list">
            {recommendedServices.map((s) => (
              <div key={s.id} className="recommended-service-card" onClick={() => navigate(`/servicio/${s.id}`)}>
                {s.imagenURL && (
                  <img src={s.imagenURL} alt={s.Nombre} className="recommended-service-image" />
                )}
                <h4>{s.Nombre}</h4>
                <p>
                  {typeof s.Precio === 'number'
                    ? s.Precio.toLocaleString('es-CO', {
                        style: 'currency',
                        currency: 'COP',
                        minimumFractionDigits: 0,
                      })
                    : 'Precio no disponible'}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default ServiceDetailView;