import { createContext, useContext, useEffect, useState } from "react";
import axiosInstance from "../axios/instance";

const CartContext = createContext();

export const useCartContext = () => {
    return useContext(CartContext);
};

export const CartProvider = ({ children }) => {
    const [productInCart, setProductInCart] = useState(false);
    const [data, setData] = useState(null);

    const getCartItems = () => {
        const items = JSON.parse(localStorage.getItem("cart")) || [];
        return items;
    };

    const [cartItems, setCartItems] = useState(getCartItems());

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axiosInstance.get(
                    "http://localhost:8000/api/products"
                );
                setData(response.data);
            } catch (error) {
                console.error("Произошла ошибка при выполнении запроса", error);
            }
        };

        fetchData();
    }, []);

    const handleRemoveFromCart = (productId) => {
        const updatedCartItems = cartItems.filter(
            (item) => item.id !== productId
        );
        setCartItems(updatedCartItems);
        localStorage.removeItem(`product_count_${productId}`);
        localStorage.setItem("cart", JSON.stringify(updatedCartItems));
    };

    const handleAddToCart = () => {
        const existingCart = JSON.parse(localStorage.getItem("cart")) || [];
        const updatedCart = [...existingCart, data];
        localStorage.setItem("cart", JSON.stringify(updatedCart)); // Добавляем товар в корзину
        setProductInCart(true);
    };

    const contextValue = {
        productInCart,
        handleAddToCart,
        handleRemoveFromCart,
    };

    return (
        <CartContext.Provider value={contextValue}>
            {children}
        </CartContext.Provider>
    );
};
