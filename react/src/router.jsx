import { Navigate, createBrowserRouter } from "react-router-dom";
import DefaultLayout from "./components/DefaultLayout";
import AccountEdit from "./components/Pages/Account/AccountEdit/AccountEdit";
import AccountMain from "./components/Pages/Account/AccountMain/AccountMain";
import AccountOrders from "./components/Pages/Account/AccountOrders/AccountOrders";
import Category from "./components/Pages/Category/Category";
import CategoryPage from "./components/Pages/Category/CategoryPage/CategoryPage";
import Home from "./components/Pages/Home/Home";
import NotFound from "./components/Pages/NotFound/NotFound";

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
                path: "/category",
                element: <Category />,
                children: [
                    {
                        path: "/category/ziry",
                        element: <CategoryPage />,
                    },
                    {
                        path: "/category/vitaminy",
                        element: <CategoryPage />,
                    },
                    {
                        path: "/category/aminokisloty",
                        element: <CategoryPage />,
                    },
                    {
                        path: "/category/batonciki-i-sneki",
                        element: <CategoryPage />,
                    },
                    {
                        path: "/category/protein",
                        element: <CategoryPage />,
                    },
                    {
                        path: "/category/kreatin",
                        element: <CategoryPage />,
                    },
                    {
                        path: "/category/napitki",
                        element: <CategoryPage />,
                    },
                    {
                        path: "/category/predtren",
                        element: <CategoryPage />,
                    },
                ],
            },
        ],
    },
    {
        path: "*",
        element: <NotFound />,
    },
]);

export default router;
