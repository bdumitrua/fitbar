import "./Cart.scss";
import CartCard from "./CartCard/CartCard";

import { Link } from "react-router-dom";
import { useCartContext } from "../../../utils/providers/cart.provider";

// TODO
// Сделать обработку корзины с редаксом и запросами к бэку.
// Сделать сумму товаров

const Cart = () => {
    const { handleRemoveFromCart, cartItems } = useCartContext();

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
            {cartItems.length == 0 && (
                <p>Вы еще не добавили товары в свою корзину!</p>
            )}
            <p className="cart__sum">{`Итого: ${(100.01).toFixed(2)} руб.`}</p>
            <Link to="/order" className="cart__order-button">
                Заказать
            </Link>
        </div>
    );
};

export default Cart;
