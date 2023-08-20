import { useEffect, useState } from "react";
import axiosInstance from "../../../utils/axios/instance";
import "../Account.scss";
import AccountLayout from "../AccountAside";
import "./AccountOrders.scss";
import OrderAccountCard from "./OrderCard/OrderAccountCard";

const AccountOrders = () => {
    const [data, setData] = useState();
    const [length, setLength] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axiosInstance.get("/orders");
                setData(response.data.orders);
                setLength(response.data.orders.length);
            } catch (error) {
                console.error("Ошибка", error);
            }
        };
        fetchData();
    }, []);

    console.log(data);

    return (
        <div className="account container">
            <AccountLayout />
            <div className="account-orders">
                {length ? (
                    data.map((order) => {
                        return (
                            <OrderAccountCard order={order} key={order.id} />
                        );
                    })
                ) : (
                    <p className="no-orders">У вас еще нет заказов! :c</p>
                )}
            </div>
        </div>
    );
};

export default AccountOrders;
