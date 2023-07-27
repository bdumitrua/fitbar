import "../Account.scss";
import AccountLayout from "../AccountAside";
import "./AccountMain.scss";

const AccountMain = () => {
    return (
        <div className="account container">
            <AccountLayout />
            <div className="account-container">
                <p className="account__page-title">Личный кабинет</p>
                <div className="account-info">
                    <img src="" alt="" className="account-info__image" />
                    <div className="account-info__private-info">
                        <div
                            className="account-info__private-info-element"
                            placeholder="Имя"
                        >
                            Имя
                        </div>
                        <div
                            className="account-info__private-info-element"
                            placeholder="Дата рождения"
                        >
                            Дата рождения
                        </div>
                        <div
                            className="account-info__private-info-element"
                            placeholder="Фамилия"
                        >
                            Фамилия
                        </div>
                        <div
                            className="account-info__private-info-element"
                            placeholder="Номер телефона"
                        >
                            Номер
                        </div>
                        <div
                            className="account-info__private-info-element"
                            placeholder="Отчество"
                        >
                            Отчество
                        </div>
                        <div
                            className="account-info__private-info-element"
                            placeholder="Электронная почта"
                        >
                            Почта
                        </div>
                        <div
                            className="account-info__private-info-element private-info-element-long"
                            placeholder="Адрес"
                        >
                            Адрес
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AccountMain;
