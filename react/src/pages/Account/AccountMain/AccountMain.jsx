import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setUser } from "../../../redux/slices/user.slice";
import axiosInstance from "../../../utils/axios/instance";
import "../Account.scss";
import AccountLayoutAdmin from "../Admin/AccountLayoutAdmin";
import "./AccountMain.scss";

const AccountMain = () => {
    const [data, setData] = useState({});
    const dispatch = useDispatch();

    const [firstname, setFirstname] = useState("");
    const [surname, setSurname] = useState("");
    const [patronymic, setPatronymic] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axiosInstance.get("/users/me");
                setData(response.data);
                dispatch(setUser(response.data));
                const [surname, firstname, patronymic] =
                    response.data.name.split(" ");
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
                                src={data.image}
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
                <p>Загрузка...</p>
            )}
        </div>
    );
};

export default AccountMain;
