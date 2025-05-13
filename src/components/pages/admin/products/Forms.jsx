import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { API_URL } from '../../../constants/env';
import { token } from '../../../../helpers/auth';


const Forms = () => {
    const nav = useNavigate();
    const params = useParams();

    const [hasDelivery, setHasDelivery] = useState(false);
    const [isNew, setIsNew] = useState(false);

    const [submitting, setSubmitting] = useState(false);

    const [product, setProduct] = useState({});

    const [error, setError] = useState(null);

    useEffect(() => {
        if (params.productID) {
            // Fetch existing product data to edit
            axios.get(`${API_URL}/admin/products/${params.productID}`, {
                headers: {
                    Authorization: `Bearer ${token()}`,
                },
            })
            .then((response) => {
                setProduct(response.data);
                setHasDelivery(response.data.hasDelivery || false);
                setIsNew(response.data.isNew || false);
            })
            .catch((err) => {
                console.error("Error fetching product data:", err);
                setError("Error fetching product data");
            });
        }
    }, [params.productID]);

    const handleSubmit = (e) => {
        e.preventDefault();
        setSubmitting(true);
        setError(null);

        const body = {
            product_name: e.target.productName.value.trim(),
            price: Number(e.target.price.value),
            images: [e.target.image.value],
            category: e.target.categoria.value,
            rating: product?.rating || 0,
            sold: product?.sold || 0,
            isNew,
            hasDelivery
        };

        if (!params.productID) {
            axios
                .post(`${API_URL}/admin/products/`, body, {
                    headers: {
                        Authorization: `Bearer ${token()}`,
                    },
                })
                .then(() => {
                    nav("/admin/productos");
                })
                .catch((err) => {
                    console.error("Error al crear el producto:", err);
                    setError("Error al crear el producto");
                })
                .finally(() => setSubmitting(false));
        } else {
            axios
                .put(`${API_URL}/admin/products/${params.productID}`, body, {
                    headers: {
                        Authorization: `Bearer ${token()}`,
                    },
                })
                .then(() => {
                    nav("/admin/productos");
                })
                .catch((err) => {
                    console.error("Error al actualizar el producto:", err);
                    setError("Error al actualizar el producto");
                })
                .finally(() => setSubmitting(false));
        }
    };

    return (
        <div className="pt-16 max-w-256 m-auto">
            <section className="pt-10">
                <h1 className="text-4xl mb-6">
                    {`${params.productID ? "Editar" : "Crear"}`} producto
                </h1>
                <form onSubmit={handleSubmit}>
                    <div className="grid grid-cols-2 gap-6 mb-6">
                        <div className="col mb-4">
                            <label htmlFor="productName">Nombre del producto</label>
                            <input
                                type="text"
                                name="productName"
                                required
                                defaultValue={product?.product_name || ''}
                            />
                        </div>
                        <div>
                            <label htmlFor="price">Precio</label>
                            <input
                                type="number"
                                name="price"
                                required
                                defaultValue={product?.price || ''}
                            />
                        </div>
                        <div>
                            <label htmlFor="image1">Imagen 1</label>
                            <input
                                type="text"
                                name="image"
                                required
                                defaultValue={product?.images?.[0] || ''}
                            />
                        </div>
                        <div className="flex flex-col">
                            <label htmlFor="categoria">Categoría</label>
                            <select
                                name="categoria"
                                className="categoria"
                                required
                                defaultValue={product?.category || ''}
                            >
                                <option value="" disabled>Selecciona una categoría</option>
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
                                    <input
                                        type="radio"
                                        name="delivery"
                                        onChange={() => setHasDelivery(true)}
                                        checked={hasDelivery}
                                    />
                                </label>
                                <label className="flex items-center gap-1">
                                    <span>No</span>
                                    <input
                                        type="radio"
                                        name="delivery"
                                        onChange={() => setHasDelivery(false)}
                                        checked={!hasDelivery}
                                    />
                                </label>
                            </div>
                        </div>
                    </div>
                    <button type="submit" className="bg-gradient" disabled={submitting}>
                        Guardar producto
                    </button>
                    {error && <p className="text-red-600 mt-2">{error}</p>}
                </form>
            </section>
        </div>
    );
};

export default Forms;
