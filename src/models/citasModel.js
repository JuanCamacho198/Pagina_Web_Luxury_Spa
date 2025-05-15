import { db } from '../firebase/firebaseConfig';
import {
  collection,
  addDoc,
  getDocs,
  query,
  orderBy,
  doc,
  deleteDoc
} from 'firebase/firestore';

const CITAS_COLL = 'Citas';

export async function addAppointment(appointmentData) {
  try {
    const docRef = await addDoc(collection(db, CITAS_COLL), {
      ...appointmentData,
      createdAt: new Date()
    });
    return docRef.id;
  } catch (e) {
    console.error("Error adding document: ", e);
    throw new Error("Failed to save appointment.");
  }
}

export async function fetchAppointments() {
  try {
    const q = query(collection(db, CITAS_COLL), orderBy('createdAt', 'desc'));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (e) {
    console.error("Error fetching documents: ", e);
    throw new Error("Failed to fetch appointments.");
  }
}

// Nueva función para borrar una cita por su ID
export async function deleteAppointment(id) {
  try {
    await deleteDoc(doc(db, CITAS_COLL, id));
  } catch (e) {
    console.error("Error deleting document: ", e);
    throw new Error("Failed to delete appointment.");
  }
}
