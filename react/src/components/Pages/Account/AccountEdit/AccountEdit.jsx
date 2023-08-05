import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Controller, useForm } from "react-hook-form";
import "../Account.scss";
import AccountLayout from "../AccountAside";
import "../AccountMain/AccountMain.scss";
import "./AccountEdit.scss";

const AccountEdit = () => {
    const { handleSubmit, control } = useForm();
    const [selectedDate, setSelectedDate] = useState(null);

    const onSubmit = (data) => {
        // You can handle form submission here
        console.log(data);
    };

    return (
        <div className="account container">
            <AccountLayout />
            <div className="account-container">
                <p className="account__page-title">Личный кабинет</p>
                <div className="account-info">
                    <img src="" alt="" className="account-info__image" />
                    <form
                        className="account-info__private-info"
                        onSubmit={handleSubmit(onSubmit)}
                    >
                        <Controller
                            name="name"
                            control={control}
                            render={({ field }) => (
                                <input
                                    {...field}
                                    type="text"
                                    className="account-info__private-info-element"
                                    placeholder="Имя"
                                />
                            )}
                        />
                        <div className="account-info__private-info-element">
                            <Controller
                                name="birthdate"
                                control={control}
                                render={({ field }) => (
                                    <DatePicker
                                        {...field}
                                        dateFormat="dd MM yyyy"
                                        placeholderText="Выберите дату"
                                        selected={selectedDate}
                                        onChange={(date) =>
                                            setSelectedDate(date)
                                        }
                                        showYearDropdown
                                        scrollableYearDropdown
                                        yearDropdownItemNumber={100}
                                        required
                                    />
                                )}
                            />
                        </div>
                        <Controller
                            name="surname"
                            control={control}
                            render={({ field }) => (
                                <input
                                    {...field}
                                    type="text"
                                    className="account-info__private-info-element"
                                    placeholder="Фамилия"
                                />
                            )}
                        />
                        <Controller
                            name="phone"
                            control={control}
                            render={({ field }) => (
                                <input
                                    {...field}
                                    type="tel"
                                    id="phone"
                                    className="account-info__private-info-element"
                                    placeholder="Номер телефона"
                                    maxLength="18"
                                />
                            )}
                        />
                        <Controller
                            name="patronymic"
                            control={control}
                            render={({ field }) => (
                                <input
                                    {...field}
                                    type="text"
                                    className="account-info__private-info-element"
                                    placeholder="Отчество"
                                />
                            )}
                        />
                        <Controller
                            name="email"
                            control={control}
                            render={({ field }) => (
                                <input
                                    {...field}
                                    type="email"
                                    className="account-info__private-info-element"
                                    placeholder="Электронная почта"
                                />
                            )}
                        />
                        <Controller
                            name="address"
                            control={control}
                            render={({ field }) => (
                                <input
                                    {...field}
                                    type="text"
                                    className="account-info__private-info-element private-info-element-long"
                                    placeholder="Адрес"
                                />
                            )}
                        />
                        <Controller
                            name="password"
                            control={control}
                            render={({ field }) => (
                                <input
                                    {...field}
                                    type="password"
                                    className="account-info__private-info-element"
                                    placeholder="Пароль"
                                />
                            )}
                        />
                        <Controller
                            name="confirmPassword"
                            control={control}
                            render={({ field }) => (
                                <input
                                    {...field}
                                    type="password"
                                    className="account-info__private-info-element"
                                    placeholder="Подтверждение пароля"
                                />
                            )}
                        />
                        <div className="account-info__update-info">
                            <button
                                className="account-info__update-info-button"
                                type="submit"
                            >
                                Применить
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AccountEdit;
