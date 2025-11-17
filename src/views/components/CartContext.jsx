// src/views/components/CartContext.jsx
import React, { createContext, useContext, useEffect, useState } from 'react';
import { getFirestore, collection, getDocs, doc, deleteDoc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);
  const [cartCount, setCartCount] = useState(0);

  const auth = getAuth(); // Definir una sola vez
  const db = getFirestore(); 

  const loadCartFromFirestore = async () => {
    try {
      const user = auth.currentUser;

      if (!user) {
        console.warn("Usuario no autenticado.");
        return;
      }
      //subcoleccion Carrito dentro de Usuarios
      const userCartRef = collection(db, 'Usuarios', user.uid, 'Carrito');
      const snapshot = await getDocs(userCartRef);

      const items = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

      setCartItems(items);
      setCartCount(items.length);
    } catch (error) {
      console.error("Error al cargar el carrito desde Firestore:", error);
    }
  };
  //limpiar el Carrito
  const clearCart = async () => {
    const user = auth.currentUser;
    if (!user) {
      console.warn("Usuario no autenticado.");
      return;
    }
    
    const userCartRef = collection(db, "Usuarios", user.uid, "Carrito");
    
    try {
      const snapshot = await getDocs(userCartRef);
      const batchDeletes = snapshot.docs.map((docSnapshot) =>
        deleteDoc(doc(db, "Usuarios", user.uid, "Carrito", docSnapshot.id))
      );
      
      await Promise.all(batchDeletes);
      
      setCartItems([]);
      setCartCount(0);
    } catch (error) {
      console.error("Error al vaciar el carrito:", error);
    }
  };
  //quitar servicio del carrito
  const removeItem = async (itemId) => {
    try {
      const user = auth.currentUser;
      if (!user) {
        console.warn("Usuario no autenticado.");
        return;
      }

      const itemDocRef = doc(db, 'Usuarios', user.uid, 'Carrito', itemId);
      await deleteDoc(itemDocRef);

      const updatedItems = cartItems.filter(item => item.id !== itemId);
      setCartItems(updatedItems);
      setCartCount(updatedItems.length);
    } catch (error) {
      console.error("Error al eliminar el ítem del carrito:", error);
    }
  };

  return (
    <CartContext.Provider value={{ cartItems, setCartItems, cartCount, loadCartFromFirestore, clearCart, removeItem }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
