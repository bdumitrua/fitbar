import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Controller, useForm } from "react-hook-form";
import axiosInstance from "../../../utils/axios/instance";
import "../Account.scss";
import AccountLayout from "../AccountAside";
import "../AccountMain/AccountMain.scss";
import "./AccountEdit.scss";

const AccountEdit = () => {
    const { handleSubmit, control } = useForm();
    const [selectedDate, setSelectedDate] = useState(null);

    const onSubmit = (data) => {
        const { firstname, surname, patronymic, ...otherData } = data;
        const name = `${surname} ${firstname} ${patronymic}`;

        // Добавьте `fullName` в отправляемые данные
        const requestData = {
            ...otherData,
            name,
        };

        // Отправьте данные на сервер
        // Запутался с адресами
        // По идее надо axiosInstance.put(`/address/update/${address.id}`)
        // Но как доставать нужный айди адресса если у пользователя их может быть несколь хз ибо непонятно какой из них менять
        axiosInstance.put("/users/update", requestData);
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
                            name="firstname"
                            control={control}
                            render={({ field }) => (
                                <input
                                    {...field}
                                    type="text"
                                    className="account-info__private-info-element"
                                    placeholder="Имя"
                                    id="firstname"
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
                                        dateFormat="dd.MM.yyyy"
                                        placeholderText="Выберите дату"
                                        selected={selectedDate}
                                        onChange={(date) =>
                                            setSelectedDate(date)
                                        }
                                        showYearDropdown
                                        scrollableYearDropdown
                                        yearDropdownItemNumber={100}
                                    />
                                )}
                                valueName="selected"
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
                                    id="surname"
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
                                    maxLength="11"
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
                                    id="patronymic"
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
                                    id="email"
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
                                    id="address"
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
                                    id="password"
                                    required
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
                                    id="confirmPassword"
                                    required
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
