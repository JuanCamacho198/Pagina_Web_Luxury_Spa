import React, { createContext, useState, useContext } from 'react';

// Creamos el Contexto
const CartContext = createContext();

// Hook personalizado para usar el contexto del carrito
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart debe ser usado dentro de un CartProvider');
  }
  return context;
};

// Proveedor del Contexto del Carrito
export const CartProvider = ({ children }) => {
  // El estado del carrito será un array de servicios
  const [cartItems, setCartItems] = useState([]);

  // Función para añadir un servicio al carrito
  const addItem = (service) => {
    const existingItem = cartItems.find(item => item.id === service.id);

    if (existingItem) {
      console.log("Este servicio ya está en el carrito.");
    } else {
      // Si no existe, añadimos el servicio al array
      setCartItems([...cartItems, service]); // Añadimos el servicio completo
      console.log("Servicio añadido al carrito:", service.Nombre);
    }
  };

  // Función para remover un servicio del carrito
  const removeItem = (serviceId) => {
    setCartItems(cartItems.filter(item => item.id !== serviceId));
    console.log("Servicio removido del carrito:", serviceId);
  };

  // Función para vaciar completamente el carrito
  const clearCart = () => {
    setCartItems([]);
    console.log("Carrito vaciado.");
  };

  const contextValue = {
    cartItems, // El array de ítems en el carrito
    addItem,   // Función para añadir
    removeItem,// Función para remover
    clearCart, // Función para vaciar
    cartCount: cartItems.length,
  };

  return (
    <CartContext.Provider value={contextValue}>
      {children}
    </CartContext.Provider>
  );
};