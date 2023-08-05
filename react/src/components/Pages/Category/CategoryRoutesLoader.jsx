import axios from "axios";
import { useEffect, useState } from "react";
import CategoryPage from "./CategoryPage/CategoryPage";

const CategoryRoutesLoader = () => {
    const [data, setData] = useState([]);

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

    return data.map((category) => ({
        path: `categories/${category.slug}`,
        element: <CategoryPage />,
    }));
};

export default CategoryRoutesLoader;
