import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axiosInstance from "../../axios/instance";
import {
    loginAsync,
    logout,
    refreshAccessToken,
    resetRememberMe,
    saveToken,
    setLoggedIn,
    setRememberMe,
} from "../../redux/slices/auth.slice";
import RegistrationModal from "../Registration/RegistrationModal";
import "./LoginModal.scss";

const LoginModal = ({ closeLoginModal, onSuccess }) => {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.auth.user);
    const loading = useSelector((state) => state.auth.loading);
    const error = useSelector((state) => state.auth.error);
    const refreshToken = useSelector((state) => state.auth.refreshToken);
    const rememberMe = useSelector((state) => state.auth.rememberMe);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showRegistration, setShowRegistration] = useState(false); // Состояние для отображения/скрытия окна регистрации

    useEffect(() => {
        // Когда пользователь успешно авторизуется (user не равен null), закрываем модалку
        if (user) {
            console.log(user);
            closeLoginModal();
        }
    }, [user, closeLoginModal]);

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

            // Закрываем модальное окно
            closeLoginModal();

            // Вызываем функцию onSuccess, если она предоставлена
            if (typeof onSuccess === "function") {
                onSuccess(token);
            }
        } catch (error) {
            console.error("Ошибка при входе", error);
        }
    };

    const handleLogout = () => {
        dispatch(logout());
    };

    const handleRememberMeChange = () => {
        if (rememberMe) {
            dispatch(resetRememberMe());
        } else {
            dispatch(setRememberMe());
        }
    };

    const handleOpenRegistration = () => {
        setShowRegistration(true);
        closeLoginModal();
    };

    const handleCloseRegistration = () => {
        setShowRegistration(false);
    };

    return (
        <div className="modal">
            <div className="modal__content">
                <p className="modal__title">Авторизация</p>
                {!showRegistration ? (
                    // Показываем форму входа, если showRegistration равно false
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
                        <label
                            className="modal__input-label"
                            htmlFor="password"
                        >
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
                            <button className="modal__button" type="submit">
                                {loading ? "Вход..." : "Войти"}
                            </button>
                            <button
                                className="modal__button"
                                onClick={handleOpenRegistration}
                            >
                                Регистрация
                            </button>
                        </div>
                        {error && <p>{error}</p>}
                    </form>
                ) : (
                    // Показываем форму регистрации, если showRegistration равно true
                    <RegistrationModal closeModal={handleCloseRegistration} />
                )}
            </div>
        </div>
    );
};

export default LoginModal;
