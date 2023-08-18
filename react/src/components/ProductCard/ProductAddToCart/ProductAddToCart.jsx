const ProductAddToCart = ({ product, handleAddToCart }) => {
    return (
        <button
            onClick={() => handleAddToCart(product)}
            className="product__cart-button"
        >
            В корзину
        </button>
    );
};

export default ProductAddToCart;
