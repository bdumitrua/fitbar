import axios from "axios";
import { useState } from "react";

const RegistrationModal = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // Отправляем данные на сервер для проверки и получения токена.
            const response = await axios.post("/auth/login", {
                username,
                password,
            });

            // Сохраняем токен доступа в localStorage или cookies.
            localStorage.setItem("accessToken", response.data.accessToken);

            // Перенаправляем на защищенную страницу.
            window.location.href = "/user/account";
        } catch (error) {
            console.error("Ошибка", error);
        }
    };

    return (
        <div className="modal registration">
            <div className="modal__content">
                <p className="modal__title">Вход</p>
                <form className="modal__form" onSubmit={handleSubmit}>
                    <label className="modal__input-label" htmlFor="email">
                        ФИО
                    </label>
                    <input
                        id="email"
                        className="modal__input"
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder=""
                    />
                    <label className="modal__input-label" htmlFor="password">
                        Пароль
                    </label>
                    <input
                        id="password"
                        className="modal__input"
                        type="email"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder=""
                    />
                    <label className="modal__input-label" htmlFor="password">
                        Пароль
                    </label>
                    <input
                        id="password"
                        className="modal__input"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder=""
                    />
                    <label className="modal__input-label" htmlFor="password">
                        Подтвердите пароль
                    </label>
                    <input
                        id="password"
                        className="modal__input"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder=""
                    />
                    <label className="modal__input-label" htmlFor="password">
                        Номер телефона
                    </label>
                    <input
                        id="password"
                        className="modal__input"
                        type="tel"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder=""
                    />
                    <button className="modal__button" type="submit">
                        Регистрация
                    </button>
                    <button className="modal__button" type="submit">
                        Авторизация
                    </button>
                </form>
            </div>
        </div>
    );
};

export default RegistrationModal;
