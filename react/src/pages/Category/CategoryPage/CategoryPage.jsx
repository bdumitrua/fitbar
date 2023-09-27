import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../../components/Loader/Loader";
import ProductCard from "../../../components/ProductCard/ProductCard";
import { fetchProducts } from "../../../redux/services/products.service";
import { useCartContext } from "../../../utils/providers/cart.provider";
import "./CategoryPage.scss";

const CategoryPage = ({ category }) => {
    const [itemCount, setItemCount] = useState(0);
    const [sortOption, setSortOption] = useState("popular"); // popular, new, old, priceLowToHigh, priceHighToLow

    const { cartItems } = useCartContext();

    const dispatch = useDispatch();
    const products = useSelector((state) => state.products.data);
    const loading = useSelector((state) => state.products.loading);
    const error = useSelector((state) => state.products.error);

    useEffect(() => {
        // Загрузите продукты, если они еще не загружены
        if (!products.length && !loading && !error) {
            dispatch(fetchProducts());
        } else {
            setItemCount(
                [...products].filter(
                    (product) => product.category_id === category.id
                ).length
            );
        }
    }, [dispatch, products, loading, error, category.id]);

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
        products
            ? [...products].filter(
                  (product) => product.category_id === category.id
              )
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
                    <Loader />
                )}
            </div>
        </div>
    );
};

export default CategoryPage;
