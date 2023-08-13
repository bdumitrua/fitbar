import axios from "axios";
import { useEffect, useState } from "react";
import ProductCard from "../../../ProductCard/ProductCard";

const CategoryPage = ({ categories }) => {
    const [data, setData] = useState(null);
    const [itemCount, setItemCount] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(
                    "http://localhost:8000/api/products"
                );
                setData(response.data);
                setItemCount(
                    response.data.filter(
                        (product) => product.category_id === categories.id
                    ).length
                );
            } catch (error) {
                console.error("Произошла ошибка при выполнении запроса", error);
            }
        };

        fetchData();
    }, []);

    return (
        <div className="category-page">
            <h3 className="category-page__title">{categories.name}</h3>
            <p className="category-page__items-count">{itemCount}</p>
            <button className="category-page__sort">Популярные</button>
            {data ? (
                data.map((product) => {
                    <ProductCard product={product} />;
                })
            ) : (
                <p>Загрузка...</p>
            )}
        </div>
    );
};

export default CategoryPage;
