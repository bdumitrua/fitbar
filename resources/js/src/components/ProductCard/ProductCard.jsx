import { useCartContext } from "@/utils/providers/cart.provider";
import { Link } from "react-router-dom";
import ProductRating from "../ProductRating/ProductRating";
import ProductAddToCart from "./ProductAddToCart/ProductAddToCart";
import "./ProductCard.scss";
import ProductFavorite from "./ProductFavorite/ProductFavorite";

import cart from "@/assets/images/cartProduct.svg";
import { ReactSVG } from "react-svg";

const ProductCard = ({ product, itemCount, isProductInCart }) => {
    const { handleAddToCart } = useCartContext();

    return (
        <div
            className={`product ${
                itemCount % 3 === 2 ? "last-row-two-items" : ""
            }`}
            key={product.id}
        >
            <div className="product__image">
                <Link to={`/products/${product.id}`} className="product__link">
                    <img
                        src={product.image}
                        alt=""
                        className="product__image-element"
                    />
                </Link>
                <ProductFavorite productId={product.id} />
                {isProductInCart ? (
                    <>
                        <Link
                            to="/cart"
                            className="product__cart-button active"
                        >
                            Корзина
                        </Link>
                        <Link to="/cart" className="">
                            <ReactSVG
                                src={cart}
                                className="product-mobile__cart-button"
                                beforeInjection={(svg) => {
                                    const path = svg.querySelector("path");
                                    if (path) {
                                        path.setAttribute("stroke", "#CEF600");
                                    }
                                }}
                            />
                        </Link>
                    </>
                ) : (
                    <ProductAddToCart
                        product={product}
                        handleAddToCart={(product) => {
                            handleAddToCart(product);
                            localStorage.setItem(
                                `product_count_${product.id}`,
                                1
                            );
                        }}
                    />
                )}
            </div>
            <p className="product__title">{product.name}</p>
            <ProductRating rating={product.rating} />
            <p className="product__price">
                От {Math.round(+product.price)} руб.
            </p>
        </div>
    );
};

export default ProductCard;
