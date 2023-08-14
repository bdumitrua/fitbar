import { useDispatch, useSelector } from "react-redux";
import { removeFromCartAsync } from "./cartSlice";

const Cart = ({ userId }) => {
    const cartItems = useSelector((state) => state.cart);
    const dispatch = useDispatch();

    const handleRemoveFromCart = (productId) => {
        dispatch(removeFromCartAsync({ userId, productId })); // Удаляем товар из корзины
    };

    return (
        <div className="cart">
            <h2>Корзина</h2>
            {cartItems.map((item) => (
                <div key={item.id} className="cart-item">
                    <p>{item.name}</p>
                    <p>{item.price} руб.</p>
                    <button onClick={() => handleRemoveFromCart(item.id)}>
                        Удалить
                    </button>
                </div>
            ))}
        </div>
    );
};

export default Cart;
