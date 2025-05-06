import axios from 'axios';
import { API_URL } from '../../../constants/env';
import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { token } from '../../../../helpers/auth';

const Forms = () => {
    const nav = useNavigate();
    const params = useParams();

    const [hasDelivery, setHasDelivery] = useState(false);
    const [errors, setErrors] = useState();

    const handleSubmit = (e) => {
        e.preventDefault();

        const authToken = token();
        if (!authToken) {
            alert("No se encontró token de autenticación. Por favor, inicia sesión.");
            return;
        }

        const body = {
            product_name: e.target.productName.value,
            price: Number(e.target.price.value),
            images: [e.target.image.value],
            delivery: hasDelivery,
            category: e.target.categoria.value,
        };

        if (params.productID) {
            body.id = e.target.id.value;
        }

        const config = {
            headers: {
                Authorization: `Bearer ${authToken}`,
            },
        };

        if (!params.productID) {
            axios
                .post(`${API_URL.replace(/\/$/, '')}/admin/products`, body, config)
                .then(() => {
                    nav('/productos');
                })
                .catch((err) => {
                    if (err.response && err.response.data) {
                        setErrors(err.response.data);
                    } else {
                        setErrors(err.message);
                    }
                });
        } else {
            axios
                .put(`${API_URL.replace(/\/$/, '')}/admin/products`, body, config)
                .then(() => {
                    nav('/productos');
                })
                .catch((err) => {
                    if (err.response && err.response.data) {
                        setErrors(err.response.data);
                    } else {
                        setErrors(err.message);
                    }
                });
        }
    };

    return (
        <div className="pt-16 max-w-256 m-auto">
            <section className="pt-10">
                <h1 className="text-4xl mb-6">
                    {params.productID ? "Editar" : "Crear"} Producto
                </h1>
                <form onSubmit={handleSubmit}>
                    <div className="grid grid-cols-2 gap-6 mb-6">
                        <div className="col mb-4">
                            <label htmlFor="productName">Nombre del Producto</label>
                            <input type="text" id="productName" name="productName" required />
                        </div>
                        <div>
                            <label htmlFor="price">Precio</label>
                            <input type="number" id="price" name="price" required />
                        </div>
                        <div>
                            <label htmlFor="image">Imagen</label>
                            <input type="text" id="image" name="image" required />
                        </div>
                        {params.productID && (
                            <div>
                                <label htmlFor="id">ID</label>
                                <input type="text" id="id" name="id" required />
                            </div>
                        )}
                        <div className='flex flex-col'>
                            <label htmlFor="categoria">Categoría</label>
                            <select name="categoria" className="categoria" required defaultValue="otros">
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
                            <p className='mb-2'>Envio a domicilio</p>
                            <div className='flex gap-2'>
                                <label className="flex items-center gap-1">
                                    <span>Si</span>
                                    <input type="radio" name='delivery' className='mt-1' onChange={() => setHasDelivery(true)} checked={hasDelivery} />
                                </label>
                                <label className="flex items-center gap-1">
                                    <span>No</span>
                                    <input type="radio" name='delivery' className='mt-1' onChange={() => setHasDelivery(false)} checked={!hasDelivery} />
                                </label>
                            </div>
                        </div>
                    </div>
                    <button type='submit' className='bg-gradient'>
                        Guardar
                    </button>
                    <p>{errors && JSON.stringify(errors)}</p>
                </form>
            </section>
        </div>
    );
};

export default Forms;
