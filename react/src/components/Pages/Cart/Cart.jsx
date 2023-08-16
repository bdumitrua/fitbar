import "./Cart.scss";
import CartCard from "./CartCard/CartCard";

import { Link } from "react-router-dom";

const Cart = () => {
    const getCartItems = () => {
        const items = JSON.parse(localStorage.getItem("cart")) || [];
        return items;
    };

    const cartItems = getCartItems();

    const handleRemoveFromCart = (productId) => {
        const existingCart = JSON.parse(localStorage.getItem("cart")) || [];
        const updatedCart = existingCart.filter(
            (item) => item.id !== productId
        );
        localStorage.setItem("cart", JSON.stringify(updatedCart)); // Удаляем товар из корзины
    };

    return (
        <div className="cart container">
            <h2 className="cart__title">Корзина</h2>
            {cartItems.map((product) => (
                <CartCard
                    product={product}
                    key={product.id}
                    handleRemoveFromCart={handleRemoveFromCart}
                />
            ))}
            <p className="cart__sum">{`Итого: ${(100.01).toFixed(2)} руб.`}</p>
            <Link to="/order" className="cart__order-button">
                Заказать
            </Link>
        </div>
    );
};

export default Cart;
