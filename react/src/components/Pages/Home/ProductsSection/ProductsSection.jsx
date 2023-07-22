import React from 'react'

const ProductsSection = (category, products) => {
  return (
    <section className="products-section">
        {/* <a href="" className="products-section__title">{category.name}</a>
        {products ? (
            products
            .filter(product => product.category_id === category.id)
            .slice(0, 4)
            .map(product => (
                <ProductCard product={product}/>
            ))
        ) : (
            <p>Загрузка...</p>
        )} */}
    </section>
  )
}

export default ProductsSection