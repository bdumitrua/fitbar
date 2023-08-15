import axios from "axios";
import { useEffect, useState } from "react";

const OrderCard = ({ order }) => {
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(
                    "http://localhost:8000/api/order_products"
                );
                setData(response.data);
            } catch (error) {
                console.error("Произошла ошибка при выполнении запроса", error);
            }
        };

        fetchData();
    }, []);

    return (
        <div className="order-card">
            <img src="" alt="" className="order-card__image" />
            <div className="order-card__main-info">
                <p className="order-card__title"></p>
                <div className="order-card__about-order">
                    <p className="order-card__info">Вкус:</p>
                    <p className="order-card__info"></p>
                    <p className="order-card__info">{`Заказ от `}</p>
                    <p className="order-card__info">Объём:</p>
                    <p className="order-card__info"></p>
                    <p className="order-card__info"></p>
                </div>
            </div>
            <div className="order-card__more">
                <button className="order-card__button">Повторить</button>
                <button className="order-card__button">Оставить отзыв</button>
                <div className="order-card__more-info">
                    <p className="order-card__price">{` руб.`}</p>
                    <p className="order-card__stage">{order.status}</p>
                </div>
            </div>
        </div>
    );
};

export default OrderCard;
