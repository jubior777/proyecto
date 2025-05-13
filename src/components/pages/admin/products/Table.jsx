import React from 'react';
import { Link } from 'react-router-dom';
import Loader from '../../../atoms/Loaders';
import useFetch from '../../../../hooks/useFetch';
import { token } from '../../../../helpers/auth';
import axios from 'axios';
import { API_URL } from '../../../constants/env';

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
  }

  if (loading) return <Loader />;
  if (error) return <div>{error?.message}</div>;

  return (
    <div className="max-w-256 m-auto">
      <section className="pt-10">
        <h1 className="text-4xl mb-6">Productos</h1>
        <div className="pt-1 mb-12 pb-1">
          <Link className="bg-gradient button" to="/admin/productos/crear">
            Agregar producto
          </Link>
        </div>
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
            {products.map((product) => (
              <tr key={product.id}>
                <td>{product.product_name}</td>
                <td className="px-10">{product.price}</td>
                <td className="px-10">
                  <Link to={`/admin/productos/editar/${product.id}`}>Editar</Link>
                </td>
                <td className="px-6">
                  <a
                    className="text-red-600 hover:cursor-pointer"
                    onClick={() => deleteProduct(product.id)}
                  >
                    Eliminar
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
};

export default Table;
