import axios from 'axios';
import { API_URL } from '../../../constants/env';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { token } from '../../../../helpers/auth';
import Loader from '../../../atoms/Loaders';

const Forms = () => {
    const nav = useNavigate();
    const params = useParams();

    console.log("Forms component rendered with params.id:", params.id);

    const [hasDelivery, setHasDelivery] = useState(false);
    const [errors, setErrors] = useState(null);
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(false);
    const [submitting, setSubmitting] = useState(false);
 




useEffect(() => {
        if (params.id) {
            console.log("Fetching product with ID:", params.id);
            const url = `${API_URL.replace(/\/$/, '')}/public/products/${params.id}`;
            console.log("GET request URL:", url);
            setLoading(true);
            axios
                .get(url)
                .then((resp) => {
                    console.log("Product data fetched:", resp.data.data);
                    setProduct(resp.data.data);
                    setHasDelivery(resp.data.data.delivery || false);
                    setErrors(null);
                })
                .catch((err) => {
                    console.error("Error fetching product:", err);
                    setErrors(err.response?.data || err.message || "Error desconocido");
                })
                .finally(() => {
                    setLoading(false);
                });
        }
    }, [params.id]);

    const handleSubmit = (e) => {
        e.preventDefault();

        const authToken = token();
        if (!authToken) {
            alert('No se encontró token de autenticación. Por favor, inicia sesión.');
            return;
        }

        setSubmitting(true);
        setErrors(null);

        const body = {
            product_name: e.target.productName.value,
            price: Number(e.target.price.value),
            images: [e.target.image.value],
            delivery: hasDelivery,
            category: e.target.categoria.value,
        };

        // Remove id from request body to avoid backend conflicts
        // if (params.id) {
        //     body.id = params.id;
        // }

        const config = {
            headers: {
                Authorization: `Bearer ${authToken}`,
            },
        };

        const urlBase = API_URL.replace(/\/$/, '');

        const request = !params.id
            ? axios.post(`${urlBase}/admin/products`, body, config)
            : axios.put(`${urlBase}/admin/products/${params.id}`, body, config);

        request
            .then(() => {
                nav('/admin/productos');
            })
.catch((err) => {
    console.error("Axios request error:", err);
    if (err.response) {
        // Server responded with a status code outside 2xx
        setErrors(err.response.data || `Error del servidor: ${err.response.status}`);
    } else if (err.request) {
        // Request was made but no response received
        setErrors("No se recibió respuesta del servidor. Por favor, intenta más tarde.");
    } else {
        // Something else happened
        setErrors(err.message || "Error desconocido");
    }
})
            .finally(() => {
                setSubmitting(false);
            });
    };

    

    return (
        <div className="pt-16 max-w-256 m-auto">
            <section className="pt-10">
                <h1 className="text-4xl mb-6">{params.id ? 'Editar' : 'Crear'} producto</h1>
                <form onSubmit={handleSubmit}>
                    <div className="grid grid-cols-2 gap-6 mb-6">
                        <div className="col mb-4">
                            <label htmlFor="productName">Nombre del producto</label>
                            <input
                                type="text"
                                name="productName"
                                defaultValue={product ? product.product_name : ''}
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="price">Precio</label>
                            <input
                                type="number"
                                id="price"
                                name="price"
                                defaultValue={product ? product.price : ''}
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="image">Imagen</label>
                            <input
                                type="text"
                                id="image"
                                name="image"
                                defaultValue={product && product.images && product.images.length > 0 ? product.images[0] : ''}
                                required
                            />
                        </div>
                        {params.id && (
                            <div>
                                <label htmlFor="id">ID</label>
                                <input type="text" id="id" name="id" value={params.id} readOnly />
                            </div>
                        )}
                        <div className="flex flex-col">
                            <label htmlFor="categoria">Categoría</label>
                            <select
                                name="categoria"
                                className="categoria"
                                required
                                defaultValue={product ? product.category : 'otros'}
                            >
                                <option value="otros" disabled>
                                    Selecciona una categoria
                                </option>
                                <option value="Candelabros de mesa">Candelabros de mesa</option>
                                <option value="Candelabros de pared">Candelabros de pared</option>
                                <option value="Candelabros de techo">Candelabros de techo</option>
                                <option value="Candelabros de varios brazos">Candelabros de varios brazos</option>
                            </select>
                        </div>
                        <div>
                            <p className="mb-2">Envio a domicilio</p>
                            <div className="flex gap-2">
                                <label className="flex items-center gap-1">
                                    <span>Si</span>
                                    <input
                                        type="radio"
                                        name="delivery"
                                        className="mt-1"
                                        onChange={() => setHasDelivery(true)}
                                        checked={hasDelivery}
                                    />
                                </label>
                                <label className="flex items-center gap-1">
                                    <span>No</span>
                                    <input
                                        type="radio"
                                        name="delivery"
                                        className="mt-1"
                                        onChange={() => setHasDelivery(false)}
                                        checked={!hasDelivery}
                                    />
                                </label>
                            </div>
                        </div>
                    </div>
                    <button type="submit" className="bg-gradient" disabled={submitting}>
                        Guardar
                    </button>
                    <p>{errors && JSON.stringify(errors)}</p>
                </form>
            </section>
        </div>
    );
};

export default Forms;

