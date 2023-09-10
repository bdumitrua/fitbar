import { useMemo, useState } from "react";
import Loader from "../../../components/Loader/Loader";
import ProductCard from "../../../components/ProductCard/ProductCard";
import axiosInstance from "../../../utils/axios/instance";
import { useCartContext } from "../../../utils/providers/cart.provider";
import "./ProductsSection.scss";

const Bestsellers = () => {
    const [data, setData] = useState(null);
    const { cartItems } = useCartContext();

    useMemo(() => {
        const fetchData = async () => {
            try {
                const response = await axiosInstance.get("/products");
                setData(response.data);
            } catch (error) {
                console.error("Произошла ошибка при выполнении запроса", error);
            }
        };

        fetchData();
    }, []);

    return (
        <section className="products-section" key="bestsellers">
            <p className="products-section__title">бестселлеры</p>
            <div className="products-container bestsellers">
                {data ? (
                    data
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
