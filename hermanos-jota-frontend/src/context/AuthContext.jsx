import React, { createContext, useState, useContext } from "react";
import axios from "axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [usuario, setUsuario] = useState(
    JSON.parse(localStorage.getItem("usuario")) || null
  );
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const [errorMessage, setErrorMessage] = useState(null);

  const isAuthenticated = Boolean(token);

<<<<<<< HEAD
// LOGIN
const login = async ({ email, password }) => {
  try {
    const res = await axios.post(
      `${process.env.REACT_APP_API_URL}/api/auth/login`,
      { email, password }
    );

    setToken(res.data.token);
    localStorage.setItem("token", res.data.token);

    setUsuario(res.data.usuario);
    localStorage.setItem("usuario", JSON.stringify(res.data.usuario));

    setErrorMessage(null);
    return true;
  } catch (err) {
    setErrorMessage("Credenciales incorrectas");
    return false;
  }
};

// REGISTRO
const register = async (form) => {
  try {
    const res = await axios.post(
      `${process.env.REACT_APP_API_URL}/api/auth/registro`,
      form
    );

    setToken(res.data.token);
    localStorage.setItem("token", res.data.token);

    setUsuario(res.data.usuario);
    localStorage.setItem("usuario", JSON.stringify(res.data.usuario));

    setErrorMessage(null);
    return true;
  } catch (err) {
    setErrorMessage("Error al registrarse");
    return false;
  }
};

=======
  // LOGIN
  const login = async ({ email, password }) => {
    try {
      const res = await axios.post("http://localhost:3001/api/auth/login", { email, password });

      setToken(res.data.token);
      localStorage.setItem("token", res.data.token);

      setUsuario(res.data.usuario);
      localStorage.setItem("usuario", JSON.stringify(res.data.usuario));

      setErrorMessage(null);
      return true;
    } catch (err) {
      setErrorMessage("Credenciales incorrectas");
      return false;
    }
  };

  // REGISTRO
  const register = async (form) => {
    try {
      const res = await axios.post("http://localhost:3001/api/auth/registro", form);

      setToken(res.data.token);
      localStorage.setItem("token", res.data.token);

      setUsuario(res.data.usuario);
      localStorage.setItem("usuario", JSON.stringify(res.data.usuario));

      setErrorMessage(null);
      return true;
    } catch (err) {
      setErrorMessage("Error al registrarse");
      return false;
    }
  };
>>>>>>> 290b00bede7983c776ef5ebe192663f65796f82a

  // LOGOUT
  const logout = () => {
    setUsuario(null);
    setToken(null);
    localStorage.removeItem("token");
    localStorage.removeItem("usuario");
  };

  // ACTUALIZAR PERFIL LOCALMENTE
  const updateUsuario = (updatedData) => {
    const nuevoUsuario = { ...usuario, ...updatedData };
    setUsuario(nuevoUsuario);
    localStorage.setItem("usuario", JSON.stringify(nuevoUsuario));
  };

  return (
    <AuthContext.Provider
      value={{
        usuario,
        token,
        isAuthenticated,
        login,
        logout,
        register,
        updateUsuario,
        errorMessage,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Hook para usar AuthContext fácilmente
export const useAuth = () => useContext(AuthContext);
