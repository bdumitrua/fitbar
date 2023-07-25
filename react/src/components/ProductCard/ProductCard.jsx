import heart from "../../images/heart.svg";
import ProductRating from "./ProductRating/ProductRating";

const ProductCard = ({ product }) => {
    return (
        <div className="product" key={product.id}>
            <a href={product.id} className="product__image">
                <img
                    src={product.image}
                    alt=""
                    className="product__image-element"
                />
                <img src={heart} className="product__favorite" />
                <button className="product__cart-button">
                    Добавить в корзину
                </button>
            </a>
            <p className="product__title">{product.name}</p>
            <ProductRating rating={product.rating} />
            <p className="product__price">{product.price}</p>
        </div>
    );
};

export default ProductCard;
