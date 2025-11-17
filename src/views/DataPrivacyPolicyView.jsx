// src/views/DataPrivacyPolicyView.jsx

import Footer from './components/Footer';
import '../styles/PolicyView.css';

export default function DataPrivacyPolicyView() {
  return (
    <>
      <main className="policy-container">
        <section className="policy-banner">
          <h1>Política de Tratamiento de Datos Personales</h1>
          <h2>AVISO DE PRIVACIDAD</h2>
          <p>
            El presente Aviso de Privacidad (en adelante el “Aviso”) establece los términos y 
            condiciones en virtud de los Grupo Luxury Spa, identificado con NIT 900.983.715-1 y con 
            dirección Cra. 36 #8a-40, Poblado, Medellín, realizará el tratamiento de sus datos personales.
          </p>

          <h3>1. TRATAMIENTO Y FINALIDAD:</h3>
          <p>
            El tratamiento que realizará Grupo Luxury Spa con la información personal será el siguiente:
          </p>
          <p>
            La recolección, almacenamiento, uso, circulación para las siguientes finalidades:
          </p>
          <ul>
            <li>Efectuar las gestiones pertinentes para el desarrollo del objeto social de la compañía en lo que tiene que ver con el cumplimiento del objeto del contrato celebrado con el Titular de la información.</li>
            <li>Realizar invitaciones a eventos y ofrecer nuevos productos y servicios.</li>
            <li>Gestionar trámites (solicitudes, quejas, reclamos).</li>
            <li>Efectuar encuestas de satisfacción respecto de los bienes y servicios ofrecidos por Grupo Luxury Spa.</li>
            <li>Suministrar información de contacto a la fuerza comercial y/o red de distribución, telemercadeo, investigación del Grupo Luxury Spa.</li>
            <li>Contactar al Titular a través de medios telefónicos para realizar encuestas, estudios y/o confirmación de datos personales necesarios para la ejecución de una relación contractual.</li>
            <li>Contactar al Titular a través de medios electrónicos – SMS o chat para el envío de noticias relacionadas con campañas de fidelización o mejora de servicio.</li>
            <li>Contactar al Titular a través de correo electrónico para el envío de extractos, estados de cuenta o facturas en relación con las obligaciones derivadas del contrato celebrado entre las partes.</li>
            <li>Prestar los servicios ofrecidos por Grupo Luxury Spa y aceptados en el contrato suscrito.</li>
          </ul>

          <h3>2. DERECHOS DEL TITULAR:</h3>
          <p>Como titular de sus datos personales Usted tiene derecho a:</p>
          <ul>
            <li>Acceder en forma gratuita a los datos proporcionados que hayan sido objeto de tratamiento.</li>
            <li>Conocer, actualizar y rectificar su información frente a datos parciales, inexactos, incompletos, fraccionados, que induzcan a error, o a aquellos cuyo tratamiento esté prohibido o no haya sido autorizado.</li>
            <li>Solicitar prueba de la autorización otorgada.</li>
            <li>Presentar ante la Superintendencia de Industria y Comercio (SIC) quejas por infracciones a lo dispuesto en la normatividad vigente.</li>
            <li>Revocar la autorización y/o solicitar la supresión del dato, siempre que no exista un deber legal o contractual que impida eliminarlos.</li>
            <li>Abstenerse de responder las preguntas sobre datos sensibles. Tendrá carácter facultativo las respuestas que versen sobre datos sensibles o sobre datos de las niñas y niños y adolescentes.</li>
          </ul>

          <h3>3. MECANISMOS PARA CONOCER LA POLÍTICA DE TRATAMIENTO</h3>
          <p>
            El Titular puede acceder a nuestra Política de Tratamiento de información, la cual se encuentra publicada en electrónico en la dirección web <a href="http://www.luxuryspa.com" target="_blank" rel="noopener noreferrer">http://www.luxuryspa.com</a>.
          </p>

          <h3>ATENCIÓN DE PETICIONES, CONSULTAS Y RECLAMOS</h3>
          <p>
            El área de Servicio al Cliente es la dependencia que tiene a cargo dar trámite a las solicitudes de los titulares para hacer efectivos sus derechos.
            La atención de Peticiones, Consultas y Reclamos se hará en el correo electrónico <a href="mailto:luxuryspa@hotmail.com">luxuryspa@hotmail.com</a>.
          </p>

          <h3>VIGENCIA</h3>
          <p>
            La presente Política para el Tratamiento de Datos Personales rige a partir del 01 de enero de 2022.
            Las bases de datos en las que se registrarán los datos personales tendrán una vigencia igual al tiempo en que se mantenga y utilice la información para las finalidades descritas en esta política.
            Una vez se cumpla(n) esa(s) finalidad(es) y siempre que no exista un deber legal o contractual de conservar su información, sus datos serán eliminados de nuestras bases de datos.
          </p>
        </section>
      </main>
      <Footer />
    </>
  );
}
