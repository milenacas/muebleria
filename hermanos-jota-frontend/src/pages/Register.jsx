import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    nombre: "",
    email: "",
    password: ""
  });

  const [mensaje, setMensaje] = useState("");

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
<<<<<<< HEAD
const res = await fetch(
  `${process.env.REACT_APP_API_URL}/api/auth/registro`,
  {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(form),
  }
);

const data = await res.json();

=======
      const res = await fetch("http://localhost:3001/api/auth/registro", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();
>>>>>>> 290b00bede7983c776ef5ebe192663f65796f82a

      if (!data.success) {
        setMensaje(data.mensaje || "Error en el registro");
        return;
      }

      // OPCIONAL: Guardar el token si tu backend lo devuelve en /register
      if (data.token) {
        localStorage.setItem("token", data.token);
      }

      setMensaje("Registro exitoso, ya puedes iniciar sesión");

      setTimeout(() => {
        navigate("/login");
      }, 1500); // tiempo para visualizar mensaje

    } catch (error) {
      setMensaje("Error conectando al servidor");
    }
  };

  return (
    <div className="auth-container">
      <h2>Crear cuenta</h2>

      {mensaje && <p className="error">{mensaje}</p>}

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="nombre"
          placeholder="Nombre completo"
          value={form.nombre}
          onChange={handleChange}
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Correo electrónico"
          value={form.email}
          onChange={handleChange}
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Contraseña"
          value={form.password}
          onChange={handleChange}
          required
        />

             <input
          type="password"
          name="repeatPassword"
          placeholder="Repite la contraseña"
          value={form.repeatPassword}
          onChange={handleChange}
        />


        <button type="submit" className="btn-primary">
          Registrarme
        </button>
      </form>

      <button
        className="btn-outline"
        style={{ marginTop: "10px" }}
      onClick={() => navigate("/login")}

      >
        Ya tengo cuenta
      </button>
    </div>
  );
}
