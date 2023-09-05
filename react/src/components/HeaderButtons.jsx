import { useState } from "react";
import { Link } from "react-router-dom";
import "./DefaultLayout.scss";

import { useSelector } from "react-redux";
import account from "../assets/images/account.svg";
import cart from "../assets/images/cart.svg";
import Modals from "../pages/Modals/Modals";
import { useCartContext } from "../utils/providers/cart.provider";

const HeaderButtons = () => {
    const [showModal, setShowModal] = useState(false);

    const { cartItems } = useCartContext();

    const cartLength = cartItems ? cartItems.length : 0;

    const isLoggedIn = useSelector((state) => state.auth.loggedIn);

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
        <div className="header__right-side">
            {user && user !== undefined && isLoggedIn ? (
                // Если пользователь авторизован, показываем кнопку для перехода в личный кабинет
                <Link to="/user/account" className="header__button">
                    <img
                        src={account}
                        alt=""
                        className="header__button-image"
                    />
                    <p href="" className="header__button-text text-grey">
                        Аккаунт
                    </p>
                </Link>
            ) : (
                // Если пользователь не авторизован, показываем кнопку для открытия модального окна авторизации
                <button onClick={handleLoginClick} className="header__button">
                    <img
                        src={account}
                        alt=""
                        className="header__button-image"
                    />
                    <p className="header__button-text text-grey">Войти</p>
                </button>
            )}

            {showModal && (
                <Modals
                    handleOpenModal={handleOpenModal}
                    handleCloseModal={handleCloseModal}
                />
            )}

            <Link to="/cart" className="header__button">
                <div className="header__button-images">
                    <img src={cart} alt="" className="header__button-image" />
                    <span className="header__button-counter">{cartLength}</span>
                </div>
                <p href="" className="header__button-text text-grey">
                    Корзина
                </p>
            </Link>
        </div>
    );
};

export default HeaderButtons;
