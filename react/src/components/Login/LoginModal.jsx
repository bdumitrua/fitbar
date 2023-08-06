import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    loginAsync,
    logout,
    saveToken,
    setLoggedIn,
} from "../../redux/slices/auth.slice";
import RegistrationModal from "../Registration/RegistrationModal";
import "./LoginModal.scss";

const LoginModal = ({ closeLoginModal }) => {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.auth.user);
    const loading = useSelector((state) => state.auth.loading);
    const error = useSelector((state) => state.auth.error);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showRegistration, setShowRegistration] = useState(false); // Состояние для отображения/скрытия окна регистрации

    useEffect(() => {
        // Когда пользователь успешно авторизуется (user не равен null), закрываем модалку
        if (user) {
            closeLoginModal();
        }
    }, [user, closeLoginModal]);

    const handleLogin = async (e) => {
        e.preventDefault(); // Предотвращаем перезагрузку страницы
        try {
            const token = await dispatch(loginAsync({ email, password }));
            dispatch(saveToken(token));
            dispatch(setLoggedIn(true)); // Устанавливаем состояние loggedIn в true при успешной авторизации
        } catch (error) {
            console.error("Ошибка при входе", error);
        }
    };

    const handleLogout = () => {
        dispatch(logout());
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
