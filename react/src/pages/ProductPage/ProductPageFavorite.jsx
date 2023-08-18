import { useEffect, useState } from "react";
import "./ProductPage.scss";

const ProductPageFavorite = ({ productId }) => {
    const [isFavorite, setIsFavorite] = useState(false);

    // Ключ, который будет использоваться для сохранения в localStorage

    // Проверка, есть ли товар в избранном при загрузке компонента
    useEffect(() => {
        const favoriteProduct = localStorage.getItem(
            `favoriteProduct_${productId}`
        );
        setIsFavorite(!!favoriteProduct);
    }, [productId]);

    // Функция для переключения состояния добавления в избранное
    const toggleFavorite = () => {
        if (isFavorite) {
            localStorage.removeItem(`favoriteProduct_${productId}`);
        } else {
            localStorage.setItem(`favoriteProduct_${productId}`, "true");
        }
        setIsFavorite(!isFavorite);
    };

    return (
        <>
            {isFavorite ? (
                <button
                    className="product-page__favorite-button"
                    onClick={() => toggleFavorite()}
                >
                    Добавить в избранное
                </button>
            ) : (
                <button
                    className="product-page__favorite-button active"
                    onClick={() => toggleFavorite()}
                >
                    Убрать из избранного
                </button>
            )}
        </>
    );
};

export default ProductPageFavorite;
