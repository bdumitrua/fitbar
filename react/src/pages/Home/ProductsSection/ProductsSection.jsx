import { Link } from "react-router-dom";
import ProductCard from "../../../components/ProductCard/ProductCard";
import { useCartContext } from "../../../utils/providers/cart.provider";
import "./ProductsSection.scss";

const ProductsSection = ({ category }) => {
    const { cartItems } = useCartContext();

    return (
        <>
            {category ? (
                <section className="products-section" key={category.slug}>
                    <Link
                        to={category.slug}
                        className="products-section__title"
                    >
                        {category.category}
                    </Link>
                    <div className="products-container product-section">
                        {[...category.products].map((product) => (
                            <ProductCard
                                key={product.id}
                                product={product}
                                isProductInCart={cartItems.some(
                                    (item) => item.id === product.id
                                )}
                            />
                        ))}
                    </div>
                </section>
            ) : (
                <div className=""></div>
            )}
        </>
    );
};

export default ProductsSection;
