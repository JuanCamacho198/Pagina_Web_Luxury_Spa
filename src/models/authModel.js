// src/models/authModel.js
import { auth } from "../firebase/firebaseConfig";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut
} from "firebase/auth";

const Registro = (correo, contraseña) =>
  createUserWithEmailAndPassword(auth, correo, contraseña);

const Login = (correo, contraseña) =>
  signInWithEmailAndPassword(auth, correo, contraseña);

const Logout = () => signOut(auth);

export default { auth, Registro, Login, Logout };
