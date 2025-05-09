import axios from 'axios';
import { token } from '../../../../helpers/auth';
import { API_URL } from '../../../constants/env';


const Forms = () => {

    const handleSubmit = (e) => {
        e.preventDefault();

        
        const data  = {
        product_name: e.target.productName.value.trim(),
        price: Number(e.target.price.value),
        images: [e.target.image.value],
        feature: {hasDelivery,
            category: e.target.categoria.value,
        }
        
        axios.post(`${API_URL}/admin/products`, data, {
            headers: { Authorization: `Bearer ${token}`
        },
        })
        .then((resp) => {
            console.log(resp.data.data)
        })
        .catch((err) => {
        console.log(err)
        alert("Error al crear el producto")
        })
    
    }

   
    return (
        <div className="pt-16 max-w-256 m-auto">
            <section className="pt-10">
                <h1 className="text-4xl mb-6">Crear producto</h1>
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
                        <div>
                            <label htmlFor="id">ID del producto</label>
                            <input 
                                type="text" 
                                 id="id" 
                                name="id" 
                                value={product?.id || params.id || ''} 
                                    
                            />
                        </div>
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
                        <button type="submit" className="bg-gradient" disabled={submitting}>Guardar producto</button>
                    </form>
            </section>
        </div>
    );
};

export default Forms;

