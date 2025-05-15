import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  fetchCurrentUser,
  saveProfileChanges,
  deleteCurrentUser
} from '../../controllers/userController';
import { auth } from '../../firebase/firebaseConfig';
import { signOut } from 'firebase/auth';
import '../../styles/ProfileView.css';

export default function ProfileView() {
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState('');
  const [editingField, setEditingField] = useState(null);
  const [form, setForm] = useState({ nombre: '', apellido: '', email: '' });
  const navigate = useNavigate();

  useEffect(() => {
    fetchCurrentUser(setProfile, setError);
  }, []);

  useEffect(() => {
    if (profile) {
      setForm({
        nombre: profile.nombre,
        apellido: profile.apellido,
        email: profile.email
      });
    }
  }, [profile]);

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
      },
      (msg) => {
        console.error("[ProfileView] saveProfileChanges error:", msg);
        setError(msg);
      }
    );
  };

  const handleLogout = async () => {
    await signOut(auth);
    navigate('/', { replace: true });
  };

  const handleDelete = async () => {
    if (!window.confirm('¿Estás seguro de que quieres eliminar tu cuenta?')) return;
    await deleteCurrentUser(
      () => navigate('/', { replace: true }),
      (msg) => setError(msg)
    );
  };

  if (error) return <p className="error">{error}</p>;
  if (!profile) return <p>Cargando perfil…</p>;

  return (
    <div className="profile-view">
      <h1 className='profile-h1'>Cuenta</h1>

      <div className="profile-fields">
        {['nombre', 'apellido', 'email'].map((field) => (
          <div key={field} className="profile-field">
            {editingField === field ? (
              <div className="edit-mode">
                <input
                  name={field}
                  value={form[field]}
                  onChange={handleChange}
                  placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                />
                <button onClick={() => handleSave(field)}>Guardar</button>
                <button onClick={() => setEditingField(null)}>Cancelar</button>
              </div>
            ) : (
              <>
                <div className="field-info">
                  <strong>{field.charAt(0).toUpperCase() + field.slice(1)}:</strong>
                  <span>{profile[field]}</span>
                </div>
                <button className="edit-btn" onClick={() => setEditingField(field)}>
                  Editar
                </button>
              </>
            )}
          </div>
        ))}
      </div>

      <hr />
      <div className="profile-actions">
        <button className="logout-btn" onClick={handleLogout}>Cerrar sesión</button>
        <button className="delete-btn" onClick={handleDelete}>Eliminar cuenta</button>
      </div>
    </div>
  );
}
