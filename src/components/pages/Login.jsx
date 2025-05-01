import React from 'react';
import axios from 'axios'; // Importa la biblioteca axios para hacer solicitudes HTTP


const Login = () => {
    const handleSubmit = (e) => {
        e.preventDefault() // Evita el comportamiento por defecto del formulario
        alert("Registro exitoso !!") // Muestra una alerta de registro exitoso
    
        const data = {
            email: e.target.email.value,
            username: e.target.username.value,
            password: e.target.password.value
        }

        axios.post (' ${API_URL}')

       


        

        
    }

    return (
        <div className="pt-16 max-w-256 m-auto">
            <form onSubmit={handleSubmit}>
                <input type="email" name="email" placeholder="Correo electronico" required />
                <input type="nombre" name="username" placeholder="Nombre de usuario" required />
                <input type="password" name="password" placeholder="Contraseña" required />
                <button type='submit' className='btn btn-primary'>Ingresar</button>
            </form>
        </div> 
    )
}

export default Login;

  