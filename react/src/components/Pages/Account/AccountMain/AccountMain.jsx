import { useEffect, useState } from "react";
import axiosInstance from "../../../../axios/instance";
import LoginModal from "../../../Login/LoginModal";
import "../Account.scss";
import AccountLayout from "../AccountAside";
import "./AccountMain.scss";

const AccountMain = () => {
    const [data, setData] = useState({});

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axiosInstance.get("/users/me");
                setData(response.data);
                console.log(response.data);
            } catch (error) {
                console.error("Произошла ошибка при выполнении запроса", error);
            }
        };

        fetchData();
    }, []);

    return (
        <div className="account container">
            {data ? (
                <>
                    <AccountLayout />
                    <div className="account-container">
                        <p className="account__page-title">Личный кабинет</p>
                        <div className="account-info">
                            <img
                                src=""
                                alt=""
                                className="account-info__image"
                            />
                            <div className="account-info__private-info">
                                <input
                                    type="text"
                                    className="account-info__private-info-element"
                                    placeholder="Имя"
                                    disabled
                                    value={data.name}
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
                                />
                                <input
                                    type="tel"
                                    className="account-info__private-info-element"
                                    placeholder="Номер телефона"
                                    disabled
                                />
                                <input
                                    type="text"
                                    className="account-info__private-info-element"
                                    placeholder="Отчество"
                                    disabled
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
                <LoginModal />
            )}
        </div>
    );
};

export default AccountMain;
