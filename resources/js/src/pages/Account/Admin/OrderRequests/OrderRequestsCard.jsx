import { useMainContext } from "@/utils/providers/main.provider";
import "./OrderRequestsCard.scss";

const OrderRequestCard = ({ order }) => {
    const { formatDate } = useMainContext();

    const orderStage = [
        "Заказ создан",
        "Сборка",
        "Передано в доставку",
        "Доставлено",
        "Заказ закрыт",
    ];

    return (
        <div className="order-request-card">
            <img
                src={order.product.image}
                alt=""
                className="order-request-card__image"
            />
            <div className="order-request-card__main-info">
                <div className="order-request-cart__main-info-header">
                    <p className="order-request-card__title">
                        {order.product.name}
                    </p>

                    <p className="order-request-card__price">{`${order.total_price} руб.`}</p>
                </div>
                <div className="order-request-card__about-order-request">
                    <p className="order-request-card__info">{`ID ${order.id}`}</p>
                    <p className="order-request-card__info">{`Заказ от ${formatDate(
                        order.created_at
                    )}`}</p>
                    <p className="order-request-card__info">
                        {`Заказчик ${order.user.name}`}
                    </p>
                </div>
            </div>
            <div className="order-request-card__buttons">
                <div className="order-request__select-container">
                    <select className="order-request__custom-select">
                        {orderStage.map((option, index) => (
                            <option key={index}>{option}</option>
                        ))}
                    </select>
                </div>

                <button className="order-request-card__button">
                    Подробнее
                </button>
            </div>
        </div>
    );
};

export default OrderRequestCard;
