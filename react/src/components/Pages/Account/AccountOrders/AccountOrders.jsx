import axios from "axios";
import { useEffect, useState } from "react";
import OrderCard from "../../../OrderCard/OrderCard";
import "../Account.scss";
import AccountLayout from "../AccountAside";
import "./AccountOrders.scss";

const AccountOrders = () => {
    const [data, setData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(
                    "http://localhost:8000/api/orders"
                );
                setData(response.data);
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
                {data ? (
                    data.map((order) => {
                        <OrderCard order={order} />;
                    })
                ) : (
                    <p>Загрузка...</p>
                )}
            </div>
        </div>
    );
};

export default AccountOrders;
