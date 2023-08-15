import { useDispatch } from "react-redux";
import CartCard from "./CartCard/CartCard";

const Cart = ({ userId }) => {
    const dispatch = useDispatch();

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
        <div className="cart">
            <h2>Корзина</h2>
            {cartItems.map((product) => (
                <CartCard
                    product={product}
                    key={product.id}
                    handleRemoveFromCart={handleRemoveFromCart}
                />
            ))}
        </div>
    );
};

export default Cart;
