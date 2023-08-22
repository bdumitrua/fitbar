import "./Cart.scss";
import CartCard from "./CartCard/CartCard";

import { Link } from "react-router-dom";
import { useCartContext } from "../../utils/providers/cart.provider";
import CartTotalPrice from "./CartTotalPrice";

// TODO
// Сделать обработку корзины с редаксом

const Cart = () => {
    const { handleRemoveFromCart, cartItems } = useCartContext();

    const totalPrice = cartItems.reduce((accumulator, currentItem) => {
        return (
            +accumulator +
            +currentItem.price *
                localStorage.getItem(`product_count_${currentItem.id}`)
        );
    }, 0);

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
            <CartTotalPrice totalPrice={totalPrice} />
            <Link to="/order" className="cart__order-button">
                Заказать
            </Link>
        </div>
    );
};

export default Cart;
