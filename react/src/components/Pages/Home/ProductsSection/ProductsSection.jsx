import axios from "axios";
import { React, useEffect, useState } from "react";
import ProductCard from "../../ProductCard";
import "./ProductsSection.scss";

const ProductsSection = ({ categories }) => {
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

    console.log(categories);

    return (
        <>
            {categories ? (
                categories
                    .sort((a, b) => b.orders_count - a.orders_count)
                    .slice(0, 2)
                    .map((category) => (
                        <section
                            className="products-section"
                            key={category.slug}
                        >
                            <a
                                href={category.slug}
                                className="products-section__title"
                            >
                                {category.name}
                            </a>
                            {data ? (
                                data
                                    .slice(0, 4)
                                    .map((product) => (
                                        <ProductCard product={product} />
                                    ))
                            ) : (
                                <p>Загрузка...</p>
                            )}
                        </section>
                    ))
            ) : (
                <p>Загрузка...</p>
            )}
        </>
    );
};

export default ProductsSection;
