import {
    loginAsync,
    refreshAccessToken,
    resetRememberMe,
    saveToken,
    setLoggedIn,
    setLoggedOut,
    setRememberMe,
} from "@/redux/slices/auth.slice";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./Modals.scss";

const LoginModal = ({ closeModal, toggleModal }) => {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.auth.user);
    const loading = useSelector((state) => state.auth.loading);
    const error = useSelector((state) => state.auth.error);
    const refreshToken = useSelector((state) => state.auth.refreshToken);
    const rememberMe = useSelector((state) => state.auth.rememberMe);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorText, setErrorText] = useState("");

    useEffect(() => {
        // Когда пользователь успешно авторизуется (user не равен null), закрываем модалку
        if (user) {
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

        const response = await dispatch(loginAsync({ email, password }));
        if (response.error) {
            setErrorText("Неверная почта или пароль!");
        } else {
            dispatch(saveToken(response.payload));
            dispatch(setLoggedOut(false));
            dispatch(setLoggedIn(true)); // Устанавливаем состояние loggedIn в true при успешной авторизации

            closeModal();
        }
    };

    //TODO
    //Доделать кнопку запомнить меня
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
                <button
                    className="modal__button button__green login"
                    type="submit"
                >
                    {loading ? "Вход..." : "Войти"}
                </button>
                {error && <p className="modal__error">{errorText}</p>}
                <div className="modal__buttons">
                    Нет аккаунта?
                    <button
                        className="modal__switch-button"
                        onClick={toggleModal}
                    >
                        Зарегистрироваться
                    </button>
                </div>
            </form>
        </div>
    );
};

export default LoginModal;
