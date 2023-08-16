import { createContext, useContext, useState } from "react";

const CartContext = createContext();

export const useCartContext = () => {
    return useContext(CartContext);
};

export const CartProvider = ({ children }) => {
    const getCartItems = () => {
        const items = JSON.parse(localStorage.getItem("cart")) || [];
        return items;
    };

    const [cartItems, setCartItems] = useState(getCartItems());

    const handleRemoveFromCart = (productId) => {
        const updatedCartItems = cartItems.filter(
            (item) => item.id !== productId
        );
        setCartItems(updatedCartItems);
        localStorage.removeItem(`product_count_${productId}`);
        localStorage.setItem("cart", JSON.stringify(updatedCartItems));
    };

    const handleAddToCart = (product) => {
        const existingCart = JSON.parse(localStorage.getItem("cart")) || [];
        const updatedCart = [...existingCart, product];
        localStorage.setItem("cart", JSON.stringify(updatedCart)); // Добавляем товар в корзину
    };

    const contextValue = {
        cartItems,
        setCartItems,
        handleAddToCart,
        handleRemoveFromCart,
    };

    return (
        <CartContext.Provider value={contextValue}>
            {children}
        </CartContext.Provider>
    );
};
