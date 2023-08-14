import axiosInstance from "../../axios/instance";

export const cartService = {
    addToCart: async (userId, productId) => {
        try {
            const response = await axiosInstance.post(
                `/cart/store/${productId}`,
                {
                    productId,
                }
            );
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
            return response;
        } catch (error) {
            console.log("cart service");
            throw error;
        }
    },
};
