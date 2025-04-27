import React from "react"; // Importa React para usar JSX
import { createBrowserRouter } from "react-router-dom";
import App from "../App"; // Importa el componente principal de la aplicación
import Error404 from "../components/Error404";
import Products from "../components/Products";
import Home from "../components/templates/Home";



const appRouter = createBrowserRouter([
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
    }
    
    
])
export default appRouter;
