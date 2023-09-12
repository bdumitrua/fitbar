import { useMainContext } from "../../../../utils/providers/main.provider";
import "../AccountOrders.scss";
import OrderCardProduct from "./OrderCardProduct";

const OrderAccountCard = ({ order }) => {
    const { formatDate } = useMainContext();

    order.products = [1, 2, 3];

    return (
        <>
            {order ? (
                <div className="order-card-account">
                    <div className="order-card__about">
                        <div className="order-card__about-header">
                            <p className="order-card__info">{`Заказ от ${formatDate(
                                order.created_at
                            )}`}</p>

                            <div className="order-card__header-right-side">
                                <span>оплачено</span>{" "}
                                <p>{`${Math.floor(order.total_price)} руб.`}</p>
                            </div>
                        </div>
                        <div className="order-card__main-info">
                            <div className="order-card__main-info-left-side">
                                <div className="order-card__status">
                                    Доставка в пункт выдачи{" "}
                                    <p className="order-card__status-info">{`${order.status}`}</p>
                                </div>
                                <p className="order-card__info">{`Дата доставки: ${formatDate(
                                    order.updated_at
                                )}`}</p>
                            </div>
                            <div className="order-cart__products">
                                {order.products.map((productId) => {
                                    return (
                                        <OrderCardProduct
                                            key={productId}
                                            productId={productId}
                                        />
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <p>Загрузка</p>
            )}
        </>
    );
};

export default OrderAccountCard;
