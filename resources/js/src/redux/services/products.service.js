import axiosInstance from "../../utils/axios/instance";
import {
    productsError,
    productsLoaded,
    productsLoading,
} from "../slices/products.slice";

export const fetchProducts = () => async (dispatch) => {
    try {
        dispatch(productsLoading());
        const response = await axiosInstance.get("/products");
        dispatch(productsLoaded(response.data));
    } catch (error) {
        dispatch(productsError(error.message));
    }
};

export const createProduct = async (data, closeModal) => {
    try {
        const response = await axiosInstance.post("/products/create", data);
        if (response.status === 200) {
            console.log("Запрос успешно отправлен!");
            closeModal();
        } else {
            console.error("Произошла ошибка при отправке запроса.");
        }
        return response;
    } catch (error) {
        console.error("Произошла ошибка:", error);
    }
};
