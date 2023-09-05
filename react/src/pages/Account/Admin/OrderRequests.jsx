import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import AccountLayoutAdmin from "./AccountLayoutAdmin";

const OrderRequests = () => {
    const navigate = useNavigate();
    const isLoggedIn = useSelector((state) => state.auth.loggedIn);

    useEffect(() => {
        if (!isLoggedIn) {
            navigate("/home");
        }
    }, [isLoggedIn, navigate]);

    return (
        <div className="order-requests container">
            <AccountLayoutAdmin />
        </div>
    );
};

export default OrderRequests;
