// src/models/citasModel.js
import { db } from '../firebase/firebaseConfig';
import { where } from 'firebase/firestore';
import { getAuth } from 'firebase/auth'; 
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
    const auth = getAuth();
    const user = auth.currentUser;

    if (!user) {
      throw new Error("Usuario no autenticado.");
    }

    const dataToSave = {
      ...appointmentData,
      uid: user.uid, // guardar el UID del usuario actual
      createdAt: appointmentData.createdAt || new Date()
    };

    const docRef = await addDoc(collection(db, CITAS_COLL), dataToSave);
    return docRef.id;
  } catch (e) {
    console.error("Error adding document: ", e);
    throw new Error("Failed to save appointment.");
  }
}


//obtener cita por Id
export async function fetchAppointments(uid) {
  try {
    const q = query(
      collection(db, 'Citas'),
      where('uid', '==', uid),              
      orderBy('createdAt', 'desc')          
    );
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

// borrar una cita por su ID
export async function deleteAppointment(id) {
  try {
    await deleteDoc(doc(db, CITAS_COLL, id));
  } catch (e) {
    console.error("Error deleting document: ", e);
    throw new Error("Failed to delete appointment.");
  }
}
