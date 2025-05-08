import React, { useState, useMemo } from 'react';
import useFetch from '../../../../hooks/useFetch';
import Loader from '../../../atoms/Loaders';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { API_URL } from '../../../constants/env';
import { token } from '../../../../helpers/auth';

const ProductsTable = () => {  

  console.log("ProductsTable component rendered");

  const [refresh, setRefresh] = useState(0);
  const [message, setMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  const memoizedHeaders = useMemo(() => ({}), []);
  const memoizedDeps = useMemo(() => [refresh], [refresh]);

  const { data, loading, error  } = useFetch("/public/products", memoizedHeaders, memoizedDeps);

  console.log("useFetch data:", data, "loading:", loading, "error:", error);
  console.log("refresh state:", refresh);

  const deleteProduct = (id) => {
    console.log("deleteProduct called with id:", id);
    if (window.confirm("Estas seguro de eliminar el producto?")){
      axios
      .delete(`${API_URL}/admin/products/${id}`, {
        headers: {
          Authorization: `Bearer ${token()}`,
        }
      })
      .then(() => {
        console.log("Product deleted successfully");
        setMessage("Producto eliminado correctamente");
        setErrorMessage(null);
        setRefresh(prev => {
          const newRefresh = prev + 1;
          console.log("refresh state updated to:", newRefresh);
          return newRefresh;
        });
        setTimeout(() => setMessage(null), 3000);
      })
      .catch((err) => {
        console.error("Error deleting product:", err);
        setErrorMessage("Error al eliminar el producto");
        setMessage(null);
        setTimeout(() => setErrorMessage(null), 3000);
      });
    }
  };



  if (error) return <div>{error?.message}</div>

  if (loading) return <Loader />;

  return (
    <div className='max-w-256 m-auto'>
      <section className='pt-10'>
        <h1 className='text-4xl mb-6'>Productos</h1>
        <div className='pt-1 mb-12 pb-1'>
           <Link className="bg-gradient button" to="/admin/productos/crear" >
              Agregar producto
           </Link>
        </div>
        {message && <div className="text-green-600 mb-4">{message}</div>}
        {errorMessage && <div className="text-red-600 mb-4">{errorMessage}</div>}
        <table >
          <thead>
            <tr className='bg-gradient -400 text-'>
              <th>Nombre</th>
              <th className="px-10">Precio</th>
              <th className="px-10">Editar</th>
              <th className="px-10">Borrar</th>
            </tr>
          </thead>
          <tbody>
            {data.map((product) => (
              <tr key={product.id}>
                <td>  {product.product_name}</td>
                <td className="px-10">{product.price}</td>
                <td className="px-10">
                  <Link to={`/admin/productos/editar/${product.id}`}>
                    Editar
                  </Link>
                </td>
                <td className="px-6">
                  <a className='text-red-600 hover:cursor-pointer'
                  onClick={() => deleteProduct(product.id)}
                  >
                  Eliminar</a>
                </td>
              </tr>
            ))}                              
          </tbody>
        </table>
      </section>
    </div>
  );
}

export default  ProductsTable  

