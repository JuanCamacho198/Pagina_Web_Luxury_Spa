// src/views/CitasView.jsx
import { useState, useEffect } from 'react';
import { getAuth } from 'firebase/auth';
import {
  fetchAppointments,
  deleteAppointment
} from '../../models/citasModel';
import styles from '../../styles/CitasView.module.css';

export default function CitasView() {
  const [citas, setCitas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [modalId, setModalId] = useState(null);
  const [notification, setNotification] = useState(null);
  const [cancelingId, setCancelingId] = useState(null);

  // Función para mostrar notificaciones
  const showNotification = (message, type = 'success') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 4000);
  };

  useEffect(() => {
    async function load() {
      try {
        const auth = getAuth();
        const currentUser = auth.currentUser;

        if (!currentUser) {
          setError('Usuario no autenticado.');
          return;
        }

        const list = await fetchAppointments(currentUser.uid);
        setCitas(list);
      } catch (error) {
        setError('No se pudo cargar las citas.', error.message);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  // Confirmar cancelación de cita
  const confirmCancel = async () => {
    setCancelingId(modalId);
    try {
      await deleteAppointment(modalId);
      setCitas(prev => prev.filter(cita => cita.id !== modalId));
      showNotification('✅ Cita cancelada exitosamente', 'success');
    } catch (error) {
      showNotification('❌ No se pudo cancelar la cita', error.message || 'error');
    } finally {
      setModalId(null);
      setCancelingId(null);
    }
  };

  const cancelModal = () => setModalId(null);

  // Función para formatear fechas
  const formatDate = (timestamp) => {
    if (!timestamp) return 'No especificada';
    const date = timestamp.seconds ? new Date(timestamp.seconds * 1000) : new Date(timestamp);
    return date.toLocaleDateString('es-CO', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  // Función para determinar el estado de la cita
  const getAppointmentStatus = (cita) => {
    const now = new Date();
    const appointmentDate = new Date(cita.appointmentDate + ' ' + (cita.appointmentTime || '00:00'));

    if (appointmentDate < now) {
      return { status: 'completada', label: 'Completada', color: '#28a745' };
    } else if (appointmentDate.toDateString() === now.toDateString()) {
      return { status: 'hoy', label: 'Hoy', color: '#ffc107' };
    } else {
      return { status: 'programada', label: 'Programada', color: '#007bff' };
    }
  };

  if (loading) {
    return (
      <div className={styles['citas-page']}>
        <div className={styles['loading-container']}>
          <div className={styles['loading-spinner']}></div>
          <p className={styles['loading-text']}>Cargando tus citas...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles['citas-page']}>
        <div className={styles['error-container']}>
          <div className={styles['error-icon']}>⚠️</div>
          <h2>Error al cargar las citas</h2>
          <p>{error}</p>
          <button onClick={() => window.location.reload()} className={styles['retry-btn']}>
            Intentar de nuevo
          </button>
        </div>
      </div>
    );
  }

  if (!citas.length) {
    return (
      <div className={styles['citas-page']}>
        <div className={styles['empty-state']}>
          <div className={styles['empty-icon']}>📅</div>
          <h2>No tienes citas agendadas</h2>
          <p>Cuando tengas citas programadas, aparecerán aquí.</p>
          <button
            onClick={() => window.location.href = '/servicios'}
            className={styles['btn-primary']}
          >
            Explorar Servicios
          </button>
        </div>
      </div>
    );
  }

  return (
    <section className={styles['citas-page']}>
      {/* Notificaciones */}
      {notification && (
        <div className={`${styles.notification} ${styles['notification-' + notification.type]}`}>
          <div className={styles['notification-content']}>
            <span className={styles['notification-message']}>{notification.message}</span>
            <button
              className={styles['notification-close']}
              onClick={() => setNotification(null)}
            >
              ×
            </button>
          </div>
        </div>
      )}

      {/* Header */}
      <div className={styles['citas-header']}>
        <h1>Mis Citas Agendadas</h1>
        <div className={styles['citas-stats']}>
          <div className={styles['stat-item']}>
            <span className={styles['stat-number']}>{citas.length}</span>
            <span className={styles['stat-label']}>Total</span>
          </div>
          <div className={styles['stat-item']}>
            <span className={styles['stat-number']}>
              {citas.filter(cita => getAppointmentStatus(cita).status === 'programada').length}
            </span>
            <span className={styles['stat-label']}>Próximas</span>
          </div>
        </div>
      </div>

      {/* Grid de citas */}
      <div className={styles['citas-grid']}>
        {citas.map(cita => {
          const status = getAppointmentStatus(cita);
          return (
            <article key={cita.id} className={`${styles['cita-card']} ${styles[status.status]}`}>
              <div className={styles['cita-status-badge']} style={{ backgroundColor: status.color }}>
                {status.label}
              </div>

              <header className={styles['cita-header']}>
                <div className={styles['service-info']}>
                  <h3 className={styles['service-name']}>{cita.serviceName || 'Servicio Desconocido'}</h3>
                  {cita.createdAt && (
                    <time className={styles['cita-created']}>
                      Reservada el {formatDate(cita.createdAt)}
                    </time>
                  )}
                </div>
              </header>

              <div className={styles['cita-details']}>

                <div className={styles['detail-row']}>
                  <div className={styles['detail-icon']}>📅</div>
                  <div className={styles['detail-content']}>
                    <span className={styles['detail-label']}>Fecha</span>
                    <span className={styles['detail-value']}>{cita.appointmentDate}</span>
                  </div>
                </div>

                {cita.appointmentTime && (
                  <div className={styles['detail-row']}>
                    <div className={styles['detail-icon']}>🕒</div>
                    <div className={styles['detail-content']}>
                      <span className={styles['detail-label']}>Hora</span>
                      <span className={styles['detail-value']}>{cita.appointmentTime}</span>
                    </div>
                  </div>
                )}
              </div>

              <div className={styles['cita-actions']}>
                {status.status !== 'completada' && (
                  <button
                    className={styles['btn-cancel']}
                    onClick={() => setModalId(cita.id)}
                    disabled={cancelingId === cita.id}
                  >
                    {cancelingId === cita.id ? (
                      <>
                        <span className={styles['loading-spinner-small']}></span>
                        Cancelando...
                      </>
                    ) : (
                      <>
                        🗑️ Cancelar Cita
                      </>
                    )}
                  </button>
                )}
              </div>
            </article>
          );
        })}
      </div>

      {/* Modal de confirmación */}
      {modalId && (
        <div className={styles['modal-backdrop']} onClick={cancelModal}>
          <div className={styles.modal} onClick={e => e.stopPropagation()}>
            <div className={styles['modal-icon']}>⚠️</div>
            <h2>¿Cancelar cita?</h2>
            <p>¿Estás seguro que deseas cancelar esta cita? Esta acción no se puede deshacer.</p>
            <div className={styles['modal-actions']}>
              <button
                onClick={confirmCancel}
                className={styles['btn-confirm']}
                disabled={cancelingId === modalId}
              >
                {cancelingId === modalId ? 'Cancelando...' : 'Sí, cancelar'}
              </button>
              <button onClick={cancelModal} className={styles['btn-secondary']}>
                No, mantener
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}