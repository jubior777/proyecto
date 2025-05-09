import React from "react";
import { Link } from "react-router-dom";    
import PropTypes from "prop-types";
import { formatPrice } from "../../helpers/Number"

const ProductCard = ({ product }) => {
    const { images, product_name, id, price } = product

    const imageUrl = images && images.length > 0 ? images[0] : null;

    return (
        <article className="w-full max-w-sm bg-white border rounded-lg shadow-lg p-5">
            <div className="mb-5 rounded-lg overflow-hidden">
                <Link to={`/productos/${id}`}>
                    {imageUrl ? (
                        <img
                            className="align-middle h-40 w-full object-cover"
                            src={imageUrl}
                            alt={product_name}
                        />
                    ) : (
                        <div className="h-40 w-full bg-gray-200 flex items-center justify-center text-gray-500">
                            No Image
                        </div>
                    )}
                </Link>
            </div>
            <div className="mb-6">
                <Link to={`/productos/${id}`}>
                    <h3 className="text-xl font-semibold tracking-tight text-gray-900 m-2">
                        {product_name}
                    </h3>
                </Link>
            </div>
            <div className="flex justify-between items-center">
                <span className="text-xl font-bold text-gray-900">
                    {formatPrice(price)}
                </span>
            </div>
        </article>
    )
}



export default ProductCard
