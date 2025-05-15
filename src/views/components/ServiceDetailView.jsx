import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getService } from '../controllers/servicesController';
import '../styles/ServiceDetailView.css';

export default function ServiceDetailView() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [service, setService] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    getService(id, setService, setError);
  }, [id]);

  if (error) return <p className="error">{error}</p>;
  if (!service) return <p className="loading">Cargando servicio...</p>;

  return (
    <section className="service-detail">
      <div className="detail-image">
        <img src={service.imageUrl || '/src/assets/placeholder.png'} alt={service.Nombre} />
      </div>
      <h1>{service.Nombre}</h1>
      <p><strong>Precio:</strong> {service.Precio} COP</p>
      <p><strong>Duración:</strong> {service.Duración} minutos</p>
      {service.description && <p className="description">{service.description}</p>}

      <button
        className="btn btn-primary"
        onClick={() => navigate(`/checkout?serviceId=${service.id}`)}
      >
        Realizar Compra
      </button>
    </section>
  );
}