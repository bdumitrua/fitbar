import axiosInstance from "@/utils/axios/instance";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AccountLayoutAdmin from "../AccountLayoutAdmin";

const OrderRequests = () => {
    const navigate = useNavigate();
    const access = localStorage.getItem("access_token");

    useEffect(() => {
        if (!access || access === undefined) {
            navigate("/home");
        }
    }, [access, navigate]);

    const [data, setData] = useState([]);
    const [searchTerm, setSearchTerm] = useState(""); // Состояние для хранения поискового запроса

    const onSearch = async () => {
        if (searchTerm.trim() !== "") {
            // Выполните поиск на основе searchTerm
            const searchResponse = await axiosInstance.get(
                "/orders/search",
                searchTerm
            );
            console.log(searchResponse.data);
            setData(searchResponse.data);
        } else {
            const searchResponse = await axiosInstance.get(
                "/orders/all",
                searchTerm
            );
            console.log(searchResponse.data);
            setData(searchResponse.data);
        }
    };

    return (
        <div className="order-requests container">
            <AccountLayoutAdmin />
            <div className="order-request__container">
                <div className="assortment__header">
                    <div className="assortment__title">Заявки</div>
                    <input
                        type="text"
                        className="assortment__search"
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
            </div>
        </div>
    );
};

export default OrderRequests;
