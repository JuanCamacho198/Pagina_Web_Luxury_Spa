// src/models/servicesModel.js
import { db } from '../firebase/firebaseConfig';
// Importamos getDocs, collection
// y añadimos doc y getDoc para obtener un documento específico
import { collection, getDocs, doc, getDoc } from 'firebase/firestore';

const SERVICES_COLL = 'Servicios'; // Nombre de tu colección de servicios

// Función existente: Obtiene todos los servicios
export async function fetchServices() {
  const snap = await getDocs(collection(db, SERVICES_COLL));
  // mapeamos cada documento a objeto JS con su id
  return snap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}

// NUEVA FUNCIÓN: Obtiene un servicio por su ID
export async function fetchServiceById(serviceId) {
  // Creamos una referencia a un documento específico dentro de la colección
  const docRef = doc(db, SERVICES_COLL, serviceId);

  // Obtenemos el "snapshot" de ese documento
  const docSnap = await getDoc(docRef);

  // Verificamos si el documento existe
  if (docSnap.exists()) {
    // Si existe, devolvemos un objeto con el id del documento y sus datos
    // docSnap.data() contiene todos los campos del documento (Nombre, Precio, etc.)
    return { id: docSnap.id, ...docSnap.data() };
  } else {
    // Si no existe, imprimimos un mensaje en consola y devolvemos null
    console.log("No such document!");
    return null;
    // También podrías lanzar un error si prefieres manejarlo así en el componente
    // throw new Error("Service not found");
  }
}