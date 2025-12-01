import React, { useEffect, useState, useContext } from "react";
import "../CSS/CartPopup.css";
import { useCart } from "../context/CartContext";
import { AuthContext } from "../context/AuthContext";

function CartPopup({ isOpen, onClose, handleMenuItemClick }) {
  const { cart, removeFromCart, updateQuantity } = useCart();
  const { isAuthenticated } = useContext(AuthContext);
  const [closing, setClosing] = useState(false);

  useEffect(() => {
    if (isOpen) setClosing(false);
  }, [isOpen]);

  const handleClose = () => {
    setClosing(true);
    setTimeout(() => onClose(), 350);
  };

  const handleCheckout = () => {
    handleClose();
    if (handleMenuItemClick) {
      handleMenuItemClick(isAuthenticated ? "checkout" : "login");
    }
  };

  if (!isOpen && !closing) return null;

  const total = cart.reduce(
    (sum, item) => sum + (parseFloat(item.precio) || 0) * item.cantidad,
    0
  );

  return (
    <div
      className={`cart-popup11 ${closing ? "fade-out11" : "fade-in11"}`}
      onClick={handleClose}
    >
      <div
        className={`cart-popup11-content ${closing ? "slide-out11" : "slide-in11"}`}
        onClick={(e) => e.stopPropagation()}
      >
        <button className="close-btn11" onClick={handleClose}>✖</button>

        <h2>Carrito</h2>

        {cart.length === 0 ? (
          <p>Tu carrito está vacío.</p>
        ) : (
          <>
            <div className="cart-items-wrapper11">
              <ul className="cart-items11">
                {cart.map((item) => (
                  <li key={item.id} className="cart-item11">
                    <img
                      src={item.imagenUrl}
                      alt={item.nombre}
                      className="cart-item-image11"
                    />
                    <div className="cart-item-info11">
                      <h4>{item.nombre}</h4>
                      <p>${item.precio}</p>
                      <div className="cart-quantity11">
                        <button
                          className="qty-btn11"
                          onClick={() => updateQuantity(item.id, item.cantidad - 1)}
                        >
                          -
                        </button>
                        <span>{item.cantidad}</span>
                        <button
                          className="qty-btn11"
                          onClick={() => updateQuantity(item.id, item.cantidad + 1)}
                        >
                          +
                        </button>
                      </div>
                    </div>

                    <button
                      className="remove-btn11"
                      onClick={() => removeFromCart(item.id)}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        className="bi bi-trash3-fill11"
                        viewBox="0 0 16 16"
                      >
                        <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 
                          11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 
                          3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 
                          6.5 0h3A1.5 1.5 0 0 1 11 1.5m-5 0v1h4v-1a.5.5 
                          0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5M4.5 
                          5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 
                          0 1 0-.998.06m6.53-.528a.5.5 0 0 0-.528.47l-.5 
                          8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 
                          0-.47-.528M8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 
                          0 1 0V5a.5.5 0 0 0-.5-.5"/>
                      </svg>
                    </button>
                  </li>
                ))}
              </ul>
            </div>

      <div className="cart-total11">
              <strong>Total:</strong> ${total.toFixed(2)}
            </div>

        <button
  className="checkout-btn11"
  onClick={() =>
    handleMenuItemClick(isAuthenticated ? "checkout" : "login")
  }
>
  Finalizar compra
</button>

          </>
        )}
      </div>
    </div>
  );
}

export default CartPopup;
