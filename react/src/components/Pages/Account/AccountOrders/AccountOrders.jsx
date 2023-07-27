import "../Account.scss";
import AccountLayout from "../AccountAside";
import "./AccountOrders.scss";

const AccountOrders = () => {
    return (
        <div className="account container">
            <AccountLayout />
            <div className="account-orders">Orders</div>
        </div>
    );
};

export default AccountOrders;
