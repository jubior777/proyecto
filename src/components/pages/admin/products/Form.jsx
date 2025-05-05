import React from 'react'

const Form = ()=> {
    return (
        <div>
            <h1>Crear productos</h1>
            <form>
                <input type="text" name="productName" placeholder='Nombre del producto' required />
                <input type="number" name="price" placeholder='Precio del producto' required />
                <input type="url" name="image" placeholder='Imagen del producto' required />
                <textarea name="description"  rows="10" required/>
                <button type='submit'>Crear producto</button>
            </form>
        </div>
    )}

export default Form