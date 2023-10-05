import UpdateProductModal from "@/pages/Modals/AdminModals/UpdateProductModal";
import { useMainContext } from "@/utils/providers/main.provider";
import { useState } from "react";
import { Link } from "react-router-dom";
import "./AssortmentCard.scss";

const AssortmentCard = ({ product }) => {
    const { formatDate } = useMainContext();

    const [showUpdateModal, setShowUpdateModal] = useState(false);

    const handleOpenUpdateModal = () => {
        setShowUpdateModal(true);
    };

    const handleCloseUpdateModal = () => {
        setShowUpdateModal(false);
    };

    return (
        <div className="assortment-card">
            <Link to={`/products/${product.id}`}>
                <img
                    src={product.image}
                    alt=""
                    className="assortment-card__image"
                />
            </Link>
            <div className="assortment-card__main-info">
                <div className="assortment-cart__main-info-header">
                    <Link
                        to={`/products/${product.id}`}
                        className="assortment-card__title"
                    >
                        <p>{product.name}</p>
                    </Link>
                    <p className="assortment-card__price">{`${product.price} руб.`}</p>
                </div>
                <div className="assortment-card__about-assortment">
                    <p className="assortment-card__info">Вкус:</p>
                    <p className="assortment-card__info">{product.taste}</p>
                    <p className="assortment-card__info">{`Добавлено ${formatDate(
                        product.created_at
                    )}`}</p>
                    <p className="assortment-card__info">Объём:</p>
                    <p className="assortment-card__info">{product.weight}</p>
                    <p className="assortment-card__info">{`Артикул`}</p>
                </div>
            </div>
            <div className="assortment-card__buttons">
                <button
                    className="assortment-card__button"
                    onClick={handleOpenUpdateModal}
                >
                    Изменить
                </button>
                {showUpdateModal && (
                    <UpdateProductModal
                        product={product}
                        handleOpenModal={handleOpenUpdateModal}
                        handleCloseModal={handleCloseUpdateModal}
                    />
                )}
                <button className="assortment-card__button">Удалить</button>
            </div>
        </div>
    );
};

export default AssortmentCard;
