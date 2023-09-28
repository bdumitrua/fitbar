import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import ProductCard from "../../../components/ProductCard/ProductCard";
import { fetchProducts } from "../../../redux/services/products.service";
import { useCartContext } from "../../../utils/providers/cart.provider";
import "./ProductsSection.scss";

const ProductsSection = ({ category }) => {
    const { cartItems } = useCartContext();

    const dispatch = useDispatch();
    const products = useSelector((state) => state.products.products);
    const loading = useSelector((state) => state.products.loading);
    const error = useSelector((state) => state.products.error);

    useEffect(() => {
        // Загрузите продукты, если они еще не загружены
        if (!products.length && !loading && !error) {
            dispatch(fetchProducts());
        }
    }, [dispatch, products, loading, error]);

    return (
        <>
            {products ? (
                <section className="products-section" key={category.slug}>
                    <Link
                        to={category.slug}
                        className="products-section__title"
                    >
                        {category.name}
                    </Link>
                    <div className="products-container product-section">
                        {[...products]
                            .filter(
                                (product) => product.category_id === category.id
                            )
                            .sort((a, b) => b.orders_count - a.orders_count)
                            .slice(0, 4)
                            .map((product) => (
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
