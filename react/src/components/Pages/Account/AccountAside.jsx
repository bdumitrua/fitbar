import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../../../redux/slices/auth.slice";
import { clearUser } from "../../../redux/slices/user.slice";
import "./AccountAside.scss";

const AccountLayout = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = () => {
        dispatch(logout());
        dispatch(clearUser());
        navigate("http://localhost:3000/home");
    };

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
            <button
                onClick={handleLogout}
                className="account__navbar-element logout-button"
            >
                Выйти
            </button>
        </aside>
    );
};

export default AccountLayout;
