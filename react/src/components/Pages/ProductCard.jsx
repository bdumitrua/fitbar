import React from 'react'

const ProductCard = (product) => {
  return (
    <div className='product'>
        <div className="product__image">
            <img src="" alt="" className="product__image-element" />
            <img className="product__image-favorite" />
            <button className="product__image-cart-button">Добавить в корзину</button>
        </div>
        <p className="product__title">{product.name}</p>
        <div className="product__rating">fetch</div>
        <p className="product__price">{product.price}</p>
    </div>
  )
}

export default ProductCard