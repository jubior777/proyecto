import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import LoginTemplate from "./components/templates/LoginTemplate.jsx";
import { API_URL } from "./components/constants/env.js";




const Login = () => {
  const nav = useNavigate();

  const [error, setError] = useState();
  const handleSubmit = (e) => {
    e.preventDefault(); // Evita el comportamiento por defecto del formulario
    setError()
    const data = {
      email: e.target.email.value,
      password: e.target.password.value,
    };

    axios
      .post(`${API_URL}/public/login`, data)
      .then(resp =>console.log(resp))
      .catch(err => console.log(error))
      
  };

  return (
    <LoginTemplate title="Iniciar Sesion">
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <input type="email"  
            placeholder="Correo electronico"
            name="email" 
            required 
          />
        </div>
        <div className="mb-4">
          <input type="password" 
            placeholder="Contraseña"
            name="password" 
            required 
          />
        </div>
        <div className="text-center pt-1 mb-12 pb-1">
          <button className="bg-gradient w-full" type="submit" >
            Ingresar
          </button>
          <Link className="text-gray-500" to="/Register">
            ¿Desea registrarse?
          </Link>
        </div>
        {error && (
          <p className="text-center p-2 bg-red-100 text-red-800">
            {error?.response?.data?.data}
          </p>
        )}
      </form>
    </LoginTemplate>
  )
};

export default Login;