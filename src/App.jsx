import React from "react";
import {API_URL} from "./components/constants/env" // Ajusta la ruta de env.js


function App() {
  return (
    <>
      <div>
        <h1>Hola  {API_URL}</h1>
        <p>Este es el sitio de desarrollo</p>
      </div>
    </>
  );
}

export default App;
function TestTailwind() {
  return (
    <div className="bg-blue-500 text-white p-5 rounded-lg">
      <h1 class="text-4xl font-bold text-blue-500">¡Tailwind está funcionando! 🚀</h1>
      ¡TailwindCSS está funcionando!
    </div>
  );
}

export { TestTailwind };

