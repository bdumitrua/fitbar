import axios from "axios";
import { useEffect, useState } from "react";
import "./Category.scss";
import CategoryAside from "./CategoryAside/CategoryAside";
import CategoryPage from "./CategoryPage/CategoryPage";

const Category = () => {
    const [data, setData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(
                    "http://localhost:8000/api/category"
                );
                setData(response.data);
            } catch (error) {
                console.error("Произошла ошибка при выполнении запроса", error);
            }
        };

        fetchData();
    }, []);

    return (
        <div className="category container">
            <CategoryAside />
            {data ? (
                data.map((category) => {
                    <CategoryPage categories={category} />;
                })
            ) : (
                <p>Загрузка...</p>
            )}
        </div>
    );
};

export default Category;
