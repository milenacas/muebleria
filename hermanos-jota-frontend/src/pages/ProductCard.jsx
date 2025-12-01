import React, { useState } from "react";
import "../CSS/ProductosCard.css";

function ProductosCard({ productos, onSelectProduct }) {
  const [search, setSearch] = useState("");
  const [showList, setShowList] = useState(false);

  // Filtrado de productos por nombre
  const productosFiltrados = productos.filter((p) =>
    p.nombre.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="pc-root">
      <div className="pc-contenido-principal">

        {/* Título + Buscador */}
        <div className="pc-header-productos">
          <h1 className="pc-titulodeproductos">Productos</h1>

          <div className="pc-buscador-header">
            <div className="pc-InputContainer">
              <input
                id="pc-input"
                placeholder="Buscar producto..."
                className="pc-input"
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onFocus={() => setShowList(true)}
                onBlur={() => setTimeout(() => setShowList(false), 100)}
              />

              <label className="pc-labelforsearch" htmlFor="pc-input">
                <svg className="pc-searchIcon" viewBox="0 0 512 512">
                  <path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5
                    12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8
                    40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1
                    416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z" />
                </svg>
              </label>

              {/* Lista desplegable de búsqueda */}
              {showList && productosFiltrados.length > 0 && (
                <ul className="pc-lista-productos">
                  {productosFiltrados.map((p) => (
                    <li key={p.id} onMouseDown={() => onSelectProduct(p.id)}>
                      {p.nombre}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>

        {/* Grid de productos */}
        <div id="pc-productos-container" className="pc-productos">
          {productos.map((p) => (
            <div className="pc-card" key={p.id}>
              <img src={p.imagenUrl} alt={p.nombre} width="200" />
              <div className="pc-card-content">
                <h2 className="pc-nombreproductocard">{p.nombre}</h2>
                <p className="pc-precio">${p.precio.toLocaleString()}</p>
                <button
                  className="pc-btn pc-btnDetalle"
                  onClick={() => onSelectProduct(p.id)}
                >
                  Detalle de producto
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}

export default ProductosCard;
