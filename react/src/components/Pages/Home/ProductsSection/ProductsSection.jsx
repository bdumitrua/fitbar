import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ProductCard from "../../../ProductCard/ProductCard";
import "./ProductsSection.scss";

const ProductsSection = ({ categories }) => {
    const [data, setData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(
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
                            <Link
                                to={category.slug}
                                className="products-section__title"
                            >
                                {category.name}
                            </Link>
                            <div className="products-container">
                                {data ? (
                                    data
                                        .filter(
                                            (product) =>
                                                product.category_id ===
                                                category.id
                                        )
                                        .sort(
                                            (a, b) =>
                                                b.orders_count - a.orders_count
                                        )
                                        .slice(0, 4)
                                        .map((product) => (
                                            <ProductCard
                                                key={product.id}
                                                product={product}
                                            />
                                        ))
                                ) : (
                                    <p>Загрузка...</p>
                                )}
                            </div>
                        </section>
                    ))
            ) : (
                <p>Загрузка...</p>
            )}
        </>
    );
};

export default ProductsSection;
