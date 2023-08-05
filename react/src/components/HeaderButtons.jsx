import { useState } from "react";
import { Link } from "react-router-dom";
import "./DefaultLayout.scss";
import LoginModal from "./Login/LoginModal";

import { useSelector } from "react-redux";
import account from "../images/account.svg";
import cart from "../images/cart.svg";

// TODO
// Переделать логику поведения модалок

const HeaderButtons = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [showLoginModal, setShowLoginModal] = useState(false);

    const user = useSelector((state) => state.auth.user);

    const isAuthenticated = !!user;

    // Функция для открытия модального окна авторизации
    const handleLoginClick = () => {
        setShowLoginModal(true);
    };

    // Функция для закрытия модального окна авторизации
    const handleLoginModalClose = () => {
        setShowLoginModal(false);
    };

    // Функция для обработки успешной авторизации
    const handleSuccessfulLogin = () => {
        setIsLoggedIn(true);
        setShowLoginModal(false);
    };

    // Функция для выхода из аккаунта
    // const handleLogout = () => {
    //     setIsLoggedIn(false);
    // };

    // Функция для перенаправления на страницу личного кабинета

    return (
        <div className="header__right-side">
            {isAuthenticated ? (
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

            {showLoginModal && (
                <LoginModal
                    closeLoginModal={handleLoginModalClose}
                    onSuccess={handleSuccessfulLogin}
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
