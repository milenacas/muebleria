import React, { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";

function Navbar({ cartCount, onNavigate, onCartClick }) {
  const { usuario, logout, isAuthenticated } = useContext(AuthContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleMenuItemClick = (route, action) => {
    if (action) action();
    if (route) onNavigate(route);
    setIsMenuOpen(false);
  };

  return (
    <header className="header">
      <nav className="nav-container">
        <button onClick={() => onNavigate("home")} className="logo-button">
          <img src="./logo.svg" alt="logo" className="logo-img" />
          <h1 className="logo">HERMANOS JOTA</h1>
        </button>

        <ul className="nav-menu">
          <li>
            <button onClick={() => onNavigate("home")} className="nav-link">
              Inicio
            </button>
          </li>

          <li>
            <button onClick={() => onNavigate("crud-demo")} className="nav-link">
              DEMO CRUD
            </button>
          </li>

          <li>
            <button onClick={() => onNavigate("nosotros")} className="nav-link">
              Nosotros
            </button>
          </li>

          <li>
            <button onClick={() => onNavigate("productos")} className="nav-link">
              Productos
            </button>
          </li>

          <li>
            <button onClick={() => onNavigate("contacto")} className="nav-link">
              Contacto
            </button>
          </li>

          {/* ❤️ FAV */}
          <label className="containerheart">
            <input checked="checked" type="checkbox" />
            <div className="checkmark">
              <svg viewBox="0 0 256 256">
                <rect fill="none" height="256" width="256"></rect>
                <path
                  d="M224.6,51.9a59.5,59.5,0,0,0-43-19.9,60.5,60.5,0,0,0-44,17.6L128,59.1l-7.5-7.4C97.2,28.3,59.2,26.3,35.9,47.4a59.9,59.9,0,0,0-2.3,87l83.1,83.1a15.9,15.9,0,0,0,22.6,0l81-81C243.7,113.2,245.6,75.2,224.6,51.9Z"
                  strokeWidth="20px"
                  stroke="#000"
                  fill="none"
                ></path>
              </svg>
            </div>
          </label>

          {/* 🔐 LOGIN / REGISTRO */}
          {!isAuthenticated && (
            <>
              <li>
                <button onClick={() => onNavigate("login")} className="animated-button">
                  <svg viewBox="0 0 24 24" className="arr-2">
                    <path d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z" />
                  </svg>
                  <span className="text">Log in</span>
                  <span className="circle"></span>
                  <svg viewBox="0 0 24 24" className="arr-1">
                    <path d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z" />
                  </svg>
                </button>
              </li>

              <li>
                <button onClick={() => onNavigate("registro")} className="animated-button2">
                  <svg viewBox="0 0 24 24" className="arr-2">
                    <path d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z" />
                  </svg>
                  <span className="text">Sign up</span>
                  <span className="circle"></span>
                  <svg viewBox="0 0 24 24" className="arr-1">
                    <path d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z" />
                  </svg>
                </button>
              </li>
            </>
          )}

          {/* 👤 LOGGED IN CON MENÚ DESPLEGABLE */}
          {isAuthenticated && (
            <li className="profile-dropdown-container">
              {/* Botón que activa el menú. Se añade la imagen de perfil/avatar. */}
                     <button onClick={toggleMenu} className="profile-button">
                <div className="avatar-placeholder">
  {usuario?.foto ? (
    <img src={usuario.foto} alt="Avatar" className="avatar-img" />
  ) : (
    usuario?.nombre?.charAt(0).toUpperCase() || "V"
  )}
</div>

                <span className="user-name">Hola, {usuario?.nombre || "Usuario"}</span>
                <span className="arrow-icon">▼</span>
              </button>

              {/* Menú Desplegable */}
              {isMenuOpen && (
                <div className="dropdown-menu">
                 
                  
                <button 
  className="dropdown-item" 
onClick={() => handleMenuItemClick("checkout")}
>
  Mi Carrito
</button>


<button 
  className="dropdown-item" 
  onClick={() => handleMenuItemClick("direcciones")}
>
  Perfil
</button>

                  <button 
                    className="dropdown-item" 
                    onClick={() => handleMenuItemClick("metodos-pago")}
                  >
                  Métodos de pago
                  </button>
<button
  className="dropdown-item logout"
  onClick={() => {
    logout();          // Cierra sesión
    onNavigate("home"); // Redirige al inicio
    setIsMenuOpen(false); // Cierra el menú desplegable
  }}
>
  Cerrar sesión
</button>

                </div>
              )}
            </li>
          )}
           {/* Botón de carrito - Mantenido al final de la navegación principal */}
           <li>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Navbar;