import axios from "axios";

// TODO
// Брать адрес из env
const ApiUrl = "http://localhost:8000/api";

const axiosInstance = axios.create({
    baseURL: ApiUrl,
});

axiosInstance.defaults.headers.common["Authorization"] =
    "Bearer " + localStorage.getItem("access_token");

// Создаем перехватчик ответов
axiosInstance.interceptors.response.use(null, async (error) => {
    if (error.config && error.response && error.response.status === 401) {
        // Сохраняем оригинальный запрос
        const originalRequest = error.config;
        const token = localStorage.getItem("access_token");

        if (token) {
            try {
                // Получаем новый токен
                const response = await axiosInstance.post("/auth/refresh");

                // Обновляем токен в хранилище
                localStorage.setItem(
                    "access_token",
                    response.data.access_token
                );

                // Обновляем токен в заголовке авторизации
                axiosInstance.defaults.headers.common["Authorization"] =
                    "Bearer " + localStorage.getItem("access_token");

                // Повторяем оригинальный запрос с новым токеном
                return axiosInstance(originalRequest);
            } catch (err) {
                console.error(err);
            }
        }
    }

    return Promise.reject(error);
});

export default axiosInstance;
