import { useState } from "react";
import { Link } from "react-router-dom";
import "./DefaultLayoutMobile.scss";

import account from "@/assets/images/account.svg";
import cart from "@/assets/images/cart.svg";
import Modals from "@/pages/Modals/Modals";
import { useCartContext } from "@/utils/providers/cart.provider";

const HeaderButtonsMobile = () => {
    const [showModal, setShowModal] = useState(false);

    const { cartItems } = useCartContext();

    const cartLength = cartItems ? cartItems.length : 0;

    const user = localStorage.getItem("access_token");

    const handleOpenModal = () => {
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    // Функция для открытия модального окна авторизации
    const handleLoginClick = () => {
        setShowModal(true);
    };

    return (
        <div className="header-mobile__right-side">
            {user && user !== undefined ? (
                // Если пользователь авторизован, показываем кнопку для перехода в личный кабинет
                <Link to="/user/account" className="header-mobile__button">
                    <img
                        src={account}
                        alt=""
                        className="header-mobile__button-image"
                    />
                </Link>
            ) : (
                // Если пользователь не авторизован, показываем кнопку для открытия модального окна авторизации
                <button
                    onClick={handleLoginClick}
                    className="header-mobile__button"
                >
                    <img
                        src={account}
                        alt=""
                        className="header-mobile__button-image"
                    />
                </button>
            )}

            {showModal && (
                <Modals
                    handleOpenModal={handleOpenModal}
                    handleCloseModal={handleCloseModal}
                />
            )}

            <Link to="/cart" className="header-mobile__button">
                <img
                    src={cart}
                    alt=""
                    className="header-mobile__button-image"
                />
                <span className="header-mobile__button-counter">
                    {cartLength}
                </span>
            </Link>
        </div>
    );
};

export default HeaderButtonsMobile;
