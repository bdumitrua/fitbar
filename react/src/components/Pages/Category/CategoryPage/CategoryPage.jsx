import { useEffect, useState } from "react";
import axiosInstance from "../../../../utils/axios/instance";
import { useCartContext } from "../../../../utils/providers/cart.provider";
import ProductCard from "../../../ProductCard/ProductCard";
import "./CategoryPage.scss";

const CategoryPage = ({ category }) => {
    const [data, setData] = useState(null);
    const [itemCount, setItemCount] = useState(0);
    const { cartItems } = useCartContext();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axiosInstance.get("/products");
                setData(response.data);
                setItemCount(
                    response.data.filter(
                        (product) => product.category_id === category.id
                    ).length
                );
            } catch (error) {
                console.error("Произошла ошибка при выполнении запроса", error);
            }
        };

        fetchData();
    }, [category.id]);

    return (
        <div className="category-page">
            <h3 className="category-page__title">{category.name}</h3>
            <p className="category-page__items-count">{`${itemCount} результатов`}</p>
            <button className="category-page__sort">Популярные</button>
            <div className="category-page__products">
                {data ? (
                    data
                        .filter(
                            (product) => product.category_id === category.id
                        )
                        .map((product) => {
                            return (
                                <ProductCard
                                    key={product.id}
                                    product={product}
                                    itemCount={itemCount}
                                    isProductInCart={cartItems.some(
                                        (item) => item.id === product.id
                                    )}
                                />
                            );
                        })
                ) : (
                    <p>Загрузка...</p>
                )}
            </div>
        </div>
    );
};

export default CategoryPage;
