import axiosInstance from "../../axios/instance";

export const cartService = {
    addToCart: async (userId, product, productId) => {
        try {
            const response = await axiosInstance.post(
                `/cart/store/${productId}`,
                {
                    productId,
                }
            );
            const existingCart = JSON.parse(localStorage.getItem("cart")) || [];
            const updatedCart = [...existingCart, product];
            localStorage.setItem("cart", JSON.stringify(updatedCart));
            return response;
        } catch (error) {
            console.log("cart service");
            throw error;
        }
    },

    removeFromCart: async (userId, productId) => {
        try {
            const response = await axiosInstance.delete(
                `/cart/delete/${productId}`
            );
            const existingCart = JSON.parse(localStorage.getItem("cart")) || [];
            const updatedCart = existingCart.filter(
                (item) => item.id !== productId
            );
            localStorage.setItem("cart", JSON.stringify(updatedCart));
            return response;
        } catch (error) {
            console.log("cart service");
            throw error;
        }
    },
};
