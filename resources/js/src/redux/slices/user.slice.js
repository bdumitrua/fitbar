import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: "user",
    initialState: {
        user: {},
        loading: false,
        error: null,
    },
    reducers: {
        // Редукторы для обработки различных действий
        userLoading: (state) => {
            state.loading = true;
        },
        userLoaded: (state, action) => {
            state.user = action.payload;
            state.loading = false;
            state.error = null;
        },
        userError: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
    },
});

export const { userLoading, userLoaded, userError } = userSlice.actions;

export default userSlice.reducer;
