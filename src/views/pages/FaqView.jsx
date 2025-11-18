// src/views/FaqView.jsx

import Footer from '../components/Footer';
import styles from '../../styles/PolicyView.module.css';

//preguntas frecuentes
export default function FaqView() {
  return (
    <>
      <main className={styles['policy-container']}>
        <section className={styles['policy-banner']}>
          <h1>Preguntas Frecuentes</h1>

          <h3>¿Qué incluye mi ritual o experiencia?</h3>
          <p>
            Cada ritual incluye diferentes zonas húmedas, masajes, exfoliaciones, mascarillas y experiencias sensoriales. Puedes revisar el detalle en la página de servicios o en la confirmación de tu reserva.
          </p>

          <h3>¿Puedo asistir acompañado?</h3>
          <p>
            Sí, tenemos rituales individuales, en pareja y grupales. Algunos planes están diseñados exclusivamente para compartir.
          </p>

          <h3>¿Debo llevar algo para mi reserva?</h3>
          <p>
            Solo necesitas traer tu traje de baño y sandalias cómodas. Nosotros te proporcionamos bata, toalla, casillero y demás implementos necesarios.
          </p>

          <h3>¿Con cuánta anticipación debo llegar?</h3>
          <p>
            Recomendamos llegar con al menos 15 minutos de anticipación para garantizar que puedas disfrutar tu experiencia completa y sin contratiempos.
          </p>

          <h3>¿Puedo cambiar o cancelar mi cita?</h3>
          <p>
            Sí, pero debes hacerlo con mínimo 24 horas de anticipación. Cancelaciones fuera de ese plazo pueden tener penalidad. Consulta nuestra política de cambios y cancelaciones.
          </p>

          <h3>¿Qué sucede si llego tarde?</h3>
          <p>
            Tu tiempo de atención podría reducirse para no afectar a los siguientes clientes. Te recomendamos llegar puntual.
          </p>

          <h3>¿Está permitido ingresar con alimentos o bebidas?</h3>
          <p>
            No. En Grupo Luxury Spa te ofrecemos bebidas especiales como vino o té según el ritual, pero no está permitido ingresar con alimentos o bebidas del exterior.
          </p>

          <h3>¿Hay parqueadero disponible?</h3>
          <p>
            Sí, contamos con parqueadero gratuito para nuestros clientes. Sin embargo, Grupo Luxury Spa no se hace responsable por objetos dejados en los vehículos.
          </p>

          <h3>¿Pueden asistir menores de edad?</h3>
          <p>
            No, nuestras experiencias están diseñadas para mayores de edad. En algunos casos específicos podemos aceptar mayores de 16 años acompañados por un adulto.
          </p>

          <h3>¿Tienen servicio de alimentación?</h3>
          <p>
            Algunos de nuestros rituales incluyen snacks o tabla de frutas, pero no ofrecemos servicio de restaurante. Puedes consultar opciones adicionales al momento de reservar.
          </p>

        </section>
      </main>
      <Footer />
    </>
  );
}
