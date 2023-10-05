import cart from "@/assets/images/cartProduct.svg";
import { ReactSVG } from "react-svg";
import "../ProductCard.scss";
import "./ProductAddToCart.scss";

const ProductAddToCart = ({ product, handleAddToCart }) => {
    return (
        <>
            <button
                onClick={() => handleAddToCart(product)}
                className="product__cart-button"
            >
                В корзину
            </button>
            <button
                onClick={() => handleAddToCart(product)}
                className="product-mobile__cart-button"
            >
                <ReactSVG
                    src={cart}
                    className=""
                    beforeInjection={(svg) => {
                        const path = svg.querySelector("path");
                        if (path) {
                            path.setAttribute("stroke", "#161616");
                        }
                    }}
                />
            </button>
        </>
    );
};

export default ProductAddToCart;
