import React from "react";
import { Link } from "react-router-dom";    
import PropTypes from "prop-types";
import { formatPrice } from "../../helpers/Number"

const ProductCard = ({ product }) => {
    const { images, product_name, id, price, description } = product

    return (
        <article className="w-full max-w-sm bg-white border rounded-lg shadow-lg p-5">
            <div className="mb-5 rounded-lg overflow-hidden">
                <Link to={`/product/${id}`}>
                    <img
                        className="align-middle h-40 w-full object-cover"
                        src={images[0]}
                        alt={product_name}
                    />
                </Link>
            </div>
            <div className="mb-6">
                <Link to={`/productos/${id}`}>
                    <h3 className="text-xl font-semibold tracking-tight text-gray-900 m-2">
                        {product_name}
                    </h3>
                </Link>
                <p className="text-gray-500 line-clamp-2">{description}</p>
            </div>
            <div className="flex justify-between items-center">
                <span className="text-xl font-bold text-gray-900">
                    {formatPrice(price)}
                </span>
            </div>
        </article>
    )
}

ProductCard.propTypes = {
    product: PropTypes.shape({
        images: PropTypes.arrayOf(PropTypes.string).isRequired,
        product_name: PropTypes.string.isRequired,
        id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
        price: PropTypes.number.isRequired,
        description: PropTypes.string.isRequired,
    }).isRequired,
}

export default ProductCard
