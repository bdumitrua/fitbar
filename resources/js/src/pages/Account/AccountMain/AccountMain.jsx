import Loader from "@/components/Loader/Loader";
import axiosInstance from "@/utils/axios/instance";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import "../Account.scss";
import AccountLayoutAdmin from "../Admin/AccountLayoutAdmin";
import "./AccountMain.scss";

const AccountMain = () => {
    const navigate = useNavigate();
    const access = localStorage.getItem("access_token");

    useEffect(() => {
        if (!access || access === undefined) {
            navigate("/home");
        }
    }, [access, navigate]);

    const [data, setData] = useState({});
    const dispatch = useDispatch();

    const [firstname, setFirstname] = useState("");
    const [surname, setSurname] = useState("");
    const [patronymic, setPatronymic] = useState("");
    const [birthdate, setBirthdate] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axiosInstance.get("/users/me");
                setData(response.data);
                const [surname, firstname, patronymic] =
                    response.data.name.split(" ");
                const birthdate = response.data.date_of_birth.split(" ");
                setBirthdate(birthdate || "");
                setSurname(surname || "");
                setFirstname(firstname || "");
                setPatronymic(patronymic || "");
            } catch (error) {
                console.error("Произошла ошибка при выполнении запроса", error);
            }
        };

        fetchData();
    }, [dispatch]);

    return (
        <div className="account container">
            {data ? (
                <>
                    <AccountLayoutAdmin />
                    <div className="account-container">
                        <p className="account__page-title">Личный кабинет</p>
                        <div className="account-info">
                            <img
                                src={data.photo}
                                alt=""
                                className="account-info__image"
                            />
                            <div className="account-info__private-info">
                                <input
                                    type="text"
                                    className="account-info__private-info-element"
                                    placeholder="Имя"
                                    disabled
                                    value={firstname}
                                />
                                <input
                                    type="date"
                                    className="account-info__private-info-element"
                                    placeholder="Дата рождения"
                                    disabled
                                    value={birthdate[0] || ""}
                                />
                                <input
                                    type="text"
                                    className="account-info__private-info-element"
                                    placeholder="Фамилия"
                                    disabled
                                    value={surname}
                                />
                                <input
                                    type="tel"
                                    className="account-info__private-info-element"
                                    placeholder="Номер телефона"
                                    value={data.phone || ""}
                                    disabled
                                />
                                <input
                                    type="text"
                                    className="account-info__private-info-element"
                                    placeholder="Отчество"
                                    disabled
                                    value={patronymic}
                                />
                                <input
                                    type="email"
                                    className="account-info__private-info-element"
                                    placeholder="Электронная почта"
                                    disabled
                                    value={data.email}
                                />
                                <input
                                    type="text"
                                    className="account-info__private-info-element private-info-element-long"
                                    placeholder="Адрес"
                                    disabled
                                />
                            </div>
                        </div>
                    </div>
                </>
            ) : (
                <Loader />
            )}
        </div>
    );
};

export default AccountMain;
