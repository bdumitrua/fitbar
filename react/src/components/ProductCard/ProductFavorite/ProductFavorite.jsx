import { useEffect, useState } from "react";
import { ReactSVG } from "react-svg";
import heart from "../../../images/heart.svg";

const ProductFavorite = ({ productId }) => {
    const [isFavorite, setIsFavorite] = useState(false);

    // Ключ, который будет использоваться для сохранения в localStorage
    const localStorageKey = `favoriteProduct_${productId}`;

    // Проверка, есть ли товар в избранном при загрузке компонента
    useEffect(() => {
        const favoriteProduct = localStorage.getItem(localStorageKey);
        setIsFavorite(!!favoriteProduct);
    }, []);

    // Функция для переключения состояния добавления в избранное
    const toggleFavorite = () => {
        if (isFavorite) {
            localStorage.removeItem(localStorageKey);
        } else {
            localStorage.setItem(localStorageKey, "true");
        }
        setIsFavorite(!isFavorite);
    };

    return (
        <button className="product__favorite" onClick={() => toggleFavorite()}>
            <ReactSVG
                src={heart}
                className={`product__favorite-heart ${
                    isFavorite ? "active" : ""
                }`}
                beforeInjection={(svg) => {
                    const path = svg.querySelector("path");
                    if (path) {
                        path.setAttribute(
                            "fill",
                            isFavorite ? "#CEF600" : "none"
                        );
                    }
                }}
            />
        </button>
    );
};

export default ProductFavorite;
