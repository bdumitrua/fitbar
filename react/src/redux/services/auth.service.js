import axiosInstance from "../../axios/instance";

const AuthService = {
    login: async (email, password) => {
        try {
            // Отправляем данные на сервер для проверки и получения токена.
            const response = await axiosInstance.post("auth/login", {
                email,
                password,
            });

            localStorage.setItem("access_token", response.data.access_token);
            // Возвращаем токен из функции
            return response.data.access_token;
        } catch (error) {
            console.error("Ошибка", error);
            throw error;
        }
    },
    async refreshToken(refreshToken) {
        try {
            const response = await axiosInstance.post("auth/refresh", {
                refreshToken,
            });
            const newAccessToken = response.data.access_token;
            localStorage.setItem("access_token", newAccessToken);
            return newAccessToken;
        } catch (error) {
            console.error("Ошибка при обновлении токена", error);
            throw error;
        }
    },
};

export default AuthService;
