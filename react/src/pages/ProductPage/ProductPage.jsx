import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axiosInstance from "../../utils/axios/instance";
import ProductReview from "./ProductReview";

const ProductPage = () => {
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

    return (
        <div className="product-page container">
            <div className="product-page__left-side">
                <img
                    src={data.image}
                    alt={data.name}
                    className="product-page__product-image"
                />
                <p className="product-page__section-title">Описание</p>
                <span className="product-page__long-desc">
                    {data.long_description}
                </span>
                <button className="product-page__learn-more">
                    Читать далее...
                </button>
                <p className="product-page__section-title">Отзывы</p>
                <ProductReview productId={productId} />
            </div>
            <div className="product-page__right-side">
                <p className="product-page__product-title"></p>
                <p className="product-page__product-subtitle"></p>
                <p className="product-page__product-category"></p>
            </div>
        </div>
    );
};

export default ProductPage;
