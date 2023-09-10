import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AccountLayoutAdmin from "./AccountLayoutAdmin";

const OrderRequests = () => {
    const navigate = useNavigate();
    const access = localStorage.getItem("access_token");

    useEffect(() => {
        if (!access || access === undefined) {
            navigate("/home");
        }
    }, [access, navigate]);

    return (
        <div className="order-requests container">
            <AccountLayoutAdmin />
        </div>
    );
};

export default OrderRequests;
