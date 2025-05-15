// src/models/userModel.js
import { db } from "../firebase/firebaseConfig";
import {
  collection,
  doc,
  setDoc,
  getDoc,
  updateDoc,
  deleteDoc
} from "firebase/firestore";

const USERS_COLL = "Usuarios";

/**
 * Guarda (o crea) un usuario en Firestore.
 */
export async function saveUserData(uid, nombre, apellido, correo, contraseña) {
  console.log("[userModel] ⇢ saveUserData llamado con:", {
    uid, nombre, apellido, correo, contraseña
  });
  const ref = doc(collection(db, USERS_COLL), uid);
  try {
    await setDoc(ref, { nombre, apellido, email: correo, contraseña });
    console.log("[userModel] ✔ setDoc exitoso para UID:", uid);
  } catch (err) {
    console.error("[userModel] ✖ error en setDoc para UID:", uid, err);
    throw err;
  }
}

/**
 * Trae un usuario por UID.
 */
export async function getUserById(uid) {
  const ref = doc(db, USERS_COLL, uid);
  const snap = await getDoc(ref);
  if (!snap.exists()) throw new Error("Usuario no encontrado");
  return { uid: snap.id, ...snap.data() };
}

/**
 * Actualiza campos de un usuario ya existente.
 */
export async function updateUserData(uid, updates) {
  const ref = doc(db, USERS_COLL, uid);
  await updateDoc(ref, updates);
}

/**
 * Borra el documento de un usuario en Firestore.
 */
export async function deleteUserData(uid) {
  console.log("[userModel] ⇢ deleteUserData llamado para UID:", uid);
  const ref = doc(db, USERS_COLL, uid);
  try {
    await deleteDoc(ref);
    console.log("[userModel] ✔ deleteDoc exitoso para UID:", uid);
  } catch (err) {
    console.error("[userModel] ✖ error en deleteDoc para UID:", uid, err);
    throw err;
  }
}