import { createSlice } from "@reduxjs/toolkit";

const productsSlice = createSlice({
    name: "products",
    initialState: {
        products: [],
        loading: false,
        error: null,
    },
    reducers: {
        // Редукторы для обработки различных действий
        productsLoading: (state) => {
            state.loading = true;
        },
        productsLoaded: (state, action) => {
            state.products = action.payload;
            state.loading = false;
            state.error = null;
        },
        productsError: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
    },
});

export const { productsLoading, productsLoaded, productsError } =
    productsSlice.actions;

export default productsSlice.reducer;
