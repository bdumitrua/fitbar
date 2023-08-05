import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authSlice from "./slices/auth.slice";

const rootReducer = combineReducers({
    auth: authSlice,
});

const store = configureStore({
    reducer: rootReducer,
});

export default store;
