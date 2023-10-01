import axiosInstance from "../../utils/axios/instance";
import { userError, userLoaded, userLoading } from "../slices/user.slice";

export const fetchUser = () => async (dispatch) => {
    try {
        dispatch(userLoading());
        const response = await axiosInstance.get("/users/me");
        dispatch(userLoaded(response.data));
        console.log(response.data);
    } catch (error) {
        dispatch(userError(error.message));
    }
};
