import { Link } from "react-router-dom";
import "./ProductCard.scss";
import ProductFavorite from "./ProductFavorite/ProductFavorite";
import ProductRating from "./ProductRating/ProductRating";

const ProductCard = ({ product, itemCount }) => {
    const handleAddToCart = () => {
        const existingCart = JSON.parse(localStorage.getItem("cart")) || [];
        const updatedCart = [...existingCart, product];
        localStorage.setItem("cart", JSON.stringify(updatedCart)); // Добавляем товар в корзину
    };

    const getCartItems = () => {
        const items = JSON.parse(localStorage.getItem("cart")) || [];
        return items;
    };

    const cartItems = getCartItems();

    const isProductInCart = cartItems.some((item) => item.id === product.id);

    return (
        <div
            className={`product ${
                itemCount % 3 === 2 ? "last-row-two-items" : ""
            }`}
            key={product.id}
        >
            <div href={product.id} className="product__image">
                <Link to={`/products/${product.id}`} className="product__link">
                    <img
                        src={product.image}
                        alt=""
                        className="product__image-element"
                    />
                </Link>
                <ProductFavorite productId={product.id} />
                {isProductInCart ? (
                    <Link to="/cart" className="product__cart-button active">
                        Корзина
                    </Link>
                ) : (
                    <button
                        onClick={() => handleAddToCart()}
                        className="product__cart-button"
                    >
                        В корзину
                    </button>
                )}
            </div>
            <p className="product__title">{product.name}</p>
            <ProductRating rating={product.rating} />
            <p className="product__price">От {product.price} руб.</p>
        </div>
    );
};

export default ProductCard;
