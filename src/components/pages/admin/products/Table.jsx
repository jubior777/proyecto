import React from 'react';
import { Link } from 'react-router-dom';
import Loader from '../../../atoms/Loaders';
import useFetch from '../../../../hooks/useFetch';
import { token } from '../../../../helpers/auth';
import axios from 'axios';

const Table = () => {
  const { data, loading, error } = useFetch('public/products');
  const products = data || [];

  const deleteProduct = (productId) => {
    if (!productId) {
      console.error('Product ID is required to delete a product');
      return;
    }
    axios.delete(`${API_URL}/admin/products/${productId}`, {
      headers: {
        Authorization: `Bearer ${token()}`,
      },
    })
    .then(() => {
      console.log('Product deleted:', productId);
      // Optionally, refresh the product list or update state here
    })
    .catch((err) => {
      console.error('Error deleting product:', err);
    });
  };

  if (loading) return <Loader />;
  if (error) return <div>{error?.message}</div>;

  return (
    <table className="overflow-x-scroll">
      <thead>
        <tr className="bg-gradient-400 text-white">
          <th>Nombre</th>
          <th className="px-10">Precio</th>
          <th className="px-10">Editar</th>
          <th className="px-10">Borrar</th>
        </tr>
      </thead>
      <tbody>
        {products?.map((product) => (
        <tr key={product.id}>
          <td>{product.name}</td> {/* Cambié product_name por name */}
            <td className="px-10">{product.price}</td>
              <td className="px-10">
                <Link to={`/admin/productos/editar/${product.id}`}>Editar</Link>
              </td>
              <td className="px-6">
                  <button 
                    onClick={() => deleteProduct(product.id)} 
                    className="text-red-600 hover:cursor-pointer"
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
      </tbody>
    </table>
  );
}

export default Table;
