import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: "user",
    initialState: null,
    reducers: {
        setUser: (state, action) => {
            return action.payload; // Это действие устанавливает данные о пользователе в сторе
        },
        clearUser: (state) => {
            return null; // Это действие очищает данные о пользователе из стора при выходе из аккаунта
        },
    },
});

export const { setUser, clearUser } = userSlice.actions;

export default userSlice.reducer;
