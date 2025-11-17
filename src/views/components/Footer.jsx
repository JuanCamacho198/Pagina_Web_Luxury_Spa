// src/views/components/Footer.jsx

import logo from '../../assets/logo2.png';
import { Link } from 'react-router-dom';
import '../../styles/footer.css'; 


const Footer = () => {
  return (
    <footer>
      <div className="footer-container">
        <div className="footer-section">
          <img src={logo}alt="Luxury Spa logo" />
          <h4>Luxury Spa</h4>
        </div>

        <div className="footer-section">
          <h4>Contacto</h4>
          <p>Dirección: Calle 87c#23-52</p>
          <p>Teléfono: (123) 456-7890</p>
          <p>Email: <a href="mailto:contacto@.com">contacto@.com</a></p>
        </div>

        <div className="footer-section">
          <h4>Horario de Atención</h4>
          <p>Lunes a Viernes: 9:00 AM - 7:00 PM</p>
          <p>Sábado: 9:00 AM - 4:00 PM</p>
          <p>Domingo: Cerrado</p>
        </div>

        <div className="footer-section">
          <h4>Síguenos en Redes Sociales</h4>
          <div className="social-media">
            <a href="#" aria-label="Facebook"><img src="../../src/assets/facebook.svg" alt="Facebook" width="40px" /></a>
            <a href="#" aria-label="Instagram"><img src="../../src/assets/instagram.svg" alt="Instagram" width="40px" /></a>
            <a href="#" aria-label="Twitter"><img src="../../src/assets/whatsapp.svg" alt="Twitter" width="40px" /></a>
          </div>
        </div>

        <div className="footer-section">
          <h4>Menu</h4>
          <ul>
            <li><Link to="/politicas-cancelacion">- Políticas de Cancelación y Reserva</Link></li>
            <li><Link to="/politica-datos">- Política de Tratamiento de Datos Personales</Link></li>
            <li><Link to="/informacion-reserva">- Información Importante para su Reserva</Link></li>
            <li><Link to="/preguntas-frecuentes">- Preguntas Frecuentes</Link></li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>Enlaces Útiles</h4>
          <ul>
            <li><a href="#">Política de Privacidad</a></li>
            <li><a href="#">Términos y Condiciones</a></li>
          </ul>
        </div>
      </div>

      <p>© 2024 Luxury Spa. Todos los derechos reservados.</p>
    </footer>
  );
};

export default Footer;