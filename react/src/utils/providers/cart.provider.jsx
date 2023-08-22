import { createContext, useContext, useState } from "react";
import axiosInstance from "../axios/instance";

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
        axiosInstance.delete(`/cart/delete/${productId}`);
        setCartItems(updatedCartItems);
        localStorage.removeItem(`product_count_${productId}`);
        localStorage.setItem("cart", JSON.stringify(updatedCartItems));
    };

    const handleAddToCart = (product) => {
        let quantity;
        if (JSON.parse(localStorage.getItem(`product_count_${product.id}`))) {
            quantity = JSON.parse(
                localStorage.getItem(`product_count_${product.id}`)
            );
        } else {
            localStorage.setItem(`product_count_${product.id}`, 1);
            quantity = 1;
        }
        axiosInstance.post(`/cart/store/${product.id}`);
        axiosInstance.patch(`/cart/update/${product.id}`, { quantity });

        const existingCart = JSON.parse(localStorage.getItem("cart")) || [];
        const updatedCart = [...existingCart, product];
        localStorage.setItem("cart", JSON.stringify(updatedCart));

        setCartItems((prevCartItems) => [...prevCartItems, product]);
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
