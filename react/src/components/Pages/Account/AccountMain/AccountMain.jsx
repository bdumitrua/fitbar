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
                        <input
                            type="text"
                            className="account-info__private-info-element"
                            placeholder="Имя"
                            disabled
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
        </div>
    );
};

export default AccountMain;
