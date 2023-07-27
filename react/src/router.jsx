import { Navigate, createBrowserRouter } from "react-router-dom";
import DefaultLayout from "./components/DefaultLayout";
import AccountEdit from "./components/Pages/Account/AccountEdit/AccountEdit";
import AccountMain from "./components/Pages/Account/AccountMain/AccountMain";
import AccountOrders from "./components/Pages/Account/AccountOrders/AccountOrders";
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
                path: "/account",
                element: <AccountMain />,
            },
            {
                path: "/account/edit",
                element: <AccountEdit />,
            },
            {
                path: "/account/orders",
                element: <AccountOrders />,
            },
        ],
    },
    {
        path: "*",
        element: <NotFound />,
    },
]);

export default router;