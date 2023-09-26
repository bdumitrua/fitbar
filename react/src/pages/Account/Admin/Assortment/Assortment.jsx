import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Loader from "../../../../components/Loader/Loader";
import { fetchProducts } from "../../../../redux/services/products.service";
import CreateProductModal from "../../../Modals/AdminModals/CreateProductModal";
import FindProductsModal from "../../../Modals/AdminModals/FindProductsModal";
import UpdateProductModal from "../../../Modals/AdminModals/UpdateProductModal";
import AccountLayoutAdmin from "../AccountLayoutAdmin";
import "./Assortment.scss";
import AssortmentCard from "./AssortmentCard";

const Assortment = () => {
    const navigate = useNavigate();
    const access = localStorage.getItem("access_token");

    useEffect(() => {
        if (!access || access === undefined) {
            navigate("/home");
        }
    }, [access, navigate]);

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

    const dispatch = useDispatch();
    const products = useSelector((state) => state.products.data);
    const loading = useSelector((state) => state.products.loading);
    const error = useSelector((state) => state.products.error);

    useEffect(() => {
        // Загрузите продукты, если они еще не загружены
        if (!products.length && !loading && !error) {
            dispatch(fetchProducts());
        }
    }, [dispatch, products, loading, error]);

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
                {products ? (
                    [...products]
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
