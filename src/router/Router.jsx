import React from "react"; // Importa React para usar JSX
import { createBrowserRouter } from "react-router-dom";
import App from "../App"; // Importa el componente principal de la aplicación
import Error404 from "../components/Error404";
import Products from "../components/Products";
import Home from "../components/templates/Home";
import Login from "../components/pages/Login";
import Registro from "../components/pages/Registro";

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
        path: "/registro",
          element: <Registro/>,  
      }
    
    
])
export default router; // Exporta el enrutador para usarlo en la aplicación
