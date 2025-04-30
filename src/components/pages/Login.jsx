import React from 'react';


const Login = () => {
    const handleSubmit = (e) => {
        e.preventDefault() // Evita el comportamiento por defecto del formulario
        alert("Registro exitoso") // Muestra una alerta de registro exitoso
    
        const data = {
            email: e.target.email.value,
            username: e.target.username.value,
            password: e.target.password.value,
        }


        axios.post('${API_URL}')
            .then(resp => {
                console.log(resp); // Maneja la respuesta de la API
            })
            .catch(error => {
                console.log(error); // Maneja el error de la API
            });

        
    }

    return (
        <div className="pt-16 max-w-256 m-auto">
            <form onSubmit={handleSubmit}>
                <input type="email" name="email" placeholder="Correo electronico" />
                <input type="nombre" name="username" placeholder="Nombre de usuario" />
                <input type="password" name="password" placeholder="Contraseña" />
                <button type='submit' className='btn btn-primary'>Ingresar</button>
            </form>
        </div> 
    )
}

export default Login;

  