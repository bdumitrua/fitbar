import { Link } from "react-router-dom";
import ProductFavorite from "./ProductFavorite/ProductFavorite";
import ProductRating from "./ProductRating/ProductRating";

const ProductCard = ({ product }) => {
    return (
        <div className="product" key={product.id}>
            <div href={product.id} className="product__image">
                <Link to={`/products/${product.id}`} className="product__link">
                    <img
                        src={product.image}
                        alt=""
                        className="product__image-element"
                    />
                </Link>
                <ProductFavorite productId={product.id} />
                <button className="product__cart-button">
                    Добавить в корзину
                </button>
            </div>
            <p className="product__title">{product.name}</p>
            <ProductRating rating={product.rating} />
            <p className="product__price">От {product.price} руб.</p>
        </div>
    );
};

export default ProductCard;
