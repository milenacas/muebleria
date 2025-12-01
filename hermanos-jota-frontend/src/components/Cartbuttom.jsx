import React from "react";
import "../CSS/CartButton.css";

function CartButton({ onClick, itemCount, total }) {
  return (
    <button className="fixed-cart-button" onClick={onClick}>
      <span className="cart-icon1">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 640 640"
          width="25"
          height="25"
          top="1"
          fill="currentColor"
        >
          <path d="M0 72C0 58.7 10.7 48 24 48L69.3 48C96.4 48 119.6 67.4 124.4 94L124.8 96L537.5 96C557.5 96 572.6 114.2 568.9 133.9L537.8 299.8C532.1 330.1 505.7 352 474.9 352L171.3 352L176.4 380.3C178.5 391.7 188.4 400 200 400L456 400C469.3 400 480 410.7 480 424C480 437.3 469.3 448 456 448L200.1 448C165.3 448 135.5 423.1 129.3 388.9L77.2 102.6C76.5 98.8 73.2 96 69.3 96L24 96C10.7 96 0 85.3 0 72zM160 528C160 501.5 181.5 480 208 480C234.5 480 256 501.5 256 528C256 554.5 234.5 576 208 576C181.5 576 160 554.5 160 528zM384 528C384 501.5 405.5 480 432 480C458.5 480 480 501.5 480 528C480 554.5 458.5 576 432 576C405.5 576 384 554.5 384 528z" />
        </svg>

        <div className="cart-total2">
          <strong>agregar al carrito</strong>
        </div>
      </span>

      {/* Burbuja del contador */}
      {itemCount > 0 && <span className="cart-badge">{itemCount}</span>}
    </button>
  );
}

export default CartButton;
