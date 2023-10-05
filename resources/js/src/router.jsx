import { Navigate, createBrowserRouter } from "react-router-dom";
import DefaultLayout from "./components/DefaultLayout";
import AccountEdit from "./pages/Account/AccountEdit/AccountEdit";
import AccountMain from "./pages/Account/AccountMain/AccountMain";
import AccountOrders from "./pages/Account/AccountOrders/AccountOrders";
import Assortment from "./pages/Account/Admin/Assortment/Assortment";
import OrderRequests from "./pages/Account/Admin/OrderRequests/OrderRequests";
import Cart from "./pages/Cart/Cart";
import Category from "./pages/Category/Category";
import Home from "./pages/Home/Home";
import NotFound from "./pages/NotFound/NotFound";
import Order from "./pages/Order/Order";
import ProductPage from "./pages/ProductPage/ProductPage";

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
                path: "/cart",
                element: <Cart />,
            },
            {
                path: "/order",
                element: <Order />,
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
            {
                path: "/special/href/to/admin/orders",
                element: <OrderRequests />,
            },
            {
                path: "/special/href/to/admin/assortment",
                element: <Assortment />,
            },
        ],
    },
    {
        path: "*",
        element: <NotFound />,
    },
]);

export default router;
