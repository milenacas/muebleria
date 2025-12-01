import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import "../CSS/login.css";

function ProfilePage() {
  const { usuario, updateUsuario, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    nombre: usuario?.nombre || "",
    email: usuario?.email || "",
    foto: usuario?.foto || "",
    direcciones: usuario?.direcciones || [""],
  });
  const [preview, setPreview] = useState(usuario?.foto || "");

  // 🔹 Redirigir al home si se desconecta
  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  const handleChange = (e, index = null) => {
    const { name, value, files } = e.target;

    if (name === "foto" && files && files[0]) {
      const file = files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result); // previsualización
        setFormData({ ...formData, foto: reader.result }); // guardamos la imagen en base64
      };
      reader.readAsDataURL(file);
    } else if (name === "direcciones" && index !== null) {
      const newDirecciones = [...formData.direcciones];
      newDirecciones[index] = value;
      setFormData({ ...formData, direcciones: newDirecciones });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const addDireccion = () => {
    setFormData({ ...formData, direcciones: [...formData.direcciones, ""] });
  };

  const removeDireccion = (index) => {
    const newDirecciones = formData.direcciones.filter((_, i) => i !== index);
    setFormData({ ...formData, direcciones: newDirecciones });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateUsuario(formData);
    alert("Perfil actualizado correctamente");
  };

  return (
    <div className="profile-page">
      <h2>Mi Perfil</h2>
      <form onSubmit={handleSubmit} className="profile-form">
        <div className="form-group">
          <label>Nombre:</label>
          <input
            type="text"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Foto de Perfil:</label>
          <input
            type="file"
            name="foto"
            accept="image/*"
            onChange={handleChange}
          />
          {preview && (
            <img
              src={preview}
              alt="Perfil"
              className="profile-img-preview"
            />
          )}
        </div>

        <div className="form-group">
          <label>Direcciones:</label>
          {formData.direcciones.map((dir, index) => (
            <div key={index} className="direccion-item">
              <input
                type="text"
                name="direcciones"
                value={dir}
                onChange={(e) => handleChange(e, index)}
              />
              <button type="button" onClick={() => removeDireccion(index)}>
                Eliminar
              </button>
            </div>
          ))}
          <button type="button" className="save-btn" onClick={addDireccion}>
            Agregar dirección
          </button>
        </div>

        <button type="submit" className="save-btn">
          Guardar Cambios
        </button>
      </form>
    </div>
  );
}

export default ProfilePage;

