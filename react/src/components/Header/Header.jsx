import axios from "axios";
import { useEffect, useState } from "react";
import "./Header.scss";

import account from "../../images/account.svg";
import cart from "../../images/cart.svg";
import logo from "../../images/logo.svg";
import search from "../../images/search.svg";

const Header = () => {
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
        <header className="header">
            <div className="header__container container">
                <a href="/" className="header__left-side">
                    <img src={logo} alt="" className="header__logo" />
                    <span className="header__site-name">fitbar</span>
                </a>
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
                    <a href="" className="header__button">
                        <img
                            src={account}
                            alt=""
                            className="header__button-image"
                        />
                        <p href="" className="header__button-text text-grey">
                            Аккаунт
                        </p>
                    </a>
                    <a href="" className="header__button">
                        <div className="header__button-images">
                            <img
                                src={cart}
                                alt=""
                                className="header__button-image"
                            />
                            <span className="header__button-counter">0</span>
                        </div>
                        <p href="" className="header__button-text text-grey">
                            Корзина
                        </p>
                    </a>
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
                            <a
                                href={category.slug}
                                className="header__navbar-element"
                                key={category.slug}
                            >
                                {category.name}
                            </a>
                        ))
                    ) : (
                        <p>Загрузка...</p>
                    )}
                </div>
            </nav>
        </header>
    );
};

export default Header;
