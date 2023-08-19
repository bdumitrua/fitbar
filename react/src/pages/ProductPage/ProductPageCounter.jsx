import { useState } from "react";

const ProductPageCounter = ({ productId }) => {
    const [productCount, setProductCount] = useState(
        +localStorage.getItem(`product_count_${productId}` || 1)
    );

    const incrementProductCount = () => {
        setProductCount((prevCount) => {
            const newCount = prevCount + 1;
            localStorage.setItem(`product_count_${productId}`, newCount);
            return newCount;
        });
    };

    const decrementProductCount = () => {
        setProductCount((prevCount) => {
            const newCount = prevCount - 1;
            localStorage.setItem(`product_count_${productId}`, newCount);
            return newCount;
        });
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
