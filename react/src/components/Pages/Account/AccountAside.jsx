import { Link } from "react-router-dom";
import "./AccountAside.scss";

const AccountLayout = () => {
    return (
        <aside className="account__navbar">
            <Link to="/account" className="account__navbar-element">
                Личный кабинет
            </Link>
            <Link to="/account/edit" className="account__navbar-element">
                Редактирование профиля
            </Link>
            <Link to="/account/orders" className="account__navbar-element">
                Мои заказы
            </Link>
        </aside>
    );
};

export default AccountLayout;
