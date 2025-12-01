// FavoritesPopup.jsx
import React from "react";
import "../CSS/FavoritesPopup.css";

function FavoritesPopup({ isOpen, favorites = [], onClose, onRemove }) {
  if (!isOpen) return null;

  return (
    <div className="favorites-popup">
      <div className="favorites-popup-content">
        <button className="close-btn" onClick={onClose}>✖</button>
        <h2>Favoritos</h2>

        {favorites.length === 0 ? (
          <p>No hay productos favoritos.</p>
        ) : (
          <ul className="favorites-items">
            {favorites.map((item) => (
              <li key={item.id} className="favorite-item">
                <img src={item.imagen} alt={item.nombre} className="fav-item-img" />
                <div className="fav-item-info">
                  <h4>{item.nombre}</h4>
                  <p>${item.precio}</p>
                </div>
                <button onClick={() => onRemove(item.id)} className="remove-btn">✖</button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default FavoritesPopup;
