// src/models/servicesModel.js
import { db } from '../firebase/firebaseConfig';
// Importamos getDocs, collection, doc y getDoc para obtener un documento específico
import { collection, getDocs, doc, getDoc } from 'firebase/firestore';

const SERVICES_COLL = 'Servicios'; // Nombre de la collecion

// Obtiene todos los servicios
export async function fetchServices() {
  const snap = await getDocs(collection(db, SERVICES_COLL));
  // mapeamos cada documento a objeto JS con su id
  return snap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}

// Obtiene un servicio por su ID
export async function fetchServiceById(serviceId) {
  // Creamos una referencia a un documento específico dentro de la colección
  const docRef = doc(db, SERVICES_COLL, serviceId);
  const docSnap = await getDoc(docRef);


  if (docSnap.exists()) {
    // Si existe, se devuelve un objeto con el id del documento y sus datos
    return { id: docSnap.id, ...docSnap.data() };
  } else {
    // Si no existe
    console.log("No such document!");
    return null;
  }
}