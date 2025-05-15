import React, { useState, useEffect } from 'react';
import {
  fetchAppointments,
  deleteAppointment
} from '../models/citasModel';
import '../styles/CitasView.css';

export default function CitasView() {
  const [citas, setCitas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [modalId, setModalId] = useState(null); // Para saber qué cita se va a cancelar

  useEffect(() => {
    async function load() {
      try {
        const list = await fetchAppointments();
        setCitas(list);
      } catch (e) {
        setError('No se pudo cargar las citas.');
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const confirmCancel = async () => {
    try {
      await deleteAppointment(modalId);
      setCitas(prev => prev.filter(cita => cita.id !== modalId));
    } catch (e) {
      alert('No se pudo cancelar la cita.');
    } finally {
      setModalId(null); // Cierra el modal
    }
  };

  const cancelModal = () => setModalId(null);

  if (loading) return <p className="status loading">⏳ Cargando citas…</p>;
  if (error) return <p className="status error">{error}</p>;
  if (!citas.length) return <p className="status info">📅 No hay citas agendadas.</p>;

  return (
    <section className="citas-page">
      <h1>Mis Citas Agendadas</h1>
      <div className="citas-grid">
        {citas.map(cita => (
          <article key={cita.id} className="cita-card">
            <header>
              <h3>{cita.serviceName || 'Servicio Desconocido'}</h3>
              {cita.createdAt && (
                <time className="cita-date">
                  Agendada: {new Date(cita.createdAt.seconds * 1000).toLocaleString()}
                </time>
              )}
            </header>
            <p><strong>Nombre:</strong> {cita.userName}</p>
            <p><strong>Email:</strong> {cita.userEmail}</p>
            {cita.userPhone && <p><strong>Teléfono:</strong> {cita.userPhone}</p>}
            <p><strong>Fecha:</strong> {cita.appointmentDate}</p>
            {cita.appointmentTime && <p><strong>Hora:</strong> {cita.appointmentTime}</p>}
            <button className="btn-cancel" onClick={() => setModalId(cita.id)}>Cancelar cita</button>
          </article>
        ))}
      </div>

      {modalId && (
        <div className="modal-backdrop">
          <div className="modal">
            <h2>¿Cancelar cita?</h2>
            <p>¿Estás seguro que deseas cancelar esta cita? Esta acción no se puede deshacer.</p>
            <div className="modal-actions">
              <button onClick={confirmCancel} className="btn-confirm">Sí, cancelar</button>
              <button onClick={cancelModal} className="btn-close">No</button>
            </div>
          </div>
        </div>

        
      )}
    </section>
    
  );
}
