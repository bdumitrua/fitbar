import axios from "axios";
import { React, useEffect, useState } from "react";
import ProductCard from "../../ProductCard";
import "./ProductsSection.scss";

const Bestsellers = () => {
    const [data, setData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(
                    "http://localhost:8000/api/products"
                );
                setData(response.data); // сохранение данных в state
            } catch (error) {
                console.error("Произошла ошибка при выполнении запроса", error);
            }
        };

        fetchData();
    }, []);

    return (
        <section className="products-section">
            <a href="" className="products-section__title">
                бестселлеры
            </a>
            <ProductCard product={data} />
        </section>
    );
};

export default Bestsellers;
