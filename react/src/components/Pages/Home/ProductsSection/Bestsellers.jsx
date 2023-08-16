import { useEffect, useState } from "react";
import axiosInstance from "../../../../utils/axios/instance";
import ProductCard from "../../../ProductCard/ProductCard";
import "./ProductsSection.scss";

const Bestsellers = () => {
    const [data, setData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axiosInstance.get(
                    "http://localhost:8000/api/products"
                );
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
            <div className="products-container">
                {data ? (
                    data
                        .sort((a, b) => b.orders_count - a.orders_count)
                        .slice(0, 8)
                        .map((product) => (
                            <ProductCard key={product.id} product={product} />
                        ))
                ) : (
                    <p>Загрузка...</p>
                )}
            </div>
        </section>
    );
};

export default Bestsellers;
