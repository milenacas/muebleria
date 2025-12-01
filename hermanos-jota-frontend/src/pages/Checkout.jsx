import "../CSS/Checkout.css";
import { useCart } from "../context/CartContext";
import { useState } from "react";

export default function Checkout() {
  const { cart, updateQuantity, clearCart } = useCart(); // agregamos clearCart
  const [isPurchasing, setIsPurchasing] = useState(false);

  const total = cart.reduce(
    (acc, item) => acc + item.precio * item.cantidad,
    0
  );

  const handlePurchase = async () => {
    if (cart.length === 0) return alert("No hay productos en el carrito.");

    setIsPurchasing(true);

    try {
      // Simulación de llamada a API
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Compra exitosa
      clearCart(); // ✅ limpiamos carrito
      alert("¡Compra realizada con éxito!");
    } catch (error) {
      console.error(error);
      alert("Hubo un error procesando la compra.");
    } finally {
      setIsPurchasing(false);
    }
  };

  return (
    <div className="checkout-container">
      {/* columna izquierda */}
      <div className="checkout-products">
        <h2 className="section-title">Tus productos</h2>

        {cart.length === 0 ? (
          <p>No hay productos en el carrito.</p>
        ) : (
          cart.map((item) => (
            <div key={item.id} className="checkout-item">
              <div className="item-left">
                <input type="checkbox" className="item-check" />

                <img
                  src={item.imagenUrl}
                  alt={item.nombre}
                  className="item-image"
                />

                <div className="item-info">
                  <h4>{item.nombre}</h4>
                  <p>Precio unitario: ${item.precio}</p>

                  <div className="item-qty-box">
                    <button
                      className="qty-btn"
                      onClick={() =>
                        updateQuantity(item.id, item.cantidad - 1)
                      }
                    >
                      -
                    </button>

                    <span>{item.cantidad}</span>

                    <button
                      className="qty-btn"
                      onClick={() =>
                        updateQuantity(item.id, item.cantidad + 1)
                      }
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>

              <p className="item-subtotal">
                Subtotal: <strong>${item.precio * item.cantidad}</strong>
              </p>
            </div>
          ))
        )}
      </div>

      {/* columna derecha */}
      <div className="checkout-summary">
        <h3>Resumen de compra</h3>

        <div className="summary-total">
          <span>Total</span>
          <strong>${total}</strong>
        </div>

        <button
          className="checkout-btn11"
          onClick={handlePurchase}
          disabled={isPurchasing || cart.length === 0}
        >
          {isPurchasing ? "Procesando..." : "Continuar compra"}
        </button>
      </div>
    </div>
  );
}
