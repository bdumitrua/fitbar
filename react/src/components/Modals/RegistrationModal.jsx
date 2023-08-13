import { useState } from "react";
import { useDispatch } from "react-redux";
import { loginAsync } from "../../redux/slices/auth.slice";
import { registerAsync } from "../../redux/slices/register.slice";
import "./Modals.scss";

const RegistrationModal = ({ closeModal, toggleModal }) => {
    const [name, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [repeatPassword, setRepeatPassword] = useState("");
    const [email, setEmail] = useState("");
    const [telNumber, setTelNumber] = useState("");

    const dispatch = useDispatch();

    //TODO
    //Пофиксить вход после регистрации(обновление состояния кнопки войти и данные в инпутах в профиле)
    const handleRegistration = async (e) => {
        e.preventDefault();
        try {
            const user = await dispatch(
                registerAsync({ name, email, password })
            );

            // Вместо возвращения пользователя, вы можете использовать user из ответа
            console.log("Успешно зарегистрирован:", user);

            // Здесь вы можете выполнить какие-то действия после успешной регистрации
            // Например, автоматическая авторизация и переход на другую страницу
            dispatch(loginAsync({ email, password })); // Пример автоматической авторизации

            // Закрываем модальное окно
            closeModal();
        } catch (error) {
            console.error("Ошибка при регистрации", error);
        }
    };

    return (
        <div className="modal__content registration">
            <p className="modal__title">Регистрация</p>
            <form className="modal__form" onSubmit={handleRegistration}>
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
                    required
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
                    required
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
                    required
                />
                <label className="modal__input-label" htmlFor="password">
                    Подтвердите пароль
                </label>
                <input
                    className="modal__input mb-30px"
                    type="password"
                    value={repeatPassword}
                    onChange={(e) => setRepeatPassword(e.target.value)}
                    placeholder=""
                    required
                />
                <div className="modal__buttons">
                    <button
                        className="modal__button button__green"
                        type="submit"
                    >
                        Зарегистрироваться
                    </button>
                    <button
                        className="modal__button button__black"
                        onClick={toggleModal}
                    >
                        Авторизация
                    </button>
                </div>
            </form>
        </div>
    );
};

export default RegistrationModal;
