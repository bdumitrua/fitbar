import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import RegisterService from "../services/register.service";

export const registerAsync = createAsyncThunk(
    "auth/login",
    async ({ name, email, password }) => {
        try {
            const user = await RegisterService.register(name, email, password);
            return user;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
);

const initialState = {
    user: null,
    loading: false,
    error: null,
    handleSuccessfulRegister: null,
};

const registerSlice = createSlice({
    name: "register",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(registerAsync.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(registerAsync.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload;
                state.error = null;
            })
            .addCase(registerAsync.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    },
});

export default registerSlice.reducer;
