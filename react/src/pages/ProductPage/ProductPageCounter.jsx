import { useState } from "react";
import axiosInstance from "../../utils/axios/instance";

const ProductPageCounter = ({ productId, isProductInCart }) => {
    const [productCount, setProductCount] = useState(
        +localStorage.getItem(`product_count_${productId}`) || 1
    );

    const incrementProductCount = async () => {
        const newCount = productCount + 1;
        setProductCount(newCount);
        localStorage.setItem(`product_count_${productId}`, newCount);
        if (isProductInCart) {
            try {
                await axiosInstance.patch(`/cart/increase/${productId}`);
            } catch (error) {
                console.error("Ошибка при запросе на сервер", error);
            }
        }
    };

    const decrementProductCount = async () => {
        if (productCount > 0) {
            const newCount = productCount - 1;
            setProductCount(newCount);
            localStorage.setItem(`product_count_${productId}`, newCount);

            if (isProductInCart) {
                try {
                    await axiosInstance.patch(`/cart/decrease\/${productId}`);
                } catch (error) {
                    console.error("Ошибка при запросе на сервер", error);
                }
            }
        }
    };

    return (
        <div className="product-page__count">
            <button
                onClick={() => decrementProductCount()}
                className="product-page__count-button"
            >
                -
            </button>
            <p className="product-page__product-counter">{productCount}</p>
            <button
                onClick={() => incrementProductCount()}
                className="product-page__count-button"
            >
                +
            </button>
        </div>
    );
};

export default ProductPageCounter;
