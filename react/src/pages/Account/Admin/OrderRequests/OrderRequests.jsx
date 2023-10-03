import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Loader from "../../../../components/Loader/Loader";
import axiosInstance from "../../../../utils/axios/instance";
import AccountLayoutAdmin from "../AccountLayoutAdmin";
import OrderRequestCard from "./OrderRequestCard";

import "./OrderRequests.scss";

const OrderRequests = () => {
    const navigate = useNavigate();
    const access = localStorage.getItem("access_token");

    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        if (!access || access === undefined) {
            navigate("/home");
        }

        const fetchData = async () => {
            try {
                const response = await axiosInstance.get(
                    `/orders/all?page=${1}`
                );
                setData(response.data);
            } catch (error) {
                console.error(error);
            }
        };
        fetchData();
    }, [access, navigate]);

    const [data, setData] = useState([]);
    const [searchTerm, setSearchTerm] = useState(""); // Состояние для хранения поискового запроса

    const onSearch = async () => {
        if (searchTerm.trim() !== "") {
            // Выполните поиск на основе searchTerm
            const searchResponse = await axiosInstance.get(
                `/orders/search?name=${searchTerm}`
            );
            setData(searchResponse.data);

            if (searchResponse.data.length === 0) {
                const searchResponse = await axiosInstance.get(
                    `/orders/all?page=${currentPage}`
                );
                setData(searchResponse.data);
            }
        } else if (searchTerm.trim() === "") {
            const searchResponse = await axiosInstance.get(
                `/orders/all?page=${currentPage}`
            );
            setData(searchResponse.data);
        }
    };

    return (
        <div className="order-requests container">
            <AccountLayoutAdmin />
            <div className="order-requests__container">
                <div className="order-requests__header">
                    <div className="order-requests__title">Заявки</div>
                    <input
                        type="text"
                        className="order-requests__search"
                        placeholder="Поиск..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        onKeyUp={(e) => {
                            if (e.key === "Enter") {
                                onSearch();
                            }
                        }}
                    />
                </div>
                {data.length > 0 ? (
                    [...data]
                        .sort((a, b) => b.id - a.id)
                        .map((order) => {
                            return (
                                <OrderRequestCard
                                    key={order.id}
                                    order={order}
                                />
                            );
                        })
                ) : (
                    <Loader />
                )}
                <div className="navigation">
                    <button
                        onClick={(prev) => setCurrentPage(prev - 1)}
                        className="1"
                    >
                        -
                    </button>
                    <button
                        onClick={(prev) => setCurrentPage(prev + 1)}
                        className="2"
                    >
                        +
                    </button>
                </div>
            </div>
        </div>
    );
};

export default OrderRequests;
