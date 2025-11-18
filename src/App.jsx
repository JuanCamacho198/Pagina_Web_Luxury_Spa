import React, { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useNavigate
} from 'react-router-dom';
import { auth } from './firebase/firebaseConfig';
import { CartProvider } from './context/CartContext';
import NavBar                   from './views/components/NavBar';
import ProfileView              from './views/components/ProfileView';
import ServiceDetailView from './views/components/ServiceDetailView'; 

// Vistas principales
import PublicHomeView from './views/pages/PublicHomeView';
import LoginView                from './views/pages/LoginView';
import RegisterView             from './views/pages/RegisterView';
import HomeView                 from './views/pages/HomeView';

import PoliticasCancelacionView from './views/pages/CancellationPolicyView';
import DataPrivacyPolicyView from './views/pages/DataPrivacyPolicyView';
import ImportantReservationInfoView from './views/pages/ImportantReservationInfoView';
import FaqView from './views/pages/FaqView';

import ServicesView from './views/pages/ServicesView';
import CheckoutView from './views/components/CheckoutView';
import CitasView from './views/pages/CitasView';
import PaymentView from './views/pages/PaymentView';
import SuccessView from './views/components/SuccessView';
import CartView from './views/components/CartView';

import ContactView from './views/pages/ContactView';
import AboutView from './views/pages/AboutView';

// --- Importa los controladores ---
import { loginUsuario, registroUsuario } from './controllers/authController';

export default function App() {
  //saber si ya se verificó el estado de autenticación 
  const [userChecked, setUserChecked] = useState(false);
  // usuario autenticado
  const [user, setUser] = useState(null);

  // Efecto para suscribirse a los cambios en el estado de autenticación de Firebase
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(u => {
      setUser(u); // Actualiza el estado 'user' (será null si no hay usuario)
      setUserChecked(true); // Marca como verificada la autenticación inicial
    });
    // Limpia la suscripción cuando el componente App se desmonta
    return unsubscribe;
  }, []); // El array vacío asegura que este efecto se ejecuta solo una vez al montar


  // Si aún estamos verificando el estado de autenticación, muestra un mensaje de carga
  if (!userChecked) {
    return <div>Cargando…</div>;
  }
  return (
    // se envolvio toda la aplicación con CartProvider para que cualquier componente pueda usar useCart
    <CartProvider>
      <Router>
        <NavBar user={user} />
        {/* rutas de la aplicación */}
        <Routes>
          {/* rutas para usuarios NO autenticados (user es null) */}
          {!user ? (
            <>
              {/* RUTAS PÚBLICAS */}
              <Route path="/" element={<PublicHomeView />} />
              <Route path="/login" element={<LoginRoute />} />
              <Route path="/register" element={<RegisterRoute />} />
              <Route path="/services" element={<ServicesView />} />
              <Route path="/contact" element={<ContactView />} />
              <Route path="/sobre-nosotros" element={<AboutView />} />
              <Route path="/politicas-cancelacion" element={<PoliticasCancelacionView />} />
              <Route path="/politica-datos" element={<DataPrivacyPolicyView />} />
              <Route path="/informacion-reserva" element={<ImportantReservationInfoView />} />
              <Route path="/preguntas-frecuentes" element={<FaqView />} />
              

              {/* Redirecciona las rutas privadas si el usuario no está autenticado */}
              {/* Si intenta acceder a checkout, citas, pago, confirmación o carrito, lo mandamos al login */}
              <Route path="/checkout" element={<Navigate to="/login" replace />} />
              <Route path="/citas" element={<Navigate to="/login" replace />} />
              <Route path="/pago" element={<Navigate to="/login" replace />} />
              <Route path="/confirmacion-pago" element={<Navigate to="/login" replace />} />
              <Route path="/carrito" element={<Navigate to="/login" replace />} />
              
              {/* Cualquier otra ruta no definida en este bloque para no autenticados ➔ redirige a la landing page */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </>
          ) : (
            /* Bloque de rutas para usuarios SÍ autenticados (user no es null) */
            <>
              {/* RUTAS PRIVADAS */}
              {/* Redirige la ruta raíz a /home si el usuario está loggeado */}
              <Route path="/" element={<Navigate to="/home" replace />} />

              {/* Rutas accesibles solo para usuarios autenticados */}
              <Route path="/home" element={<HomeView />} />
              <Route path="/contact" element={<ContactView />} />

              {/* Pasamos el usuario al ProfileView si lo necesita */}
              <Route path="/profile" element={<ProfileView user={user} />} />
              <Route path="/services" element={<ServicesView/>} />
              <Route path="/checkout" element={<CheckoutView />} />
              <Route path="/citas" element={<CitasView />} />
              <Route path="/pago" element={<PaymentView />} />
              <Route path="/confirmacion-pago" element={<SuccessView />} />
              <Route path="/carrito" element={<CartView />} />
              <Route path="/politicas-cancelacion" element={<PoliticasCancelacionView />} />
              <Route path="/politica-datos" element={<DataPrivacyPolicyView />} />
              <Route path="/informacion-reserva" element={<ImportantReservationInfoView />} />
              <Route path="/preguntas-frecuentes" element={<FaqView />} />

              {/* Cualquier otra ruta no definida en este bloque para autenticados ➔ redirige a /home */}
              <Route path="*" element={<Navigate to="/home" replace />} />
              
            </>
          )}
          {/* Esta ruta debe estar fuera del bloque condicional de autenticación */}
          <Route path="/servicio/:id" element={<ServiceDetailView />} />
        </Routes> 
      </Router> {/* <-- Cierre de Router */}
    </CartProvider>
  ); 
} // <-- Cierre de App


/**
 * Wrapper para LoginView para poder usar useNavigate y estado de error
 * Usamos esto si LoginView o RegisterView necesitan hooks de Router como useNavigate
 * o si queremos pasar lógica específica desde App.
 */
function LoginRoute() {
  const navigate = useNavigate();
  const [loginError, setLoginError] = useState('');

  // Esta función se pasaría a LoginView para ser llamada al enviar el formulario
  const handleLogin = async (email, password) => {
    // loginUsuario debe estar definido en tu authController.js y debe manejar la navegación y errores
    await loginUsuario(email, password, navigate, setLoginError);
  };

  return (
    <LoginView
      onLogin={handleLogin} // Pasamos la función de login como prop
      error={loginError} // Pasamos el estado de error como prop
    />
  );
}

/**
 * Wrapper para RegisterView para poder usar useNavigate y estado de error
 */
function RegisterRoute() {
  const navigate = useNavigate();
  const [registrationError, setRegistrationError] = useState('');

  // Esta función se pasaría a RegisterView para ser llamada al enviar el formulario
  const handleRegister = async (nombre, apellido, email, password) => {
    // registroUsuario debe estar definido en tu authController.js y manejar navegación y errores
    await registroUsuario(
      nombre,
      apellido,
      email,
      password,
      navigate,
      setRegistrationError
    );
  };

  return (
    <RegisterView
      onRegister={handleRegister} // Pasamos la función de registro como prop
      error={registrationError} // Pasamos el estado de error como prop
    />
  );
}