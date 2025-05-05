import React from 'react'
import useFetch from "../hooks/useFetch.js"


const Products = () => {  

  const { data, error, loading } = useFetch("/public/products")
  console.log("Productos:", data);
   
  if (loading) return <h1>Cargando...</h1>
  if (error) return <h1>Error en la petición de Productos</h1>
 

  return (
    <div>
      <h1>Productos</h1>
      {data && data.length > 0 ? (
        data.map(prod => (
          <div key={prod.id}>
            {JSON.stringify(prod.product_name)}    
          </div>
        ))
      ) : (
        <h2>No hay productos disponibles</h2>
      )}
    </div>
  );
  
  
}

export default Products
