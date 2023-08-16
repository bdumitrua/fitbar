const Order = () => {
    const getCartItems = () => {
        const items = JSON.parse(localStorage.getItem("cart")) || [];
        return items;
    };

    const cartItems = getCartItems();

    return <div>Order</div>;
};

export default Order;
