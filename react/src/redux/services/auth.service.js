import axios from "axios";

const AuthService = {
    login: async (email, password) => {
        try {
            // Отправляем данные на сервер для проверки и получения токена.
            const response = await axios.post(
                "http://localhost:8000/api/auth/login",
                {
                    email,
                    password,
                }
            );
            console.log(response.data.accessToken);
            // Сохраняем токен доступа в localStorage или cookies.
            localStorage.setItem("accessToken", response.data.accessToken);

            // Возвращаем токен из функции
            return response.data.accessToken;
        } catch (error) {
            console.error("Ошибка", error);
            throw error;
        }
    },
};

export default AuthService;
