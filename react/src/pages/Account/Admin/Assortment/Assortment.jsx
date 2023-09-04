import { useEffect, useState } from "react";
import Loader from "../../../../components/Loader/Loader";
import axiosInstance from "../../../../utils/axios/instance";
import CreateProductModal from "../../../Modals/CreateProductModal";
import FindProductsModal from "../../../Modals/FindProductsModal";
import UpdateProductModal from "../../../Modals/UpdateProductModal";
import AccountLayoutAdmin from "../AccountLayoutAdmin";
import "./Assortment.scss";
import AssortmentCard from "./AssortmentCard";

const Assortment = () => {
    const [data, setData] = useState(null);
    const [itemsLen, setItemsLen] = useState(3);
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [showUpdateModal, setShowUpdateModal] = useState(false);
    const [showFindModal, setShowFindModal] = useState(false);

    const handleOpenCreateModal = () => {
        setShowCreateModal(true);
    };

    const handleOpenUpdateModal = () => {
        setShowUpdateModal(true);
    };

    const handleOpenFindModal = () => {
        setShowFindModal(true);
    };

    const handleCloseCreateModal = () => {
        setShowCreateModal(false);
    };

    const handleCloseUpdateModal = () => {
        setShowUpdateModal(false);
    };

    const handleCloseFindModal = () => {
        setShowFindModal(false);
    };

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
                        <button
                            className="assortment__button"
                            onClick={handleOpenCreateModal}
                        >
                            Добавление товара
                        </button>
                        <button
                            className="assortment__button"
                            onClick={handleOpenFindModal}
                        >
                            Вывод данных
                        </button>
                    </div>
                </div>
                {showCreateModal && (
                    <CreateProductModal
                        handleOpenModal={handleOpenCreateModal}
                        handleCloseModal={handleCloseCreateModal}
                    />
                )}
                {showFindModal && (
                    <FindProductsModal
                        handleOpenModal={handleOpenFindModal}
                        handleCloseModal={handleCloseFindModal}
                    />
                )}
                {data ? (
                    data
                        .sort((a, b) => b.rating - a.rating)
                        .slice(0, itemsLen)
                        .map((product) => {
                            return (
                                <AssortmentCard
                                    handleOpenModal={handleOpenUpdateModal}
                                    key={product.id}
                                    product={product}
                                />
                            );
                        })
                ) : (
                    <Loader />
                )}
                {showUpdateModal && (
                    <UpdateProductModal
                        handleOpenModal={handleOpenUpdateModal}
                        handleCloseModal={handleCloseUpdateModal}
                    />
                )}

                <div className="assortment__show">
                    <button
                        onClick={increaseItemsLen}
                        className="assortment__show-more"
                    >
                        Показать больше товаров...
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Assortment;
