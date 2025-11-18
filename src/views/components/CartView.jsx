// src/views/components/CartView.jsx
import React, { useState, useEffect } from 'react'; 
import { useCart } from '../../context/CartContext';
import { useNavigate } from 'react-router-dom';
import { db, auth } from '../../firebase/firebaseConfig'; 
import { collection, getDocs } from 'firebase/firestore';
import styles from '../../styles/CartView.module.css';

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
      <div className={styles['cart-page']}>
        <div className={styles['loading-container']}>
          <div className={styles['loading-spinner']}></div>
          <p>Cargando carrito...</p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles['cart-page']}>
      <div className={styles['cart-header']}>
        <h1>Tu Carrito</h1>
        <div className={styles['cart-counter']}>
          <span className={styles['counter-badge']}>{itemCount}</span>
          <span className={styles['counter-text']}>
            {itemCount === 1 ? 'servicio' : 'servicios'}
          </span>
        </div>
      </div>

      {cartItems.length === 0 ? (
        <div className={styles['empty-cart']}>
          <div className={styles['empty-cart-icon']}>🛒</div>
          <h2>Tu carrito está vacío</h2>
          <p>¡Descubre nuestros increíbles servicios y añade algunos a tu carrito!</p>
          <button 
            className={`${styles.btn} ${styles['btn-primary']} ${styles['explore-btn']}`}
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
                <div key={item.id + item.Nombre} className={styles['cart-item-card']}>
                  <div className={styles['item-image']}>
                    {item.imageFileName ? (
                      <img src={item.imageFileName} alt={item.Nombre} />
                    ) : (
                      <div className={styles['placeholder-image']}>
                        <span>📋</span>
                      </div>
                    )}
                  </div>
                  
                  <div className={styles['item-details']}>
                    <h3>{item.Nombre}</h3>
                    <div className={styles['item-info']}>
                      <span className={styles.price}>${parseFloat(item.Precio || 0).toLocaleString('es-CO')} COP</span>
                      {item.Duracion && (
                        <span className={styles.duration}>⏱️ {item.Duracion} min</span>
                      )}
                    </div>
                    {item.quantity > 1 && (
                      <div className={styles['quantity-info']}>
                        <span className={styles['quantity-badge']}>x{item.quantity}</span>
                        <span className={styles.subtotal}>
                          Subtotal: ${(parseFloat(item.Precio || 0) * item.quantity).toLocaleString('es-CO')} COP
                        </span>
                      </div>
                    )}
                  </div>

                  <button
                    className={`${styles['remove-item-btn']} ${removing === item.id ? styles.removing : ''}`}
                    onClick={() => handleRemoveItem(item)}
                    disabled={removing === item.id}
                  >
                    {removing === item.id ? (
                      <span className={styles['loading-text']}>Eliminando...</span>
                    ) : (
                      <>
                        <span className={styles['remove-icon']}>🗑️</span>
                        Eliminar
                      </>
                    )}
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className={styles["cart-summary"]}>
            <div className={styles["summary-content"]}>
              <div className={styles["summary-details"]}>
                <h2>Resumen del pedido</h2>
                <div className={styles["summary-line"]}>
                  <span>Servicios ({itemCount})</span>
                  <span>${total.toLocaleString('es-CO')} COP</span>
                </div>
                <div className={styles["summary-line total-line"]}>
                  <span>Total</span>
                  <span className={styles["total-amount"]}>${total.toLocaleString('es-CO')} COP</span>
                </div>
              </div>
              
              <div className={styles["summary-actions"]}>
                <button 
                  className={`${styles.btn} ${styles['btn-primaryC']} ${styles['checkout-btn']}`} 
                  onClick={handleCheckout}
                >
                  <span className={styles['btn-icon']}>💳</span>
                  Proceder al Pago
                </button>
                <button
                  className={`${styles.btn} ${styles['btn-secondaryV']} ${styles['clear-btn']}`}
                  onClick={handleClearCart}
                >
                  <span className={styles['btn-icon']}>🗑️</span>
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