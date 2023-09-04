import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Loader from "../../components/Loader/Loader";
import ProductRating from "../../components/ProductRating/ProductRating";
import axiosInstance from "../../utils/axios/instance";
import { useCartContext } from "../../utils/providers/cart.provider";
import "./ProductPage.scss";
import ProductPageAddToCart from "./ProductPageAddToCart";
import ProductPageCounter from "./ProductPageCounter";
import ProductPageFavorite from "./ProductPageFavorite";
import ProductReviews from "./ProductReview/ProductReview";

// TODO
// Пофиксить кнопки лайка/дизлайка отзыва

const ProductPage = () => {
    const [isActive, setIsActive] = useState(false);

    const { handleAddToCart, cartItems, setCartItems } = useCartContext();

    const location = useLocation();
    const splittedPathname = location.pathname.split("/");
    const productId = splittedPathname[2];

    const [data, setData] = useState(null);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axiosInstance.get(
                    `/products/show/${productId}`
                );
                setData(response.data);
            } catch (error) {
                console.error("Произошла ошибка при выполнении запроса", error);
            }
        };

        fetchData();
    }, [productId]);

    const reviewsCount = data
        ? data.reviews
            ? data.reviews.length
            : "Нет"
        : "Нет";

    function getEnding(number, wordForms) {
        const cases = [2, 0, 1, 1, 1, 2];
        return wordForms[
            number % 100 > 4 && number % 100 < 20
                ? 2
                : cases[Math.min(number % 10, 5)]
        ];
    }
    const reviewsForms = ["отзыв", "отзыва", "отзывов"];
    const reviewsEnding = getEnding(reviewsCount, reviewsForms);

    const categoryNames = [
        "",
        "Жиры",
        "Витамины",
        "Аминокислоты",
        "Батончики и снэки",
        "Протеин",
        "Креатин",
        "Напитки",
        "Предтрен",
    ];

    return (
        <div className="product-page container">
            {data ? (
                <>
                    <div className="product-page__left-side">
                        <img
                            src={data.image}
                            alt={data.name}
                            className="product-page__product-image"
                        />
                        <p className="product-page__section-title">Описание</p>
                        <span
                            className={`product-page__long-desc ${
                                isActive ? "active" : ""
                            }`}
                        >
                            {data.long_description}
                        </span>
                        <button
                            className="product-page__learn-more"
                            onClick={() => setIsActive(() => !isActive)}
                        >
                            {!isActive ? "Читать далее..." : "Скрыть"}
                        </button>
                        <p className="product-page__section-title">Отзывы</p>
                        <ProductReviews
                            productId={productId}
                            reviews={data.reviews}
                        />
                    </div>
                    <div className="product-page__right-side">
                        <p className="product-page__product-title">
                            {data.name}
                        </p>
                        <p className="product-page__product-subtitle">
                            {data.short_description}
                        </p>
                        <p className="product-page__product-category">
                            {categoryNames[data.category_id]}
                        </p>
                        <div className="product-page__rating">
                            <ProductRating rating={data.rating} />
                            <p className="product-page__reviews-count">{`${reviewsCount} ${reviewsEnding}`}</p>
                        </div>
                        <p className="product-page__product-price">{`${data.price} руб.`}</p>
                        <p className="product-page__selector-title">Вкус:</p>
                        <button className="product-page__product-taste-selector">
                            Пока не ясно
                        </button>
                        <Link to="/" className="product-page__how-to-use">
                            Руководство по использованию
                        </Link>
                        <p className="product-page__selector-title">Вес:</p>
                        <button
                            className="product-page__weight-selector"
                            disabled
                        >
                            {data.weight}
                        </button>
                        <p className="product-page__selector-title">
                            Количество:
                        </p>
                        <ProductPageCounter
                            isProductInCart={cartItems.some(
                                (item) => item.id === data.id
                            )}
                            productId={data.id}
                        />
                        <ProductPageAddToCart
                            isProductInCart={cartItems.some(
                                (item) => item.id === data.id
                            )}
                            product={data}
                            handleAddToCart={(product) => {
                                handleAddToCart(product);
                            }}
                        />
                        <ProductPageFavorite productId={data.id} />
                    </div>
                </>
            ) : (
                <Loader />
            )}
        </div>
    );
};

export default ProductPage;
