import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import AuthService from "../services/auth.service";

// Создаем асинхронный Thunk для выполнения запроса на авторизацию
export const loginAsync = createAsyncThunk(
    "auth/login",
    async ({ email, password }) => {
        const user = await AuthService.login(email, password);
        return user;
    }
);

export const logoutAsync = createAsyncThunk("auth/logout", async () => {
    await AuthService.logout();
});

export const refreshAccessToken = createAsyncThunk(
    "auth/refresh",
    async (_, { getState }) => {
        const { auth } = getState();
        const currentTime = new Date().getTime();
        const tokenExpiration = auth.accessTokenExpiresAt;

        if (tokenExpiration && currentTime >= tokenExpiration - 120000) {
            try {
                const newAccessToken = await AuthService.refreshToken(
                    auth.refreshToken
                );
                return newAccessToken;
            } catch (error) {
                console.error(error);
                throw error;
            }
        } else {
            // Возвращаем текущий access токен, так как он еще действителен
            return auth.accessToken;
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
    accessToken: localStorage.getItem("access_token") || null,
    refreshToken: localStorage.getItem("refresh_token") || null,
    accessTokenExpiresAt: localStorage.getItem("access_token_expires_at"),
    loading: false,
    error: null,
    loggedIn: false,
    loggedOut: false,
    rememberMe: false,
    handleSuccessfulLogin: null,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setRememberMe: (state) => {
            state.rememberMe = true;
        },
        resetRememberMe: (state) => {
            state.rememberMe = false;
        },
        setLoggedIn: (state, action) => {
            state.loggedIn = action.payload;
        },
        setLoggedOut: (state, action) => {
            state.loggedIn = action.payload;
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

            .addCase(logoutAsync.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(logoutAsync.fulfilled, (state) => {
                state.loading = false;
                state.user = null;
                state.accessToken = null;
                state.refreshToken = null;
                state.error = null;
                state.loggedOut = true;
            })
            .addCase(logoutAsync.rejected, (state, action) => {
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

export const {
    logout,
    setLoggedIn,
    setLoggedOut,
    setRememberMe,
    resetRememberMe,
} = authSlice.actions;
export default authSlice.reducer;
