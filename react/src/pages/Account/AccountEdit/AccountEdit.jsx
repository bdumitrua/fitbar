import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Controller, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Loader from "../../../components/Loader/Loader";
import axiosInstance from "../../../utils/axios/instance";
import "../Account.scss";
import AccountLayout from "../AccountLayout";
import "../AccountMain/AccountMain.scss";
import "./AccountEdit.scss";

const AccountEdit = () => {
    const navigate = useNavigate();
    const access = localStorage.getItem("access_token");

    useEffect(() => {
        if (!access || access === undefined) {
            navigate("/home");
        }
    }, [access, navigate]);

    const [selectedDate, setSelectedDate] = useState(null);

    const [data, setData] = useState(null);

    const dispatch = useDispatch();

    const [dataFirstname, setDataFirstname] = useState("");
    const [dataSurname, setDataSurname] = useState("");
    const [dataPatronymic, setDataPatronymic] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axiosInstance.get("/users/me");
                setData(response.data);
                const [surname, firstname, patronymic] =
                    response.data.name.split(" ");
                setDataSurname(surname || "");
                setDataFirstname(firstname || "");
                setDataPatronymic(patronymic || "");
            } catch (error) {
                console.error("Произошла ошибка при выполнении запроса", error);
            }
        };

        fetchData();
    }, [dispatch]);

    const onSubmit = (data) => {
        const { firstname, surname, patronymic, ...otherData } = data;
        const name = `${surname} ${firstname} ${patronymic}`;

        const requestData = {
            ...otherData,
            name,
        };

        // Запутался с адресами
        // По идее надо axiosInstance.put(`/address/update/${address.id}`)
        // Но как доставать нужный айди адресса если у пользователя их может быть нескольko хз ибо непонятно какой из них менять
        axiosInstance.put("/users/update", requestData);
    };

    const { handleSubmit, control, setValue } = useForm({
        defaultValues: {
            firstname: dataFirstname,
            surname: dataSurname,
            patronymic: dataPatronymic,
            photo: data ? data.image : "",
            phone: data ? data.phone : "",
            email: data ? data.email : "",
            address: data ? data.address : "",
        },
    });

    useEffect(() => {
        setValue("firstname", dataFirstname);
        setValue("surname", dataSurname);
        setValue("patronymic", dataPatronymic);
        setValue("phone", data ? data.phone : "");
        setValue("email", data ? data.email : "");
        setValue("photo", data ? data.photo : "");
        setValue("address", data ? data.address : "");
        // Установите начальные значения для других полей
    }, [data]);

    return (
        <div className="account container">
            {data ? (
                <>
                    <AccountLayout />
                    <div className="account-container">
                        <p className="account__page-title">Личный кабинет</p>
                        <form
                            onSubmit={handleSubmit(onSubmit)}
                            className="account-info"
                        >
                            <div className="account-info__image-container">
                                <Controller
                                    name="photo"
                                    control={control}
                                    render={({ field, onChange }) => (
                                        <input
                                            {...field}
                                            type="file"
                                            className="account-info__image-input"
                                            placeholder="Аватар"
                                            id="photo"
                                            onChange={(event) => {
                                                onChange(event.target.files[0]);
                                            }}
                                        />
                                    )}
                                />
                                <img
                                    src=""
                                    alt=""
                                    className="account-info__image"
                                />
                            </div>
                            <div className="account-info__private-info">
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
                            </div>
                        </form>
                    </div>
                </>
            ) : (
                <Loader />
            )}
        </div>
    );
};

export default AccountEdit;
