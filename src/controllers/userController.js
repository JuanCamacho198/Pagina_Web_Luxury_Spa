// src/controllers/userController.js
import {
    getUserById,
    updateUserData,
    deleteUserData
  } from "../models/userModel";
  import { auth }    from "../firebase/firebaseConfig";
  
  export const fetchCurrentUser = async (setProfile, setError) => {
    try {
      const current = auth.currentUser;
      if (!current) throw new Error("No hay usuario autenticado");
      const profile = await getUserById(current.uid);
      setProfile(profile);
    } catch (err) {
      console.error("[userController] fetchCurrentUser error:", err);
      setError(err.message);
    }
  };
  
  export const saveProfileChanges = async (updates, onSuccess, onError) => {
    try {
      const uid = auth.currentUser.uid;
      await updateUserData(uid, updates);
      onSuccess();
    } catch (err) {
      console.error("[userController] saveProfileChanges error:", err);
      onError(err.message);
    }
  };
  
  export const deleteCurrentUser = async (onSuccess, onError) => {
    console.log("[userController] deleteCurrentUser start");
    try {
      const user = auth.currentUser;
      if (!user) throw new Error("No hay usuario autenticado");
      const uid = user.uid;
  
      // 1) Borramos doc en Firestore
      await deleteUserData(uid);
      console.log("[userController] Firestore doc deleted");
  
      // 2) Borramos usuario de Auth
      await user.delete();
      console.log("[userController] Auth user deleted");
  
      // ¡YA NO hacemos signOut() aquí!  
      onSuccess();    
    } catch (err) {
      console.error("[userController] deleteCurrentUser error:", err);
      onError(err.message);
    }
  };
  