import { useState } from "react";
import axiosInstance from "../../axios/instance";
import "./Modals.scss";

const RegistrationModal = ({ closeModal, toggleModal }) => {
    const [name, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [telNumber, setTelNumber] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // Отправляем данные на сервер для проверки и получения токена.
            const response = await axiosInstance.post("auth/register", {
                name,
                email,
                password,
            });

            // Сохраняем токен доступа в localStorage или cookies.
            localStorage.setItem("accessToken", response.data.accessToken);

            closeModal();
        } catch (error) {
            console.error("Ошибка", error);
        }
    };

    return (
        <div className="modal__content registration">
            <p className="modal__title">Регистрация</p>
            <form className="modal__form" onSubmit={handleSubmit}>
                <label className="modal__input-label" htmlFor="email">
                    Имя
                </label>
                <input
                    id="name"
                    className="modal__input"
                    type="text"
                    value={name}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder=""
                />
                <label className="modal__input-label" htmlFor="password">
                    Адрес электронной почты
                </label>
                <input
                    id="email"
                    className="modal__input"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder=""
                />
                <label className="modal__input-label" htmlFor="password">
                    Номер телефона
                </label>
                <input
                    className="modal__input"
                    type="tel"
                    value={telNumber}
                    onChange={(e) => setTelNumber(e.target.value)}
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
                    className="modal__input mb-30px"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder=""
                />
                <div className="modal__buttons">
                    <button className="modal__button" type="submit">
                        Регистрация
                    </button>
                    <button className="modal__button" onClick={toggleModal}>
                        Авторизация
                    </button>
                </div>
            </form>
        </div>
    );
};

export default RegistrationModal;
