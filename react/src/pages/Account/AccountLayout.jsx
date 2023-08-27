import { useDispatch } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { logoutAsync, setLoggedOut } from "../../redux/slices/auth.slice";
import "./AccountAside.scss";

const AccountLayout = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    //TODO
    //Пофиксить выход из аккаунта
    const handleLogout = () => {
        dispatch(logoutAsync());
        dispatch(setLoggedOut(true));
        navigate("/home");
    };

    return (
        <aside className="account__navbar">
            <Link
                to="/user/account"
                className={`account__navbar-element ${
                    location.pathname === "/user/account" ? "active" : ""
                }`}
            >
                Личный кабинет
            </Link>
            <Link
                to="/user/account/edit"
                className={`account__navbar-element ${
                    location.pathname === "/user/account/edit" ? "active" : ""
                }`}
            >
                Редактирование профиля
            </Link>
            <Link
                to="/user/account/orders"
                className={`account__navbar-element ${
                    location.pathname === "/user/account/orders" ? "active" : ""
                }`}
            >
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
