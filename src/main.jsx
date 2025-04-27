import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import router from "./Router/router"; 
import './index.css'// Asegúrate de que la ruta sea correcta

ReactDOM.createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
