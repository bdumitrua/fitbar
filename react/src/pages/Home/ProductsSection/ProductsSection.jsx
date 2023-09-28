import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import ProductCard from "../../../components/ProductCard/ProductCard";
import { useCartContext } from "../../../utils/providers/cart.provider";
import "./ProductsSection.scss";

const ProductsSection = ({ category }) => {
    const { cartItems } = useCartContext();

    console.log(category);

    const dispatch = useDispatch();
    const products = useSelector((state) => state.products.products);
    const loading = useSelector((state) => state.products.loading);
    const error = useSelector((state) => state.products.error);

    // useEffect(() => {
    //     // Загрузите продукты, если они еще не загружены
    //     if (!products.length && !loading && !error) {
    //         dispatch(fetchProducts());
    //     }
    // }, [dispatch, products, loading, error]);

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
