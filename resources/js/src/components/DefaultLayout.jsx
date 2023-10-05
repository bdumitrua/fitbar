import { useEffect, useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import "./DefaultLayout.scss";
import "./DefaultLayoutMobile.scss";

import burger from "@/assets/images/burger.svg";
import exit from "@/assets/images/exit.svg";
import logo from "@/assets/images/logo.svg";
import search from "@/assets/images/search.svg";
import axiosInstance from "@/utils/axios/instance";
import useScrollToTop from "@/utils/hooks/useScrollToTop";
import HeaderButtons from "./HeaderButtons";
import HeaderButtonsMobile from "./HeaderButtonsMobile";
import Loader from "./Loader/Loader";

const DefaultLayout = () => {
    const [data, setData] = useState(null);
    const [showNav, setShowNav] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axiosInstance.get("/category");
                setData(response.data);
            } catch (error) {
                console.error("Произошла ошибка при выполнении запроса", error);
            }
        };

        fetchData();
    }, []);

    useScrollToTop();

    return (
        <>
            <header className="header">
                <div className="header__container container">
                    <Link to="/home" className="header__left-side">
                        <img src={logo} alt="" className="header__logo" />
                        <span className="header__site-name">fitbar</span>
                    </Link>
                    <div className="header__search">
                        <input
                            type="search"
                            className="header__search-input"
                            placeholder="Поиск..."
                        />
                        <button className="header__search-button">
                            <img
                                src={search}
                                alt=""
                                className="header__search-image"
                            />
                        </button>
                    </div>
                    <HeaderButtons />
                </div>
                <nav className="header__navbar">
                    <div className="header__navbar-container container">
                        {data ? (
                            data.map((category) => (
                                <Link
                                    to={`category/${category.slug}`}
                                    className={`header__navbar-element ${
                                        `/category/${category.slug}` ===
                                        location.pathname
                                            ? "active"
                                            : ""
                                    }`}
                                    key={category.slug}
                                >
                                    {category.name}
                                </Link>
                            ))
                        ) : (
                            <Loader />
                        )}
                    </div>
                </nav>
            </header>

            {/* MOBILE HEADER */}

            <header className="header-mobile">
                <div className="header__container">
                    <div className="header-mobile__navbar">
                        <button onClick={() => setShowNav(() => true)}>
                            <img
                                src={burger}
                                alt=""
                                className="header-mobile__button-image"
                            />
                        </button>
                        <div
                            className={`header-mobile__navbar-container ${
                                showNav ? "active" : ""
                            }`}
                        ></div>
                        <div
                            className={`header-mobile__navbar-elements ${
                                showNav ? "active" : ""
                            }`}
                        >
                            <div className="header-mobile__navbar-buttons">
                                <Link
                                    to="/home"
                                    className="header-mobile__navbar-home"
                                >
                                    <img
                                        src={logo}
                                        alt=""
                                        className="header__logo"
                                    />
                                </Link>
                                <button onClick={() => setShowNav(() => false)}>
                                    <img
                                        src={exit}
                                        alt="exit"
                                        className="header-mobile__navbar-exit"
                                    />
                                </button>
                            </div>

                            {data ? (
                                data.map((category) => (
                                    <Link
                                        to={`category/${category.slug}`}
                                        className="header-mobile__navbar-element"
                                        key={category.slug}
                                    >
                                        {category.name}
                                    </Link>
                                ))
                            ) : (
                                <Loader />
                            )}
                        </div>
                        <div className="header-mobile__search">
                            {/* <input
                                type="search"
                                className="header-mobile__search-input"
                                placeholder="Поиск..."
                            /> */}
                            <button className="header-mobile__search-button">
                                <img
                                    src={search}
                                    alt=""
                                    className="header-mobile__button-image"
                                />
                            </button>
                        </div>
                    </div>

                    <Link to="/home" className="header-mobile__mid">
                        <span className="header-mobile__site-name">fitbar</span>
                    </Link>
                    <HeaderButtonsMobile />
                </div>
            </header>
            <div className="content">
                <Outlet />
            </div>
            <div className="footer-bar">fitbar</div>

            <footer className="footer container">
                <div className="footer__category">
                    <span className="footer__category-title">
                        Помощь и информация
                    </span>
                    <div className="footer__category-elements">
                        <a href="" className="footer__category-element">
                            Связь с нами
                        </a>
                        <a href="" className="footer__category-element">
                            Центр поддержки
                        </a>
                        <a href="" className="footer__category-element">
                            Доставка
                        </a>
                        <a href="" className="footer__category-element">
                            Политика возврата
                        </a>
                        <a href="" className="footer__category-element">
                            Отслеживание заказа
                        </a>
                    </div>
                </div>

                <div className="footer__category footer__category-products">
                    <span className="footer__category-title">Продукты</span>
                    <a href="" className="footer__category-element">
                        Питание
                    </a>
                    <a href="" className="footer__category-element">
                        Спортивная одежда
                    </a>
                    <a href="" className="footer__category-element">
                        Еда
                    </a>
                    <a href="" className="footer__category-element">
                        Линейки продуктов
                    </a>
                </div>

                <div className="footer__category">
                    <span className="footer__category-title">
                        Информация о компании
                    </span>
                    <div className="footer__category-elements">
                        <a href="" className="footer__category-element">
                            О нас
                        </a>
                        <a href="" className="footer__category-element">
                            Ваше мнение о нас
                        </a>
                        <a href="" className="footer__category-element">
                            Партнеры
                        </a>
                        <a href="" className="footer__category-element">
                            Политика компании
                        </a>
                    </div>
                </div>

                <div className="footer__category">
                    <span className="footer__category-title">Акции</span>
                    <div className="footer__category-elements">
                        <a href="" className="footer__category-element">
                            Реферальная система
                        </a>
                        <a href="" className="footer__category-element">
                            Скидки
                        </a>
                    </div>
                </div>
            </footer>
        </>
    );
};

export default DefaultLayout;
