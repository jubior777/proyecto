import axios from 'axios';
import { API_URL } from '../../../constants/env';
import React, { useState } from 'react';
import { token } from '../../../../helpers/auth';


const Forms = () => {
    const [newProduct, setNewProduct] = useState(null); // Guarda el producto creado
    const handleSubmit = (e) => {
        e.preventDefault();

        const data = {
            productName: e.target.productName.value,  
            price: Number(e.target.price.value),
            image: e.target.image.value,
            description: e.target.description.value,
            features: {
                color: e.target.color.value,
            },
        };
    
        axios
            .post(`${API_URL.replace(/\/$/, '')}/admin/products`, data, {
                headers: {
                    Authorization: `Bearer ${token()}`,
                },
            })
            .then((resp) => {
                setNewProduct(resp.data.data); // Guarda el producto creado
                console.log("Respuesta completa de la API:", resp);
                alert("Producto creado correctamente");
            })
            .catch((err) => {
                console.log(err);
                alert("Error al crear el producto.");
            });
    };

    return (
        <div>
            <h1>Crear productos</h1>
            <form onSubmit={handleSubmit}>
                <input type="text" name="productName" placeholder="Nombre del producto" required />
                <input type="number" name="price" placeholder="Precio del producto" required />
                <input type="url" name="image" placeholder="Imagen del producto" required />
                <textarea name="description" rows="10" placeholder="Descripción del producto" required />
                <input type="text" name="color" placeholder="Color del producto" required />
                <button type="submit">Crear producto</button>
            </form>

            {newProduct && (
                <div>
                    <h2>Nuevo Producto:</h2>
                    <h3>{newProduct.productName}</h3>
                    <p>Precio: ${newProduct.price}</p>
                    <img src={newProduct.image} alt={newProduct.productName} width="150" />
                    <p>Descripción: {newProduct.description}</p>
                    <p>Color: {newProduct.features.color}</p>
                </div>
            )}
        </div>
    );
};

export default Forms;
