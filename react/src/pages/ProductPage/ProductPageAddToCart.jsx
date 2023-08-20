import { Link } from "react-router-dom";
import "./ProductPage.scss";

const ProductPageAddToCart = ({
    product,
    handleAddToCart,
    isProductInCart,
}) => {
    return (
        <>
            {isProductInCart ? (
                <Link to="/cart" className="product-page__cart-button active">
                    Корзина
                </Link>
            ) : (
                <button
                    onClick={() => handleAddToCart(product)}
                    className="product-page__cart-button"
                >
                    Добавить в корзину
                </button>
            )}
        </>
    );
};

export default ProductPageAddToCart;
