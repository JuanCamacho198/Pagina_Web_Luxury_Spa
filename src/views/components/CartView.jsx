import React from 'react';
import { useCart } from './CartContext';
import { useNavigate } from 'react-router-dom';
import '../../styles/CartView.css';

export default function CartView() {
  const { cartItems, removeItem, clearCart, cartCount } = useCart();
  const navigate = useNavigate();

  // Calcular el total (si el precio es numérico)
  const total = cartItems.reduce((sum, item) => sum + parseFloat(item.Precio || 0), 0);

  // Manejar el clic en "Proceder al Pago"
  const handleCheckout = () => {
    if (cartCount > 0) {
      // Redirigir a la página de checkout ( CheckoutView )
      // En el CheckoutView, leeremos los items del carrito directamente del contexto
      navigate('/checkout'); // Ya no pasamos serviceId por URL, CheckoutView leerá del carrito
    } else {
      alert("Tu carrito está vacío.");
    }
  };

  return (
    <div className="cart-page">
      <h1>Tu Carrito de Servicios ({cartCount})</h1>

      {cartCount === 0 ? (
        <p className="empty-cart">Tu carrito está vacío. ¡Añade algunos servicios!</p>
      ) : (
        <div className="cart-items-list">
          {cartItems.map(item => (
            <div key={item.id} className="cart-item-card">
              <div className="item-image">
                 {item.imageFileName && <img src={`/assets/${item.imageFileName}`} alt={item.Nombre} />}
              </div>
              <div className="item-details">
                <h3>{item.Nombre}</h3>
                <p>Precio: {item.Precio} COP</p>
                {item.Duracion && <p>Duración: {item.Duracion} minutos</p>}
                 {/* añadir cantidad si la implementación esta en el contexto */}
                 {/* <p>Cantidad: {item.quantity}</p> */}
              </div>
              <button className="remove-item-btn" onClick={() => removeItem(item.id)}>
                Eliminar
              </button>
            </div>
          ))}
        </div>
      )}

      {cartCount > 0 && (
        <div className="cart-summary">
          <h2>Resumen del Carrito</h2>
          <p>Total: {total.toFixed(2)} COP</p>
          <button className="btn btn-primary" onClick={handleCheckout}>
            Proceder al Pago ({cartCount} {cartCount === 1 ? 'servicio' : 'servicios'})
          </button>
           <button className="btn btn-secondary" onClick={clearCart} style={{ marginTop: '10px' }}>
            Vaciar Carrito
          </button>
        </div>
      )}
    </div>
  );
}