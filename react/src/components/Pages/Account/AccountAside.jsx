import { Link } from "react-router-dom";
import "./AccountAside.scss";

const AccountLayout = () => {
    return (
        <aside className="account__navbar">
            <Link to="/user/account" className="account__navbar-element">
                Личный кабинет
            </Link>
            <Link to="/user/account/edit" className="account__navbar-element">
                Редактирование профиля
            </Link>
            <Link to="/user/account/orders" className="account__navbar-element">
                Мои заказы
            </Link>
        </aside>
    );
};

export default AccountLayout;
