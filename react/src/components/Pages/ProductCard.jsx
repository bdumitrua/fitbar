import React from "react";

const ProductCard = (product) => {
    return (
        <div className="product">
            <a href={product.id} className="product__image">
                <img
                    src={product.image}
                    alt=""
                    className="product__image-element"
                />
                <img className="product__image-favorite" />
                <button className="product__image-cart-button">
                    Добавить в корзину
                </button>
            </a>
            <p className="product__title">{product.name}</p>
            <div className="product__rating">fetch</div>
            <p className="product__price">{product.price}</p>
        </div>
    );
};

export default ProductCard;
