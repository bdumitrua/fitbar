import axiosInstance from "@/utils/axios/instance";
import { useMainContext } from "@/utils/providers/main.provider";
import { useEffect, useState } from "react";
import "../AccountOrders.scss";
import OrderCardProduct from "./OrderCardProduct";

const OrderAccountCard = ({ orderId }) => {
    const { formatDate } = useMainContext();

    const [data, setData] = useState();
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axiosInstance.get(
                    `/orders/id/${orderId}`
                );
                setData(response.data);
            } catch (error) {
                console.error(error);
            }
        };
        fetchData();
    }, [orderId]);

    return (
        <>
            {data ? (
                <div className="order-card-account">
                    <div className="order-card__about">
                        <div className="order-card__about-header">
                            <p className="order-card__info">{`Заказ от ${formatDate(
                                data.created_at
                            )}`}</p>

                            <div className="order-card__header-right-side">
                                <span>оплачено</span>{" "}
                                <p>{`${Math.floor(data.total_price)} руб.`}</p>
                            </div>
                        </div>
                        <div className="order-card__main-info">
                            <div className="order-card__main-info-left-side">
                                <div className="order-card__status">
                                    Доставка в пункт выдачи{" "}
                                    <p className="order-card__status-info">{`${data.status}`}</p>
                                </div>
                                <p className="order-card__info">{`Дата доставки: ${formatDate(
                                    data.updated_at
                                )}`}</p>
                            </div>
                            <div className="order-cart__products">
                                {data.products.map((productId) => {
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
