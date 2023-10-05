import axiosInstance from "../../utils/axios/instance";

const AuthService = {
    login: async (email, password) => {
        try {
            // Отправляем данные на сервер для проверки и получения токена.
            const response = await axiosInstance.post("/auth/login", {
                email,
                password,
            });

            const expirationTime =
                new Date().getTime() + response.data.expires_in * 1000; // Преобразуем секунды в миллисекунды
            localStorage.setItem("access_token", response.data.access_token);
            localStorage.setItem("access_token_expires_at", expirationTime);
            axiosInstance.defaults.headers.common["Authorization"] =
                "Bearer " + response.data.access_token;

            return response.data.access_token;
        } catch (error) {
            console.error(error);
            throw error;
        }
    },

    // logout: async () => {
    //     try {
    //         await axiosInstance.post("/auth/logout");

    //         localStorage.removeItem("access_token");
    //         localStorage.removeItem("access_token_expires_at");
    //     } catch (error) {
    //         console.error(error);
    //         throw error;
    //     }

    //     // Очищаем localStorage при выходе пользователя
    // },

    //TODO
    //Пофиксить обновление токена
    async refreshToken(refreshToken) {
        try {
            const response = await axiosInstance.post("auth/refresh", {
                refreshToken,
            });
            const newAccessToken = response.data.access_token;
            localStorage.setItem("access_token", newAccessToken);

            // Обновляем заголовок "Authorization" в axios с новым access токеном
            axiosInstance.defaults.headers.common["Authorization"] =
                "Bearer " + newAccessToken;

            return newAccessToken;
        } catch (error) {
            console.error("Ошибка при обновлении токена", error);
            throw error;
        }
    },
};

export default AuthService;
