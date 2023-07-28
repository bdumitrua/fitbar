import "../Account.scss";
import AccountLayout from "../AccountAside";
import "../AccountMain/AccountMain.scss";

const AccountEdit = () => {
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
                        />
                        <input
                            type="date"
                            className="account-info__private-info-element"
                            placeholder="Дата рождения"
                        />
                        <input
                            type="text"
                            className="account-info__private-info-element"
                            placeholder="Фамилия"
                        />
                        <input
                            type="tel"
                            className="account-info__private-info-element"
                            placeholder="Номер телефона"
                        />
                        <input
                            type="text"
                            className="account-info__private-info-element"
                            placeholder="Отчество"
                        />
                        <input
                            type="email"
                            className="account-info__private-info-element"
                            placeholder="Электронная почта"
                        />
                        <input
                            type="text"
                            className="account-info__private-info-element private-info-element-long"
                            placeholder="Адрес"
                        />

                        <input
                            type="password"
                            className="account-info__private-info-element"
                            placeholder="Пароль"
                        />
                        <input
                            type="password"
                            className="account-info__private-info-element"
                            placeholder="Пароль"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AccountEdit;
