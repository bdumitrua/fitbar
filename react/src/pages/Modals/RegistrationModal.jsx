import { Controller, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { loginAsync } from "../../redux/slices/auth.slice";
import { registerAsync } from "../../redux/slices/register.slice";
import "./Modals.scss";

const RegistrationModal = ({ closeModal, toggleModal }) => {
    const {
        control,
        handleSubmit,
        setError,
        formState: { errors },
    } = useForm();

    const dispatch = useDispatch();

    const handleRegistration = async (data) => {
        if (data.password !== data.repeatPassword) {
            setError("repeatPassword", {
                type: "manual",
                message: "Пароли не совпадают!",
            });
            return;
        }

        const response = await dispatch(registerAsync(data));
        if (response.error) {
            console.log(response);
            console.log("Error!");
        } else {
            console.log("Успешно зарегистрирован:", response);

            dispatch(
                loginAsync({ email: data.email, password: data.password })
            );

            closeModal();
        }
    };

    return (
        <div className="modal__content registration">
            <p className="modal__title">Регистрация</p>
            <form
                className="modal__form"
                onSubmit={handleSubmit(handleRegistration)}
            >
                <label className="modal__input-label" htmlFor="name">
                    Имя
                </label>
                <Controller
                    className="modal__input"
                    name="name"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                        <input
                            className="modal__input"
                            id="name"
                            type="text"
                            {...field}
                            placeholder=""
                            required
                        />
                    )}
                />
                {errors.name && (
                    <p className="modal__error">Это поле обязательно</p>
                )}
                <label className="modal__input-label" htmlFor="name">
                    Адрес электронной почты
                </label>
                <Controller
                    className="modal__input"
                    name="email"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                        <input
                            className="modal__input"
                            id="email"
                            type="email"
                            {...field}
                            placeholder=""
                            required
                        />
                    )}
                />
                {errors.email && (
                    <p className="modal__error">Это поле обязательно</p>
                )}
                <label className="modal__input-label" htmlFor="tel">
                    Номер телефона
                </label>
                <Controller
                    name="tel"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                        <input
                            id="tel"
                            className="modal__input"
                            type="tel"
                            {...field}
                            placeholder=""
                            required
                        />
                    )}
                />
                {errors.tel && (
                    <p className="modal__error">Это поле обязательно</p>
                )}
                <label className="modal__input-label" htmlFor="password">
                    Пароль
                </label>
                <Controller
                    name="password"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                        <input
                            id="password"
                            type="password"
                            {...field}
                            placeholder=""
                            className="modal__input"
                            required
                        />
                    )}
                />
                {errors.password && (
                    <p className="modal__error">Это поле обязательно</p>
                )}
                <label className="modal__input-label" htmlFor="repeatPassword">
                    Повторите пароль
                </label>
                <Controller
                    name="repeatPassword"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                        <input
                            id="repeatPassword"
                            className="modal__input"
                            type="password"
                            placeholder=""
                            {...field}
                        />
                    )}
                />
                {errors.repeatPassword && (
                    <p className="modal__error">
                        {errors.repeatPassword.message}
                    </p>
                )}

                <button className="modal__button button__green" type="submit">
                    Зарегистрироваться
                </button>

                <div className="modal__buttons">
                    Уже есть аккаунт?
                    <button
                        className="modal__switch-button"
                        onClick={toggleModal}
                    >
                        Войти
                    </button>
                </div>
            </form>
        </div>
    );
};

export default RegistrationModal;
