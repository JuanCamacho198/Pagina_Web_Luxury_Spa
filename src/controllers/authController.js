// src/controllers/authController.js
import authModel from "../models/authModel";
import { saveUserData } from "../models/userModel";       // <-- import nombrado
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";

/**
 * Registra en Auth + Firestore, ahora usando saveUserData correctamente.
 */
const registroUsuario = async (
  nombre,
  apellido,
  correo,
  contraseña,
  navigate,
  registroError
) => {
  try {
    console.log("intentando registrar usuario en Firebase Authentication");
    const { user } = await authModel.Registro(correo, contraseña);
    const uid = user.uid;

    // Guardado en Firestore
    await saveUserData(uid, nombre, apellido, correo, contraseña);

    // Verificación inmediata
    const snap = await getDoc(doc(db, "Usuarios", uid));
    if (snap.exists()) {
      console.log("[registroUsuario] ✔ documento guardado:", snap.data());
    } else {
      console.warn("[registroUsuario] ⚠ documento NO EXISTE tras setDoc");
    }

    navigate("/home");
  } catch (error) {
    console.error("Oh no, error en registroUsuario:", error);
    registroError(error.message);
  }
};

const loginUsuario = async (correo, contraseña, navigate, loginError) => {
  try {
    await authModel.Login(correo, contraseña);
    navigate("/home");
  } catch (error) {
    console.error("Error en loginUsuario:", error);
    loginError(error.message);
  }
};

export { loginUsuario, registroUsuario };
