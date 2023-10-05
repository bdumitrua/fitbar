import heart from "@/assets/images/heart.svg";
import { useEffect, useState } from "react";
import { ReactSVG } from "react-svg";

const ProductFavorite = ({ productId }) => {
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
