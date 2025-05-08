import axios from 'axios';
import { API_URL } from '../../../constants/env';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { token } from '../../../../helpers/auth';

const Forms = () => {
    const nav = useNavigate();
    const params = useParams();
    const [hasDelivery, setHasDelivery] = useState(false);
    const [errors, setErrors] = useState(null);
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(false);
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        if (params.id) {
            console.log("Fetching product with ID:", params.id);
            const url = `${API_URL.replace(/\/$/, '')}/public/products/${params.id}`;
            setLoading(true);

            axios.get(url)
                .then((resp) => {
                    if (resp.data && resp.data.data) {
                        setProduct(resp.data.data);
                        setHasDelivery(resp.data.data.delivery || false);
                        setErrors(null);
                    } else {
                        setErrors("Datos del producto no encontrados.");
                    }
                })
                .catch((err) => {
                    setErrors(err.response?.data?.message || "Error desconocido al obtener producto");
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
            id: params.id,
            product_name: e.target.productName.value.trim(),
            price: Number(e.target.price.value),
            images: [e.target.image.value.trim()],
            delivery: hasDelivery,
            category: e.target.categoria.value,
        };

        const config = {
            headers: {
                Authorization: `Bearer ${authToken}`,
                'Content-Type': 'application/json',
            },
        };

        const urlBase = API_URL.replace(/\/$/, '');
        const request = params.id
            ? axios.put(`${urlBase}/admin/products/${params.id}`, body, config)
            : axios.post(`${urlBase}/admin/products`, body, config);

        request
            .then((resp) => {
                if (!params.id) {
                    console.log("Producto creado con ID:", resp.data.id);
                    nav(`/admin/productos/${resp.data.id}`); // Redirige a la página del producto recién creado
                } else {
                    nav('/admin/productos');
                }
            })
            .catch((err) => {
                setErrors(err.response?.data?.message || "Error desconocido al guardar el producto.");
            })
            .finally(() => {
                setSubmitting(false);
            });
    };

    return (
        <div className="pt-16 max-w-256 m-auto">
            <section className="pt-10">
                <h1 className="text-4xl mb-6">{params.id ? 'Editar' : 'Crear'} producto</h1>
                {loading && <p>Cargando...</p>}
                {errors && <p className="text-red-500">{JSON.stringify(errors)}</p>}

                {!loading && (
                    <form onSubmit={handleSubmit}>
                        <div className="grid grid-cols-2 gap-6 mb-6">
                            <div className="col mb-4">
                                <label htmlFor="productName">Nombre del producto</label>
                                <input type="text" name="productName" defaultValue={product?.product_name || ''} required />
                            </div>
                            <div>
                                <label htmlFor="price">Precio</label>
                                <input type="number" id="price" name="price" defaultValue={product?.price || ''} required />
                            </div>
                            <div>
                                <label htmlFor="image">Imagen</label>
                                <input type="text" id="image" name="image" defaultValue={product?.images?.[0] || ''} required />
                            </div>
                            {params?.id && (
                                <div>
                                    <label htmlFor="id">ID del producto</label>
                                    <input type="text" id="id" name="id" value={params.id} readOnly />
                                </div>
                            )}
                            <div className="flex flex-col">
                                <label htmlFor="categoria">Categoría</label>
                                <select name="categoria" className="categoria" required defaultValue={product?.category || 'otros'}>
                                    <option value="otros" disabled>Selecciona una categoría</option>
                                    <option value="Candelabros de mesa">Candelabros de mesa</option>
                                    <option value="Candelabros de pared">Candelabros de pared</option>
                                    <option value="Candelabros de techo">Candelabros de techo</option>
                                    <option value="Candelabros de varios brazos">Candelabros de varios brazos</option>
                                </select>
                            </div>
                            <div>
                                <p className="mb-2">Envío a domicilio</p>
                                <div className="flex gap-2">
                                    <label className="flex items-center gap-1">
                                        <span>Si</span>
                                        <input type="radio" name="delivery" className="mt-1" onChange={() => setHasDelivery(true)} checked={hasDelivery} />
                                    </label>
                                    <label className="flex items-center gap-1">
                                        <span>No</span>
                                        <input type="radio" name="delivery" className="mt-1" onChange={() => setHasDelivery(false)} checked={!hasDelivery} />
                                    </label>
                                </div>
                            </div>
                        </div>
                        <button type="submit" className="bg-gradient" disabled={submitting}>Guardar</button>
                    </form>
                )}
            </section>
        </div>
    );
};

export default Forms;
