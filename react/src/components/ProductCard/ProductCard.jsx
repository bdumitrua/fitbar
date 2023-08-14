import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { addToCartAsync } from "../../redux/slices/cart.slice";
import "./ProductCard.scss";
import ProductFavorite from "./ProductFavorite/ProductFavorite";
import ProductRating from "./ProductRating/ProductRating";

const ProductCard = ({ product, itemCount }) => {
    const dispatch = useDispatch();

    const handleAddToCart = () => {
        dispatch(addToCartAsync({ productId: product.id })); // Добавляем товар в корзину
    };

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
                <button
                    onClick={() => handleAddToCart()}
                    className="product__cart-button"
                >
                    В корзину
                </button>
            </div>
            <p className="product__title">{product.name}</p>
            <ProductRating rating={product.rating} />
            <p className="product__price">От {product.price} руб.</p>
        </div>
    );
};

export default ProductCard;
