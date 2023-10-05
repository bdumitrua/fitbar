import notfound from "@/assets/images/404.png";
import { Link } from "react-router-dom";
import "./NotFound.scss";

const NotFound = () => {
    return (
        <div className="not-found container">
            <img src={notfound} alt="" className="not-found__image" />
            <p className="not-found__text-bold">Где страница? Нет страницы!</p>
            <p className="not-found__text-regular">
                Но зато у нас есть другие!
            </p>
            <Link to="/" className="not-found__button">
                Перейти на рабочую страницу
            </Link>
        </div>
    );
};

export default NotFound;
