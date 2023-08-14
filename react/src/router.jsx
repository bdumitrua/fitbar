import { Navigate, createBrowserRouter } from "react-router-dom";
import DefaultLayout from "./components/DefaultLayout";
import AccountEdit from "./components/Pages/Account/AccountEdit/AccountEdit";
import AccountMain from "./components/Pages/Account/AccountMain/AccountMain";
import AccountOrders from "./components/Pages/Account/AccountOrders/AccountOrders";
import Category from "./components/Pages/Category/Category";
import Home from "./components/Pages/Home/Home";
import NotFound from "./components/Pages/NotFound/NotFound";
import ProductPage from "./components/Pages/ProductPage/ProductPage";

const router = createBrowserRouter([
    {
        path: "/",
        element: <DefaultLayout />,
        children: [
            {
                path: "/",
                element: <Navigate to="/home" />,
            },
            {
                path: "/home",
                element: <Home />,
            },
            {
                path: "/user/account",
                element: <AccountMain />,
            },
            {
                path: "/user/account/edit",
                element: <AccountEdit />,
            },
            {
                path: "/user/account/orders",
                element: <AccountOrders />,
            },
            {
                path: "/category/:categorySlug",
                element: <Category />,
            },
            {
                path: "/products/:productId",
                element: <ProductPage />,
            },
        ],
    },
    {
        path: "*",
        element: <NotFound />,
    },
]);

export default router;
