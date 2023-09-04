import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Loader from "../../components/Loader/Loader";
import axiosInstance from "../../utils/axios/instance";
import "./Category.scss";
import CategoryAside from "./CategoryAside/CategoryAside";
import CategoryPage from "./CategoryPage/CategoryPage";

const Category = () => {
    const [data, setData] = useState(null);
    const location = useLocation();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axiosInstance.get("/category");
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
                data
                    .filter(
                        (category) =>
                            location.pathname === `/category/${category.slug}`
                    )
                    .map((category) => {
                        return (
                            <CategoryPage
                                key={category.id}
                                category={category}
                            />
                        );
                    })
            ) : (
                <Loader />
            )}
        </div>
    );
};

export default Category;
