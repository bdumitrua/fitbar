import "./Cart.scss";
import CartCard from "./CartCard/CartCard";

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
        </div>
    );
};

export default Cart;
