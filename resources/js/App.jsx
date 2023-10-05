import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { RouterProvider } from "react-router-dom";
import AppProviders from "./src/AppProvider";
import "./src/index.scss";
import store from "./src/redux/store";
import router from "./src/router.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
    <Provider store={store}>
        <React.StrictMode>
            <AppProviders>
                <RouterProvider router={router} />
            </AppProviders>
        </React.StrictMode>
    </Provider>
);
