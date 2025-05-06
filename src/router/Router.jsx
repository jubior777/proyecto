import React from "react"; // Importa React para usar JSX
import { createBrowserRouter, Form } from "react-router-dom";
import App from "../App"; // Importa el componente principal de la aplicación
import Error404 from "../components/Error404";
import Products from "../components/Products";
import Home from "../components/templates/Home";
import Login from "../Login";
import Register from "../components/templates/Register"; // Importa el componente de registro
import Forms from "../components/pages/admin/products/Forms";

const router = createBrowserRouter([
    { 
        path: "/", 
        element: <Home />,
        errorElement: <Error404 />,
        children: [ 
            {
                index: true,
                element: <App />,
            },
            {
               path: "/productos",
               element: <Products />,
            }

        ]
    },
    {
      path: "/login",
        element: <Login/>,  
    },
    {
        path: "/Registro",
        element: <Register />,
    },
    {
        path: "/admin/productos",
        element: <Forms/>,
    },
    {
        path: "/admin/productos/crear",
        element: <Forms/>,
    },
])
export default router; // Exporta el enrutador para usarlo en la aplicación
