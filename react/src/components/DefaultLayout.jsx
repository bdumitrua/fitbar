import { Outlet } from "react-router-dom";
import "./DefaultLayout.scss";
import { Footer } from "./Footer/Footer";
import { Header } from "./Header/Header";

const DefaultLayout = () => {
    return (
        <div>
            govno
            <Header />
            <Outlet />
            <Footer />
        </div>
    );
};

export default DefaultLayout;
