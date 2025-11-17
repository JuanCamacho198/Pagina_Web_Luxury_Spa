// src/views/components/ProfileView.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { collection, query, where, getDocs, orderBy, limit } from 'firebase/firestore';
import {
  fetchCurrentUser,
  saveProfileChanges,
  deleteCurrentUser
} from '../../controllers/userController';
import { auth, db } from '../../firebase/firebaseConfig';
import { signOut } from 'firebase/auth';
import styles from '../../styles/ProfileView.module.css';

export default function ProfileView() {
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState('');
  const [editingField, setEditingField] = useState(null);
  const [form, setForm] = useState({ nombre: '', apellido: '', email: '', telefono: '', fechaNacimiento: '' });
  const [activeTab, setActiveTab] = useState('personal');
  const [orderHistory, setOrderHistory] = useState([]);
  const [favoriteServices, setFavoriteServices] = useState([]);
  const [loadingHistory, setLoadingHistory] = useState(false);
  const [notification, setNotification] = useState(null);
  const navigate = useNavigate();

  // Función para mostrar notificaciones
  const showNotification = (message, type = 'success') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 4000);
  };

  useEffect(() => {
    fetchCurrentUser(setProfile, setError);
  }, []);

  useEffect(() => {
    if (profile) {
      setForm({
        nombre: profile.nombre || '',
        apellido: profile.apellido || '',
        email: profile.email || '',
        telefono: profile.telefono || '',
        fechaNacimiento: profile.fechaNacimiento || ''
      });
    }
  }, [profile]);

  // Obtener historial de órdenes
  const fetchOrderHistory = async () => {
    if (!auth.currentUser) return;
    
    setLoadingHistory(true);
    try {
      const ordersRef = collection(db, 'Ordenes');
      const q = query(
        ordersRef, 
        where('userId', '==', auth.currentUser.uid),
        orderBy('fechaCreacion', 'desc'),
        limit(10)
      );
      const querySnapshot = await getDocs(q);
      const orders = [];
      querySnapshot.forEach((doc) => {
        orders.push({ id: doc.id, ...doc.data() });
      });
      setOrderHistory(orders);
    } catch (error) {
      console.error('Error fetching order history:', error);
    } finally {
      setLoadingHistory(false);
    }
  };

  // Obtener servicios del carrito (como favoritos)
  const fetchFavoriteServices = async () => {
    if (!auth.currentUser) return;
    
    try {
      const cartRef = collection(db, 'Usuarios', auth.currentUser.uid, 'Carrito');
      const querySnapshot = await getDocs(cartRef);
      const services = [];
      querySnapshot.forEach((doc) => {
        services.push({ id: doc.id, ...doc.data() });
      });
      setFavoriteServices(services);
    } catch (error) {
      console.error('Error fetching favorite services:', error);
    }
  };

  useEffect(() => {
    if (activeTab === 'historial') {
      fetchOrderHistory();
    } else if (activeTab === 'favoritos') {
      fetchFavoriteServices();
    }
  }, [activeTab]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const handleSave = async (field) => {
    await saveProfileChanges(
      { [field]: form[field] },
      () => {
        console.log(`[ProfileView] saveProfileChanges success: ${field}`);
        setEditingField(null);
        fetchCurrentUser(setProfile, setError);
        showNotification('✅ Perfil actualizado correctamente', 'success');
      },
      (msg) => {
        console.error("[ProfileView] saveProfileChanges error:", msg);
        setError(msg);
        showNotification('❌ Error al actualizar el perfil', 'error');
      }
    );
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      showNotification('👋 Sesión cerrada correctamente', 'success');
      navigate('/', { replace: true });
    } catch (error) {
      showNotification('❌ Error al cerrar sesión', 'error');
    }
  };

  const handleDelete = async () => {
    if (!window.confirm('¿Estás seguro de que quieres eliminar tu cuenta? Esta acción no se puede deshacer.')) return;
    await deleteCurrentUser(
      () => {
        showNotification('✅ Cuenta eliminada correctamente', 'success');
        navigate('/', { replace: true });
      },
      (msg) => {
        setError(msg);
        showNotification('❌ Error al eliminar la cuenta', 'error');
      }
    );
  };

  const formatDate = (timestamp) => {
    if (!timestamp) return 'N/A';
    const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
    return date.toLocaleDateString('es-CO', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  if (error) return <p className={styles.error}>{error}</p>;
  if (!profile) return <p className={styles.loading}>Cargando perfil…</p>;

  return (
    <div className={styles['profile-view']}>
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

      {/* Header del perfil */}
      <div className={styles['profile-header']}>
        <div className={styles['profile-avatar']}>
          <div className={styles['avatar-circle']}>
            {profile.nombre ? profile.nombre.charAt(0).toUpperCase() : 'U'}
          </div>
        </div>
        <div className={styles['profile-info']}>
          <h1 className={styles['profile-name']}>{profile.nombre} {profile.apellido}</h1>
          <p className={styles['profile-email']}>{profile.email}</p>
        </div>
      </div>

      {/* Navegación por pestañas */}
      <div className={styles['profile-tabs']}>
        <button 
          className={`${styles.tab} ${activeTab === 'personal' ? styles.active : ''}`}
          onClick={() => setActiveTab('personal')}
        >
          📝 Información Personal
        </button>

        <button 
          className={`${styles.tab} ${activeTab === 'favoritos' ? styles.active : ''}`}
          onClick={() => setActiveTab('favoritos')}
        >
          ❤️ En mi Carrito
        </button>
        <button 
          className={`${styles.tab} ${activeTab === 'configuracion' ? styles.active : ''}`}
          onClick={() => setActiveTab('configuracion')}
        >
          ⚙️ Configuración
        </button>
      </div>

      {/* Contenido de las pestañas */}
      <div className={styles['tab-content']}>
        {activeTab === 'personal' && (
          <div className={styles['personal-info']}>
            <h2>Información Personal</h2>
            <div className={styles['profile-fields']}>
              {['nombre', 'apellido', 'telefono'].map((field) => (
                <div key={field} className={styles['profile-field']}>
                  {editingField === field ? (
                    <div className={styles['edit-mode']}>
                      <label>{field.charAt(0).toUpperCase() + field.slice(1)}:</label>
                      <input
                        name={field}
                        value={form[field]}
                        onChange={handleChange}
                        placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                      />
                      <div className={styles['edit-actions']}>
                        <button className={styles['save-btn']} onClick={() => handleSave(field)}>Guardar</button>
                        <button className={styles['cancel-btn']} onClick={() => setEditingField(null)}>Cancelar</button>
                      </div>
                    </div>
                  ) : (
                    <div className={styles['field-display']}>
                      <div className={styles['field-info']}>
                        <label>{field.charAt(0).toUpperCase() + field.slice(1)}:</label>
                        <span>{profile[field] || 'No especificado'}</span>
                      </div>
                      <button className={styles['edit-btn']} onClick={() => setEditingField(field)}>
                        ✏️ Editar
                      </button>
                    </div>
                  )}
                </div>
              ))}
              
              {/* Email (no editable) */}
              <div className={styles['profile-field']}>
                <div className={styles['field-display']}>
                  <div className={styles['field-info']}>
                    <label>Email:</label>
                    <span>{profile.email}</span>
                  </div>
                  <span className={styles['email-notice']}>📧 No editable</span>
                </div>
              </div>
            </div>
          </div>
        )}


        {activeTab === 'favoritos' && (
          <div className={styles['favorite-services']}>
            <h2>Servicios en mi Carrito</h2>
            {favoriteServices.length > 0 ? (
              <div className={styles['services-list']}>
                {favoriteServices.map((service) => (
                  <div key={service.id} className={styles['service-card-mini']}>
                    <div className={styles['service-info']}>
                      <h4>{service.Nombre}</h4>
                      <p className={styles['service-price']}>{formatCurrency(service.Precio)}</p>
                      {service.Duracion && (
                        <p className={styles['service-duration']}>{service.Duracion} minutos</p>
                      )}
                    </div>
                    <button 
                      onClick={() => navigate(`/servicio/${service.serviceId}`)}
                      className={styles['view-service-btn']}
                    >
                      Ver Detalles
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <div className={styles['empty-state']}>
                <p>🛒 Tu carrito está vacío.</p>
                <button onClick={() => navigate('/servicios')} className={styles['btn-primary']}>
                  Explorar Servicios
                </button>
              </div>
            )}
          </div>
        )}

        {activeTab === 'configuracion' && (
          <div className="account-settings">
            <h2>Configuración de Cuenta</h2>
            


            <div className="settings-section danger-zone">
              <div className="danger-actions">
                <button className="logout-btn" onClick={handleLogout}>
                  🚪 Cerrar Sesión
                </button>
                <button className="delete-btn" onClick={handleDelete}>
                  🗑️ Eliminar Cuenta
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}