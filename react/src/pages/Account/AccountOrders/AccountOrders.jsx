import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Loader from "../../../components/Loader/Loader";
import axiosInstance from "../../../utils/axios/instance";
import "../Account.scss";
import AccountLayout from "../AccountLayout";
import "./AccountOrders.scss";
import OrderAccountCard from "./OrderCard/OrderAccountCard";

const AccountOrders = () => {
    const navigate = useNavigate();
    const access = localStorage.getItem("access_token");

    useEffect(() => {
        if (!access || access === undefined) {
            navigate("/home");
        }
    }, [access, navigate]);

    const [data, setData] = useState();
    const [length, setLength] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axiosInstance.get("/orders");
                setData(response.data.data);
                setLength(response.data.data.length);
            } catch (error) {
                console.error("Ошибка", error);
            }
        };
        fetchData();
    }, []);

    return (
        <div className="account container">
            <AccountLayout />
            {data ? (
                <div className="account-orders">
                    {length ? (
                        data.map((order) => {
                            return (
                                <OrderAccountCard
                                    orderId={order.id}
                                    key={order.id}
                                />
                            );
                        })
                    ) : (
                        <p className="no-orders">У вас еще нет заказов! :c</p>
                    )}
                </div>
            ) : (
                <Loader />
            )}
        </div>
    );
};

export default AccountOrders;
