import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axiosInstance from "../../axios/instance";
import {
    loginAsync,
    refreshAccessToken,
    resetRememberMe,
    saveToken,
    setLoggedIn,
    setRememberMe,
} from "../../redux/slices/auth.slice";
import "./Modals.scss";

const LoginModal = ({ closeModal, onSuccess, toggleModal }) => {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.auth.user);
    const loading = useSelector((state) => state.auth.loading);
    const error = useSelector((state) => state.auth.error);
    const refreshToken = useSelector((state) => state.auth.refreshToken);
    const rememberMe = useSelector((state) => state.auth.rememberMe);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    useEffect(() => {
        // Когда пользователь успешно авторизуется (user не равен null), закрываем модалку
        if (user) {
            console.log(user);
            closeModal();
        }
    }, [user, closeModal]);

    useEffect(() => {
        if (refreshToken) {
            dispatch(refreshAccessToken(refreshToken));
        }
    }, [dispatch, refreshToken]);

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const token = await dispatch(loginAsync({ email, password }));
            dispatch(saveToken(token));
            dispatch(setLoggedIn(true)); // Устанавливаем состояние loggedIn в true при успешной авторизации

            // Обновляем заголовок "Authorization" в axios
            axiosInstance.defaults.headers.common["Authorization"] =
                "Bearer " + token;

            // Вызываем функцию onSuccess, если она предоставлена
            if (typeof onSuccess === "function") {
                onSuccess(token);
            }
        } catch (error) {
            console.error("Ошибка при входе", error);
        }
    };

    const handleRememberMeChange = () => {
        if (rememberMe) {
            dispatch(resetRememberMe());
        } else {
            dispatch(setRememberMe());
        }
    };

    return (
        <div className="modal__content login">
            <p className="modal__title">Авторизация</p>
            <form className="modal__form" onSubmit={handleLogin}>
                <label className="modal__input-label" htmlFor="email">
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
                <div className="modal__more-features">
                    <div className="modal__remember-container">
                        <input
                            type="checkbox"
                            name=""
                            id="remember-me"
                            className="modal__remember"
                            checked={rememberMe}
                            onChange={handleRememberMeChange}
                        />
                        <label
                            className="modal__checkbox-label"
                            htmlFor="remember-me"
                        >
                            Запомнить меня
                        </label>
                    </div>
                    <button className="modal__recover-password">
                        Восстановить пароль
                    </button>
                </div>
                <div className="modal__buttons">
                    <button
                        className="modal__button button__green"
                        type="submit"
                    >
                        {loading ? "Вход..." : "Войти"}
                    </button>
                    <button
                        className="modal__button button__black"
                        onClick={toggleModal}
                    >
                        Регистрация
                    </button>
                </div>
                {error && <p>{error}</p>}
            </form>
        </div>
    );
};

export default LoginModal;
