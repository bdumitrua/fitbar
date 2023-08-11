import { useState } from "react";
import { Link } from "react-router-dom";
import "./DefaultLayout.scss";

import account from "../images/account.svg";
import cart from "../images/cart.svg";
import Modals from "./Modals/Modals";

// TODO
// Переделать логику поведения модалок

const HeaderButtons = () => {
    const [showModal, setShowModal] = useState(false);

    const user = localStorage.getItem("access_token");

    const handleOpenModal = () => {
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    // Функция для обработки успешной авторизации
    // const handleSuccessfulLogin = (token) => {
    //     // Сохраняем новый токен в localStorage
    //     localStorage.setItem("access_token", token.payload);

    //     // Обновляем заголовок "Authorization" в axios
    //     axiosInstance.defaults.headers.common["Authorization"] =
    //         "Bearer " + token.payload;
    // };

    // Функция для открытия модального окна авторизации
    const handleLoginClick = () => {
        setShowModal(true);
    };

    return (
        <div className="header__right-side">
            {user && user !== undefined ? (
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

            <Link to="/user/cart" className="header__button">
                <div className="header__button-images">
                    <img src={cart} alt="" className="header__button-image" />
                    <span className="header__button-counter">0</span>
                </div>
                <p href="" className="header__button-text text-grey">
                    Корзина
                </p>
            </Link>
        </div>
    );
};

export default HeaderButtons;
