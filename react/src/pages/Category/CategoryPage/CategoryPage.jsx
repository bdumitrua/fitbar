import { useEffect, useState } from "react";
import ProductCard from "../../../components/ProductCard/ProductCard";
import axiosInstance from "../../../utils/axios/instance";
import { useCartContext } from "../../../utils/providers/cart.provider";
import "./CategoryPage.scss";

const CategoryPage = ({ category }) => {
    const [data, setData] = useState(null);
    const [itemCount, setItemCount] = useState(0);
    const [sortOption, setSortOption] = useState("popular"); // popular, new, old, priceLowToHigh, priceHighToLow

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

    const sortProducts = (products) => {
        switch (sortOption) {
            case "new":
                return products.slice().sort((a, b) => b.id - a.id);
            case "old":
                return products.slice().sort((a, b) => a.id - b.id);
            case "priceLowToHigh":
                return products.slice().sort((a, b) => a.price - b.price);
            case "priceHighToLow":
                return products.slice().sort((a, b) => b.price - a.price);
            default:
                return products; // Default: popular
        }
    };

    const sortedProducts = sortProducts(
        data
            ? data.filter((product) => product.category_id === category.id)
            : ""
    );

    function getEnding(number, wordForms) {
        const cases = [2, 0, 1, 1, 1, 2];
        return wordForms[
            number % 100 > 4 && number % 100 < 20
                ? 2
                : cases[Math.min(number % 10, 5)]
        ];
    }
    const resultForms = ["результат", "результата", "результатов"];
    const resultEnding = getEnding(itemCount, resultForms);

    return (
        <div className="category-page">
            <h3 className="category-page__title">{category.name}</h3>
            <p className="category-page__items-count">{`${itemCount} ${resultEnding}`}</p>
            <select
                className="category-page__sort"
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}
            >
                <option value="popular">Популярные</option>
                <option value="new">Новые</option>
                <option value="old">Старые</option>
                <option value="priceLowToHigh">Цена: по возрастанию</option>
                <option value="priceHighToLow">Цена: по убыванию</option>
            </select>
            <div className="category-page__products">
                {sortedProducts ? (
                    sortedProducts.map((product) => {
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
