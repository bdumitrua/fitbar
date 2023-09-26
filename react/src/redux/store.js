import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authSlice, {
    refreshAccessToken,
    setHandleSuccessfulLogin,
} from "./slices/auth.slice";
import productsSlice from "./slices/products.slice";
import registerSlice from "./slices/register.slice";

const rootReducer = combineReducers({
    auth: authSlice,
    register: registerSlice,
    products: productsSlice,
});

const store = configureStore({
    reducer: rootReducer,
});

const rememberMe = localStorage.getItem("rememberMe") === "true";
if (rememberMe) {
    const refreshToken = localStorage.getItem("refreshToken");
    if (refreshToken) {
        store.dispatch(refreshAccessToken(refreshToken)).then((action) => {
            // После успешного обновления токена вызываем функцию handleSuccessfulLogin
            const newAccessToken = action.payload;
            if (newAccessToken) {
                setHandleSuccessfulLogin(newAccessToken);
            }
        });
    }
}

export default store;
