import { useEffect, useState } from "react";
import axiosInstance from "../../../../utils/axios/instance";
import "../Account.scss";
import AccountLayout from "../AccountAside";
import "./AccountOrders.scss";
import OrderCard from "./OrderCard/OrderCard";

const AccountOrders = () => {
    const [data, setData] = useState(null);
    const [length, setLength] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axiosInstance.get("orders");
                setData(response.data.orders);
                setLength(response.data.orders.length);
            } catch (error) {
                console.error("Ошибка", error);
            }
        };
        fetchData();
    }, []);

    return (
        <div className="account container">
            <AccountLayout />
            <div className="account-orders">
                {length ? (
                    data.map((order) => {
                        <OrderCard order={order} />;
                    })
                ) : (
                    <p className="no-orders">У вас еще нет заказов! :c</p>
                )}
            </div>
        </div>
    );
};

export default AccountOrders;
