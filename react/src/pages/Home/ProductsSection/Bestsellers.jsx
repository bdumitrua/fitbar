import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../../components/Loader/Loader";
import ProductCard from "../../../components/ProductCard/ProductCard";
import { fetchProducts } from "../../../redux/services/products.service";
import axiosInstance from "../../../utils/axios/instance";
import { useCartContext } from "../../../utils/providers/cart.provider";
import "./ProductsSection.scss";

const Bestsellers = () => {
    const { cartItems } = useCartContext();

    const dispatch = useDispatch();
    const products = useSelector((state) => state.products.products);
    const loading = useSelector((state) => state.products.loading);
    const error = useSelector((state) => state.products.error);

    const [data, setData] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axiosInstance.get("/home/bestsallers");
                setData(response.data);
            } catch (error) {
                console.error(error);
            }
        };
        fetchData();
    }, [dispatch, products, loading, error]);

    useEffect(() => {
        // Загрузите продукты, если они еще не загружены
        if (!products.length && !loading && !error) {
            dispatch(fetchProducts());
        }
    }, [dispatch, products, loading, error]);

    return (
        <section className="products-section" key="bestsellers">
            <p className="products-section__title">бестселлеры</p>
            <div className="products-container bestsellers">
                {data ? (
                    [...data]
                        .sort((a, b) => b.orders_count - a.orders_count)
                        .slice(0, 8)
                        .map((product) => (
                            <ProductCard
                                key={product.id}
                                product={product}
                                isProductInCart={cartItems.some(
                                    (item) => item.id === product.id
                                )}
                            />
                        ))
                ) : (
                    <Loader />
                )}
            </div>
        </section>
    );
};

export default Bestsellers;
