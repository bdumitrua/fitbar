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

export const saveToken = (token) => {
    return {
        type: "auth/saveToken",
        payload: token,
    };
};

const initialState = {
    user: null,
    loading: false,
    error: null,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        logout: (state) => {
            state.user = null;
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
            })
            .addCase(loginAsync.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
