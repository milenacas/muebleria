import React, { useState, useEffect } from "react";

// COMPONENTES
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ProductosCard from "./pages/ProductCard.jsx";
import DetalleProducto from "./pages/ProductDetail.jsx";
import ContactForm from "./pages/ContactForm.jsx";
import CRUDDemo from "./components/CRUDDemo.jsx";
import CartPopup from "./components/CartPopup";
import FavoritesPopup from "./components/FavoritesPopup";
import Nosotros from "./pages/Nosotros.jsx";
import Login from "./pages/Login";
import Register from "./pages/Register";
import CartButton from './components/Cartbuttom.jsx'; 
import Checkout from "./pages/Checkout.jsx";
import ProfilePage from "./pages/ProfilePage.jsx"; 


// CONTEXTOS
import { useCart } from "./context/CartContext.jsx";

import "./App.css";

function App() {
  // ---------- DATA ----------
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // ---------- NAVEGACIÓN ----------
  const [currentView, setCurrentView] = useState("home");
  const [selectedProduct, setSelectedProduct] = useState(null);

  // ---------- CART (de contexto) ----------
  const { cart } = useCart();
  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // ---------- FAVORITOS ----------
  const [favorites, setFavorites] = useState([]);
  const [isFavoritesOpen, setIsFavoritesOpen] = useState(false);

  // Simular fetch de productos
  useEffect(() => {
    try {
      setProductos(productosDetalle);
    } catch (err) {
      console.error("Error al cargar productos:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  // Navegación general
  const handleNavigate = (view) => {
    setCurrentView(view);
    setSelectedProduct(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  const handleMenuItemClick = (route, action) => {
  if (action) action();
  if (route) handleNavigate(route);
};


  const handleSelectProduct = (id) => {
    const productoFull = productos.find(
      (p) => p.id === id || p._id === id || p.idProducto === id
    );
    if (productoFull) {
      setSelectedProduct(productoFull);
      setCurrentView("detalle");
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleBackToCatalog = () => {
    setSelectedProduct(null);
    setCurrentView("productos");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // ---------- FAVORITOS ----------
  const handleToggleFavorite = (producto) => {
    setFavorites((prev) => {
      const existe = prev.find((item) => item.id === producto.id);
      if (existe) return prev.filter((item) => item.id !== producto.id);
      return [...prev, producto];
    });
  };



  const handleRemoveFavorite = (id) =>
    setFavorites((prev) => prev.filter((item) => item.id !== id));

  // ---------- RENDER SEGÚN VISTA ----------
  const renderContent = () => {
    if (currentView === "detalle" && selectedProduct) {
      return (
        <DetalleProducto
          producto={selectedProduct}
          onBack={handleBackToCatalog}
          onSelectProduct={handleSelectProduct}
          onToggleFavorite={handleToggleFavorite}
          favorites={favorites}
        />
      );
    }

    if (currentView === "login") return <Login handleNavigate={handleNavigate} />;
    if (currentView === "registro") return <Register handleNavigate={handleNavigate} />;
    if (currentView === "contacto") return <ContactForm />;

    if (currentView === "checkout") {
      return <Checkout />;
    }

    if (currentView === "productos") {
      return (
        <ProductosCard
          productos={productos}
          loading={loading}
          error={error}
          onSelectProduct={handleSelectProduct}
        />
      );
    }

    if (currentView === "nosotros")
      return <Nosotros handleNavigate={handleNavigate} />;

    if (currentView === "crud-demo")
      return <CRUDDemo productos={productos} setProductos={setProductos} />;
    if (currentView === "direcciones") {
  return <ProfilePage />;
}


    // ---------- HOME ----------
    return (
      <>
        <section className="hero">
          <div className="hero-container">
            <div className="hero-content">
              <h1>EL ARTE DE CREAR MUEBLES QUE ALIMENTAN EL ALMA</h1>
              <p className="hero-subtitle">Donde la herencia se encuentra con la innovación</p>
              <p className="hero-description">
                Cada pieza cuenta la historia de manos expertas y materiales nobles.
              </p>
              <div className="cta-buttons">
                <button
                  onClick={() => handleNavigate("productos")}
                  className="btn btn-primary"
                >
                  Ver Colección
                </button>
                <button
                  onClick={() => handleNavigate("contacto")}
                  className="btn btn-secondary"
                >
                  Contacto
                </button>
              </div>
            </div>

            <div className="banner">
              <aside>
                <div id="carrusel-contenido">
                  <div id="carrusel-caja">
                    <div className="carrusel-elemento">
                      <img src="https://i.postimg.cc/3rjT3PnW/Sillas-C-rdoba.png" alt="Sillas Córdoba" />
                    </div>
                    <div className="carrusel-elemento">
                      <img src="https://i.postimg.cc/zXJ1v0cF/Sill-n-Copacabana.png" alt="Sillón Copacabana" />
                    </div>
                    <div className="carrusel-elemento">
                      <img src="https://i.postimg.cc/j2h0v7DY/Silla-de-Trabajo-Belgrano.png" alt="Silla Belgrano" />
                    </div>
                  </div>
                </div>
              </aside>
            </div>
          </div>
        </section>

        <section className="section section-alt">
          <div className="container">
            <div className="section-header">
              <h2 className="section-title">PRODUCTOS DESTACADOS</h2>
              <p className="section-subtitle">Un adelanto de nuestra colección artesanal</p>
            </div>

            <div className="products-grid">
              {loading && <p>Cargando productos...</p>}
              {error && <p>Error: {error}</p>}
              {!loading &&
                !error &&
                productos.slice(0, 3).map((producto) => (
                  <div
                    key={producto.id}
                    className="product-card"
                    onClick={() => handleSelectProduct(producto.id)}
                  >
                    <div className="product-image">
                      <img
                        src={producto.imagenUrl}
                        alt={producto.nombre}
                        className="product-img"
                      />
                      {producto.certificacion && (
                        <div className="sustainability-badge">{producto.certificacion}</div>
                      )}
                    </div>
                    <div className="product-info">
                      <h3 className="product-title">{producto.nombre}</h3>
                      <p className="product-description">
                        {producto.descripcion?.substring(0, 80)}...
                      </p>
                      <div className="product-price">${producto.precio}</div>
                    </div>
                  </div>
                ))}
            </div>

            <div className="section-header" style={{ marginTop: "2rem" }}>
              <button
                onClick={() => handleNavigate("productos")}
                className="btn btn-secondary"
              >
                Ver Todos los Productos
              </button>
            </div>
          </div>
        </section>
      </>
    );
  };

  // ---------- LAYOUT PRINCIPAL ----------
  return (
    <div className="App">
      <Navbar
        cartCount={cartCount}
        favoritesCount={favorites.length}
        onNavigate={handleNavigate}
        onCartClick={() => setIsCartOpen(true)}
        onFavoritesClick={() => setIsFavoritesOpen(true)}
      />

      <CartButton onClick={() => setIsCartOpen(true)} itemCount={cartCount} />

      <main>{renderContent()}</main>

    

      <CartPopup
  isOpen={isCartOpen}
  onClose={() => setIsCartOpen(false)}
  handleMenuItemClick={handleMenuItemClick}
/>


      <FavoritesPopup
        isOpen={isFavoritesOpen}
        favorites={favorites}
        onClose={() => setIsFavoritesOpen(false)}
        onRemove={handleRemoveFavorite}
      />

      <Footer />
    </div>
  );
}

export default App;