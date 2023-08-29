import { useEffect, useState } from "react";
import axiosInstance from "../../../../utils/axios/instance";
import AccountLayoutAdmin from "../AccountLayoutAdmin";
import "./Assortment.scss";
import AssortmentCard from "./AssortmentCard";

const Assortment = () => {
    const [data, setData] = useState(null);
    const [itemsLen, setItemsLen] = useState(3);

    const increaseItemsLen = () => {
        setItemsLen(() => itemsLen + 3);
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axiosInstance.get("/products");
                setData(response.data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
    }, []);

    return (
        <div className="assortment container">
            <AccountLayoutAdmin />
            <div className="assortment__content">
                <div className="assortment__header">
                    <div className="assortment__title">Ассортимент</div>
                    <input
                        type="text"
                        className="assortment__search"
                        placeholder="Поиск..."
                    />
                    <div className="assortment__buttons">
                        <button className="assortment__button">
                            Добавление товара
                        </button>
                        <button className="assortment__button">
                            Вывод данных
                        </button>
                    </div>
                </div>
                {data ? (
                    data
                        .sort((a, b) => b.rating - a.rating)
                        .slice(0, itemsLen)
                        .map((product) => {
                            return (
                                <AssortmentCard
                                    key={product.id}
                                    product={product}
                                />
                            );
                        })
                ) : (
                    <p>Загрузка...</p>
                )}
            </div>
        </div>
    );
};

export default Assortment;
