// src/views/ServicesView.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllServices } from '../controllers/servicesController';
import Footer from './components/Footer';
import '../styles/ServicesView.css';

export default function ServicesView() {
  const [services, setServices] = useState([]);
  const [error, setError] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Todos');
  const [sortOption, setSortOption] = useState('');
  const navigate = useNavigate();

  const categories = ['Todos', ...new Set(services.map(service => service.Categoria))];

  useEffect(() => {
    getAllServices(setServices, setError);
  }, []);

  const goToServiceDetail = (serviceId) => {
    navigate(`/servicio/${serviceId}`);
  };

  if (error) return <p className="error">Error al cargar servicios: {error}</p>;
  if (!services.length && !error) return <p className="loading">Cargando servicios…</p>;

  let filteredServices = services;

  if (selectedCategory !== 'Todos') {
    filteredServices = filteredServices.filter(service => service.Categoria === selectedCategory);
  }

  if (sortOption === 'nombre-asc') {
    filteredServices = filteredServices.sort((a, b) => a.Nombre.localeCompare(b.Nombre));
  } else if (sortOption === 'nombre-desc') {
    filteredServices = filteredServices.sort((a, b) => b.Nombre.localeCompare(a.Nombre));
  } else if (sortOption === 'precio-asc') {
    filteredServices = filteredServices.sort((a, b) => a.Precio - b.Precio);
  } else if (sortOption === 'precio-desc') {
    filteredServices = filteredServices.sort((a, b) => b.Precio - a.Precio);
  }

  return (
    <>
      

      <section className="services-page">
        <h1 className="services-title" style={{alignItems: 'center'}}>Nuestros Servicios</h1>

        <div className="filter-sort-container">
        <div className="filter-group">
          <label className="filter-label">Categoría</label>
          <div className="select-wrapper">
            <select 
              className="custom-select" 
              value={selectedCategory} 
              onChange={e => setSelectedCategory(e.target.value)}
            >
              {categories.map((cat, index) => (
                <option key={index} value={cat}>{cat}</option>
              ))}
            </select>
          </div>
          <div className="category-count">
            {selectedCategory === 'Todos'
              ? `${services.length} servicios disponibles`
              : `${filteredServices.length} servicio(s) en "${selectedCategory}"`}
          </div>
        </div>

        <div className="filter-group">
          <label className="filter-label">Ordenar Por</label>
          <div className="select-wrapper">
            <select 
              className="custom-select" 
              value={sortOption} 
              onChange={e => setSortOption(e.target.value)}
            >
              <option value="">Seleccionar orden...</option>
              <option value="nombre-asc">Nombre A-Z</option>
              <option value="nombre-desc">Nombre Z-A</option>
              <option value="precio-asc">Precio: Menor a Mayor</option>
              <option value="precio-desc">Precio: Mayor a Menor</option>
            </select>
          </div>
        </div>
      </div>
        <div className="services-grid">
          {filteredServices.map(service => (
            <div
              key={service.id}
              className="service-card-wrapper"
              onClick={() => goToServiceDetail(service.id)} 
              style={{ cursor: 'pointer' }} 
            >
              <div className="service-card">
                <div className="service-image-container">
                  <img
                    className="service-image"
                    src={`/assets/${service.imageFileName}`}
                    alt={service.Nombre}
                  />
                </div>
                <div className="service-info">
                  <h2 className="service-name">{service.Nombre}</h2>
                  <p className="service-price">{service.Precio.toLocaleString('es-CO', {
                      style: 'currency',
                      currency: 'COP',
                      minimumFractionDigits: 0,
                      maximumFractionDigits: 0,
                    })}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <div className="info-background-section">
        <div className="info-overlay">
          <h3>Abierto 24 horas Online</h3>
          <p>Nuestra tienda online está abierta 24 horas y 7 días de la semana</p>
          <p>Puedes elegir y pagar por WhatsApp en el <strong>+57 300 320 8295</strong></p>

          <h3>Reserva por WhatsApp</h3>
          <p>Reserva, regala, paga, conoce nuestros servicios.</p>
          <p>Puedes revisar nuestro catálogo de servicios.</p>
          <p>Respondemos en menos de 5 minutos!</p>
          <a
            href="https://wa.link/NUMERO_WHATSAPP"
            target="_blank"
            rel="noopener noreferrer"
            className="whatsapp-button"
          >
            Ir a WhatsApp
          </a>
        </div>
      </div>

      <Footer />
    </>
  );
}