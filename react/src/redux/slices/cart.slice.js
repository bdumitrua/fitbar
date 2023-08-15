import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { cartService } from "../services/cart.service";

export const addToCartAsync = createAsyncThunk(
    "cart/addToCart",
    async ({ product, productId }) => {
        const response = await cartService.addToCart(product, productId);
        return response.data;
    }
);

export const removeFromCartAsync = createAsyncThunk(
    "cart/removeFromCart",
    async ({ productId }) => {
        const response = await cartService.removeFromCart(productId);
        return response.data;
    }
);

export const getCartItemsAsync = createAsyncThunk(
    "cart/getCartItems",
    async () => {
        const response = await cartService.getCartItems();
        return response.data;
    }
);

const cartSlice = createSlice({
    name: "cart",
    initialState: [],
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(addToCartAsync.fulfilled, (state, action) => {
                state.push(action.payload); // Добавляем товар в корзину
            })
            .addCase(removeFromCartAsync.fulfilled, (state, action) => {
                return state.filter(
                    (item) => item.id !== action.payload.productId
                ); // Удаляем товар из корзины
            });
    },
});

export default cartSlice.reducer;
