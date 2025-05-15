// src/views/ServicesView.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllServices } from '../controllers/servicesController';
import { auth } from '../firebase/firebaseConfig';
import { useCart } from './components/CartContext';

import '../styles/ServicesView.css';

export default function ServicesView() {
  const [services, setServices] = useState([]);
  const [error, setError] = useState('');
  const [selectedService, setSelectedService] = useState(null);
  const navigate = useNavigate();
  const user = auth.currentUser;
  const { addItem, cartItems } = useCart();

  useEffect(() => {
    getAllServices(setServices, setError);
  }, []);

  const handleAddToCart = (service) => {
    addItem(service);
    alert(`${service.Nombre} añadido al carrito.`);
  };

  const isServiceInCart = (serviceId) =>
    cartItems.some(item => item.id === serviceId);

  const handleBuyNow = (serviceId) => {
    navigate(`/checkout?serviceId=${serviceId}`);
  };

  if (error) return <p className="error">Error al cargar servicios: {error}</p>;
  if (!services.length && !error) return <p className="loading">Cargando servicios…</p>;

  return (
    <section className="services-page">
      <h1 className="services-title">Nuestros Servicios</h1>

      <div className="services-grid">
        {services.map(service => (
          <div key={service.id} className="service-card">
            <img
              className="service-image"
              src={`/assets/${service.imageFileName}`}
              alt={service.Nombre}
            />

            <div className="service-info">
              <h2 className="service-name">{service.Nombre}</h2>
              <p className="service-price">Precio: {service.Precio} COP</p>
              {service.Duracion && (
                <p className="service-duration">Duración: {service.Duracion} min</p>
              )}
            </div>

            <div className="service-actions">
              <button
                className="btn btn-secondary"
                onClick={() => setSelectedService(service)}
              >
                Detalles
              </button>

              {user && (
                <>
                  <button
                    className="btn btn-primary"
                    onClick={() => handleBuyNow(service.id)}
                  >
                    Comprar
                  </button>
                  <button
                    className="btn btn-secondary"
                    onClick={() => handleAddToCart(service)}
                    disabled={isServiceInCart(service.id)}
                  >
                    {isServiceInCart(service.id) ? 'En Carrito' : 'Añadir'}
                  </button>
                </>
              )}
            </div>
          </div>
        ))}
      </div>

      {selectedService && (
        <div className="modal-overlay" onClick={() => setSelectedService(null)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <button
              className="modal-close"
              onClick={() => setSelectedService(null)}
            >
              ✕
            </button>

            <img
              className="detail-image"
              src={`/assets/${selectedService.imageFileName}`}
              alt={selectedService.Nombre}
            />

            <h2>{selectedService.Nombre}</h2>
            <p><strong>Precio:</strong> {selectedService.Precio} COP</p>
            {selectedService.Duracion && (
              <p><strong>Duración:</strong> {selectedService.Duracion} min</p>
            )}
            {selectedService.Descripcion && (
              <p className="description">{selectedService.Descripcion}</p>
            )}

            {user && (
              <div className="modal-buttons">
                <button
                  className="btn btn-primary"
                  onClick={() => handleBuyNow(selectedService.id)}
                >
                  Comprar
                </button>
                <button
                  className="btn btn-secondary"
                  onClick={() => {
                    handleAddToCart(selectedService);
                    setSelectedService(null);
                  }}
                  disabled={isServiceInCart(selectedService.id)}
                >
                  {isServiceInCart(selectedService.id) ? 'En Carrito' : 'Añadir'}
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
