import { useState } from "react";
import "./CartCard.scss";

import { Link } from "react-router-dom";

import deleteFromCart from "../../../assets/images/delete.svg";
import axiosInstance from "../../../utils/axios/instance";

const CartCard = ({ product, handleRemoveFromCart, updateTotalPrice }) => {
    const [productCount, setProductCount] = useState(
        +localStorage.getItem(`product_count_${product.id}` || 1)
    );

    const incrementProductCount = () => {
        setProductCount((prevCount) => {
            const newCount = prevCount + 1;
            axiosInstance.patch(`/cart/increase/${product.id}`);
            localStorage.setItem(`product_count_${product.id}`, newCount);
            updateTotalPrice(); // Добавьте это
            return newCount;
        });
    };

    const decrementProductCount = () => {
        setProductCount((prevCount) => {
            if (prevCount > 1) {
                const newCount = prevCount - 1;
                axiosInstance.patch(`/cart/decrease/${product.id}`);
                localStorage.setItem(`product_count_${product.id}`, newCount);
                updateTotalPrice(); // Добавьте это
                return newCount;
            }
            return prevCount;
        });
    };

    return (
        <div className="cart-card">
            <Link to={`/products/${product.id}`}>
                <img src={product.image} alt="" className="cart-card__image" />
            </Link>
            <div className="cart-card__main-info">
                <Link
                    to={`/products/${product.id}`}
                    className="cart-card__title"
                >
                    <p>{product.name}</p>
                </Link>
                <div className="cart-card__about-cart">
                    <p className="cart-card__info">Вкус:</p>
                    <p className="cart-card__info">Объём:</p>
                    <p className="cart-card__info">{product.taste}</p>
                    <p className="cart-card__info">{product.weight}</p>
                </div>
            </div>
            <div className="cart-card__more">
                <div className="cart-card__product-count">
                    <button
                        onClick={() => decrementProductCount()}
                        className="cart-card__count-button"
                    >
                        -
                    </button>
                    <p className="cart-card__product-counter">{productCount}</p>
                    <button
                        onClick={() => incrementProductCount()}
                        className="cart-card__count-button"
                    >
                        +
                    </button>
                </div>
                <p className="cart-card__price">{`${Math.round(
                    product.price * productCount
                )} руб.`}</p>
                <button
                    className="cart-card__product-delete"
                    onClick={() => handleRemoveFromCart(product.id)}
                >
                    <img
                        src={deleteFromCart}
                        alt=""
                        className="cart-card__delete-image"
                    />
                </button>
            </div>
        </div>
    );
};

export default CartCard;
