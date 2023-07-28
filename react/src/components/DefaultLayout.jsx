import axios from "axios";
import { useEffect, useState } from "react";
import { Link, Outlet } from "react-router-dom";
import "./DefaultLayout.scss";
import "./Footer/Footer.scss";
import "./Header/Header.scss";

import account from "../images/account.svg";
import cart from "../images/cart.svg";
import logo from "../images/logo.svg";
import search from "../images/search.svg";

const DefaultLayout = () => {
    const [data, setData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(
                    "http://localhost:8000/api/category"
                );
                setData(response.data);
            } catch (error) {
                console.error("Произошла ошибка при выполнении запроса", error);
            }
        };

        fetchData();
    }, []);

    return (
        <>
            <header className="header">
                <div className="header__container container">
                    <Link to="/" className="header__left-side">
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
                    <div className="header__right-side">
                        <Link to="/account" className="header__button">
                            <img
                                src={account}
                                alt=""
                                className="header__button-image"
                            />
                            <p
                                href=""
                                className="header__button-text text-grey"
                            >
                                Аккаунт
                            </p>
                        </Link>
                        <Link to="/cart" className="header__button">
                            <div className="header__button-images">
                                <img
                                    src={cart}
                                    alt=""
                                    className="header__button-image"
                                />
                                <span className="header__button-counter">
                                    0
                                </span>
                            </div>
                            <p
                                href=""
                                className="header__button-text text-grey"
                            >
                                Корзина
                            </p>
                        </Link>
                    </div>
                </div>
                <nav className="header__navbar">
                    <div className="header__navbar-container container">
                        <a href="" className="header__navbar-element">
                            Питание
                        </a>
                        <a href="" className="header__navbar-element">
                            Одежда
                        </a>
                        <a href="" className="header__navbar-element">
                            Батончики и снеки
                        </a>
                        <a href="" className="header__navbar-element">
                            Углеводы
                        </a>
                        {data ? (
                            data.map((category) => (
                                <Link
                                    to={category.slug}
                                    className="header__navbar-element"
                                    key={category.slug}
                                >
                                    {category.name}
                                </Link>
                            ))
                        ) : (
                            <p>Загрузка...</p>
                        )}
                    </div>
                </nav>
            </header>
            <Outlet />
            <div className="footer-bar">fitbar</div>

            <footer className="footer container">
                <div className="footer__category">
                    <span className="footer__category-title">
                        Помощь и информация
                    </span>
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

                <div className="footer__category">
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

                <div className="footer__category">
                    <span className="footer__category-title">Акции</span>
                    <a href="" className="footer__category-element">
                        Реферальная система
                    </a>
                    <a href="" className="footer__category-element">
                        Скидки
                    </a>
                </div>
            </footer>
        </>
    );
};

export default DefaultLayout;
