import React, { useState } from "react";
import "../CSS/CRUD.css";

function CRUDDemo({ productos, setProductos }) {
  const [nombre, setNombre] = useState("");
  const [precio, setPrecio] = useState(0);
  const [editId, setEditId] = useState(null);
  const [editNombre, setEditNombre] = useState("");
  const [editPrecio, setEditPrecio] = useState(0);

  // --- CREATE (Optimistic Update) ---
  const handleCreate = async (e) => {
    e.preventDefault();
    if (!nombre || precio <= 0) return alert("Nombre y precio válidos son requeridos.");

    const tempId = Date.now();
    const newProduct = {
      _id: tempId,
      nombre,
      precio: Number(precio),
      isPending: true, // Nuevo indicador de estado
    };

    // 1. Renderizar inmediatamente el producto temporal
    setProductos([...productos, newProduct]);
    setNombre("");
    setPrecio(0);


try {
  const res = await fetch(`${process.env.REACT_APP_API_URL}/api/productos`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ nombre, precio: Number(precio) }),
  });

const data = await res.json(); // ← ESTA LÍNEA FALTABA



      // 2. Manejar la respuesta del backend
      if (data.success) {
        // Reemplazar el producto temporal con el producto real
        setProductos(prevProductos =>
          prevProductos.map(p => (p._id === tempId ? data.data : p))
        );
      } else {
        // Revertir: Eliminar el producto temporal si falla
        setProductos(prevProductos => prevProductos.filter(p => p._id !== tempId));
        alert(`Error al crear producto: ${data.message || 'Inténtalo de nuevo.'}`);
      }
    } catch (err) {
      console.error(err);
      // Revertir: Eliminar el producto temporal si falla la red
      setProductos(prevProductos => prevProductos.filter(p => p._id !== tempId));
      alert("Error de conexión. El producto no se creó.");
    }
  };

  // --- START EDIT (Sin cambios) ---
  const startEdit = (producto) => {
    setEditId(producto._id);
    setEditNombre(producto.nombre);
    setEditPrecio(producto.precio);
  };

  // --- SAVE EDIT (Optimistic Update) ---
  const saveEdit = async (id) => {
    if (!editNombre || editPrecio <= 0) return alert("Nombre y precio válidos son requeridos.");
    
    // Obtener el producto original para una posible reversión
    const originalProduct = productos.find(p => p._id === id);

    // 1. Aplicar la edición inmediatamente y añadir un indicador
    setProductos(prevProductos => prevProductos.map(p => 
        p._id === id 
            ? { ...p, nombre: editNombre, precio: Number(editPrecio), isPending: true, originalState: originalProduct } 
            : p
    ));
    cancelEdit();

    try {
       const res = await fetch(`http://localhost:3001/api/productos/${id}`, {

        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nombre: editNombre, precio: Number(editPrecio) }),
      });
      const data = await res.json();
      

      // 2. Manejar la respuesta del backend
      if (data.success) {
        // Quitar el indicador de pendiente y originalState
        setProductos(prevProductos => 
            prevProductos.map(p => (p._id === id ? { ...data.data, isPending: false } : p))
        );
      } else {
        // Revertir: Volver al estado original si falla
        setProductos(prevProductos => 
            prevProductos.map(p => 
                p._id === id ? { ...p.originalState, isPending: false } : p
            )
        );
        alert(`Error al guardar: ${data.message || 'Inténtalo de nuevo.'}`);
      }
    } catch (err) {
        console.error(err);
        // Revertir: Volver al estado original si falla la red
        setProductos(prevProductos => 
            prevProductos.map(p => 
                p._id === id ? { ...p.originalState, isPending: false } : p
            )
        );
        alert("Error de conexión. La edición no se guardó.");
    }
  };

  // --- CANCEL EDIT (Sin cambios) ---
  const cancelEdit = () => {
    setEditId(null);
    setEditNombre("");
    setEditPrecio(0);
  };

  // --- DELETE (Optimistic Update) ---
  const handleDelete = async (id) => {
    if (!window.confirm("¿Seguro quieres eliminar este producto?")) return;
    
    // 1. Eliminar de la UI inmediatamente
    setProductos(prevProductos => prevProductos.filter((p) => p._id !== id));

    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/api/productos/${id}`, {

        method: "DELETE",
      });
      const data = await res.json();

      // 2. Manejar la respuesta del backend
      if (!data.success) {
        // Revertir: Si falla, traer el producto de vuelta (idealmente con el producto original antes de borrarlo)
        // Ya que no tenemos el producto original aquí, usaremos la lógica de tu backend para que el usuario sepa que falló.
        alert(`Error al eliminar: ${data.message || 'El producto no fue eliminado. Recarga para restaurar.'}`);
        // Nota: En un caso real, guardaríamos el producto antes de borrar para poder restaurarlo con todos sus datos.
      }
    } catch (err) {
      console.error(err);
      alert("Error de conexión. El producto no fue eliminado. Recarga para restaurar.");
    }
  };

  return (
    <div className="crud-container">
      <h2>CRUD Demo</h2>

      {/* FORMULARIO CREATE */}
      <form onSubmit={handleCreate} className="crud-form">
        <input
          type="text"
          placeholder="Nombre del producto"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
        />
        <input
          type="text"
          placeholder="Precio"
          value={precio === 0 ? "" : `$${precio}`}
          onChange={(e) => {
            const value = e.target.value.replace(/\$/g, "");
            setPrecio(Number(value));
          }}
        />
        <button type="submit">Crear Producto</button>
      </form>

      {/* LISTADO DE PRODUCTOS */}
      <ul className="crud-list">
        {productos.map((p) => (
          <li key={p._id}>
            {editId === p._id ? (
              // Modo edición (Sin cambios, usa el estado editNombre/editPrecio)
              <div className="edit-row">
                <input
                  type="text"
                  value={editNombre}
                  onChange={(e) => setEditNombre(e.target.value)}
                />
                <input
                  type="text"
                  value={editPrecio === 0 ? "" : `$${editPrecio}`}
                  onChange={(e) => {
                    const value = e.target.value.replace(/\$/g, "");
                    setEditPrecio(Number(value));
                  }}
                />
                <button onClick={() => saveEdit(p._id)}>Guardar</button>
                <button onClick={cancelEdit}>Cancelar</button>
              </div>
            ) : (
              // Modo vista
              <div className="view-row">
                {p.nombre} - ${p.precio.toFixed(2)}
                
                {/* 🚨 Indicador de estado pendiente */}
                {p.isPending && (
                    <span style={{ color: 'orange', marginLeft: '10px', fontStyle: 'italic' }}>
                        (Guardando...)
                    </span>
                )}
                
                <div>
                    {/* Desactivar acciones si está pendiente o si es un ID temporal de creación */}
                    <button 
                        onClick={() => startEdit(p)} 
                        disabled={p.isPending || typeof p._id !== 'string'}
                    >
                        Editar
                    </button>
                    <button 
                        onClick={() => handleDelete(p._id)} 
                        disabled={p.isPending || typeof p._id !== 'string'}
                    >
                        Eliminar
                    </button>
                </div>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CRUDDemo;