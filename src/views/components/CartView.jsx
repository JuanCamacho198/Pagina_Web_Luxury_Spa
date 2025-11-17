// src/views/components/CartView.jsx
import React, { useState, useEffect } from 'react'; 
import { useCart } from '../../context/CartContext';
import { useNavigate } from 'react-router-dom';
import { db, auth } from '../../firebase/firebaseConfig'; 
import { collection, getDocs } from 'firebase/firestore';
import '../../styles/CartView.css';

export default function CartView() {
  const { removeItem, clearCart } = useCart();
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [removing, setRemoving] = useState(null); // Para mostrar estado de eliminación
  const navigate = useNavigate();

  // Agrupar servicios por Nombre
  const groupedItems = cartItems.reduce((acc, item) => {
    const key = item.Nombre;
    if (!acc[key]) {
      acc[key] = { ...item, quantity: 1 };
    } else {
      acc[key].quantity += 1;
    }
    return acc;
  }, {});

  useEffect(() => {
    const fetchCartItems = async () => {
      setLoading(true);
      if (auth.currentUser) {
        const userCartRef = collection(db, 'Usuarios', auth.currentUser.uid, 'Carrito');
        try {
          const snapshot = await getDocs(userCartRef);
          const items = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
          setCartItems(items);
        } catch (error) {
          console.error('Error fetching cart items:', error);
        } finally {
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    };

    fetchCartItems();
  }, []);

  const total = cartItems.reduce((sum, item) => sum + parseFloat(item.Precio || 0), 0);
  const itemCount = cartItems.length;

  const handleRemoveItem = async (item) => {
    setRemoving(item.id);
    try {
      await removeItem(item.id);
      // Actualizar estado local en lugar de recargar página
      setCartItems(prev => prev.filter(cartItem => cartItem.id !== item.id));
    } catch (error) {
      console.error('Error removing item:', error);
    } finally {
      setRemoving(null);
    }
  };

  const handleClearCart = async () => {
    const confirmClear = window.confirm("¿Estás seguro de que deseas vaciar el carrito?");
    if (confirmClear) {
      try {
        await clearCart();
        setCartItems([]);
        localStorage.removeItem('cartItems');
      } catch (error) {
        console.error('Error clearing cart:', error);
      }
    }
  };

  const handleCheckout = () => {
    if (cartItems.length > 0) {
      navigate('/checkout');
    } else {
      alert("Tu carrito está vacío.");
    }
  };

  if (loading) {
    return (
      <div className="cart-page">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Cargando carrito...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <div className="cart-header">
        <h1>Tu Carrito</h1>
        <div className="cart-counter">
          <span className="counter-badge">{itemCount}</span>
          <span className="counter-text">
            {itemCount === 1 ? 'servicio' : 'servicios'}
          </span>
        </div>
      </div>

      {cartItems.length === 0 ? (
        <div className="empty-cart">
          <div className="empty-cart-icon">🛒</div>
          <h2>Tu carrito está vacío</h2>
          <p>¡Descubre nuestros increíbles servicios y añade algunos a tu carrito!</p>
          <button 
            className="btn btn-primary explore-btn"
            onClick={() => navigate('/services')}
          >
            Explorar Servicios
          </button>
        </div>
      ) : (
        <>
          <div className="cart-items-container">
            <div className="cart-items-header">
              <h2>Servicios seleccionados</h2>
            </div>
            <div className="cart-items-list">
              {Object.values(groupedItems).map(item => (
                <div key={item.id + item.Nombre} className="cart-item-card">
                  <div className="item-image">
                    {item.imageFileName ? (
                      <img src={item.imageFileName} alt={item.Nombre} />
                    ) : (
                      <div className="placeholder-image">
                        <span>📋</span>
                      </div>
                    )}
                  </div>
                  
                  <div className="item-details">
                    <h3>{item.Nombre}</h3>
                    <div className="item-info">
                      <span className="price">${parseFloat(item.Precio || 0).toLocaleString('es-CO')} COP</span>
                      {item.Duracion && (
                        <span className="duration">⏱️ {item.Duracion} min</span>
                      )}
                    </div>
                    {item.quantity > 1 && (
                      <div className="quantity-info">
                        <span className="quantity-badge">x{item.quantity}</span>
                        <span className="subtotal">
                          Subtotal: ${(parseFloat(item.Precio || 0) * item.quantity).toLocaleString('es-CO')} COP
                        </span>
                      </div>
                    )}
                  </div>

                  <button
                    className={`remove-item-btn ${removing === item.id ? 'removing' : ''}`}
                    onClick={() => handleRemoveItem(item)}
                    disabled={removing === item.id}
                  >
                    {removing === item.id ? (
                      <span className="loading-text">Eliminando...</span>
                    ) : (
                      <>
                        <span className="remove-icon">🗑️</span>
                        Eliminar
                      </>
                    )}
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="cart-summary">
            <div className="summary-content">
              <div className="summary-details">
                <h2>Resumen del pedido</h2>
                <div className="summary-line">
                  <span>Servicios ({itemCount})</span>
                  <span>${total.toLocaleString('es-CO')} COP</span>
                </div>
                <div className="summary-line total-line">
                  <span>Total</span>
                  <span className="total-amount">${total.toLocaleString('es-CO')} COP</span>
                </div>
              </div>
              
              <div className="summary-actions">
                <button 
                  className="btn btn-primaryC checkout-btn" 
                  onClick={handleCheckout}
                >
                  <span className="btn-icon">💳</span>
                  Proceder al Pago
                </button>
                <button
                  className="btn btn-secondaryV clear-btn"
                  onClick={handleClearCart}
                >
                  <span className="btn-icon">🗑️</span>
                  Vaciar Carrito
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}