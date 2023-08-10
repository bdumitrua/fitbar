import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import AuthService from "../services/auth.service";

// Создаем асинхронный Thunk для выполнения запроса на авторизацию
export const loginAsync = createAsyncThunk(
    "auth/login",
    async ({ email, password }) => {
        try {
            const user = await AuthService.login(email, password);
            return user;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
);

export const refreshAccessToken = createAsyncThunk(
    "auth/refresh",
    async (refreshToken) => {
        try {
            const newAccessToken = await AuthService.refreshToken(refreshToken);
            return newAccessToken;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
);

export const saveToken = (token) => {
    return {
        type: "auth/saveToken",
        payload: token,
    };
};

export const setHandleSuccessfulLogin = (handleSuccessfulLogin) => {
    return {
        type: "auth/setHandleSuccessfulLogin",
        payload: handleSuccessfulLogin,
    };
};

const initialState = {
    user: null,
    accessToken: localStorage.getItem("accessToken") || null,
    refreshToken: localStorage.getItem("refreshToken") || null,
    loading: false,
    error: null,
    loggedIn: false,
    rememberMe: false,
    handleSuccessfulLogin: null,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        logout: (state) => {
            state.user = null;
            state.accessToken = null;
            state.refreshToken = null;
            // Очищаем localStorage при выходе пользователя
            localStorage.removeItem("access_token");
            localStorage.removeItem("refresh_token");
        },
        setRememberMe: (state) => {
            state.rememberMe = true;
        },
        resetRememberMe: (state) => {
            state.rememberMe = false;
        },
        setLoggedIn: (state, action) => {
            state.loggedIn = action.payload; // Устанавливаем состояние авторизации
        },
        setHandleSuccessfulLogin: (state, action) => {
            state.handleSuccessfulLogin = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginAsync.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(loginAsync.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload;
                state.error = null;
                state.loggedIn = true;
            })
            .addCase(loginAsync.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })

            .addCase(refreshAccessToken.fulfilled, (state, action) => {
                state.accessToken = action.payload; // Обновляем access токен в состоянии
                state.error = null; // Сбрасываем ошибку, если была
            })

            .addCase(refreshAccessToken.rejected, (state, action) => {
                state.error = action.error.message; // Сохраняем сообщение об ошибке в состоянии
            });
    },
});

export const { logout, setLoggedIn, setRememberMe, resetRememberMe } =
    authSlice.actions;
export default authSlice.reducer;
