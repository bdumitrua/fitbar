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
    const [file, setFile] = useState(null);

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

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        setFile(selectedFile);
    };

    const onSubmit = (data) => {
        const { firstname, surname, patronymic, ...otherData } = data;
        const name = `${surname} ${firstname} ${patronymic}`;

        console.log(data);

        const formData = new FormData();
        formData.append("photo", file); // Здесь добавляем изображение
        formData.append("email", otherData.email);
        formData.append("name", name);
        formData.append("phone", otherData.phone);
        formData.append("date_of_birth", selectedDate);

        formData.append("_method", "put");

        axiosInstance.post("/users/update", formData);
    };

    const { handleSubmit, control, setValue } = useForm({
        defaultValues: {
            firstname: dataFirstname,
            surname: dataSurname,
            patronymic: dataPatronymic,
            //birth: data.date_of_birth,
            photo: data ? data.photo : "",
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
                                <input
                                    id="photo"
                                    className="account-info__image-input"
                                    type="file"
                                    onChange={handleFileChange}
                                    accept="image/png, image/jpg, image/jpeg, image/svg"
                                />
                                <img
                                    src={
                                        file
                                            ? URL.createObjectURL(file)
                                            : data.photo
                                    }
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

                                <Controller
                                    name="date_of_birth"
                                    control={control}
                                    render={({ field }) => (
                                        <div className="account-info__private-info-element">
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
                                        </div>
                                    )}
                                    valueName="selected"
                                />

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
