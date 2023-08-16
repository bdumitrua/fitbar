import { CartProvider } from "./utils/providers/cart.provider";

const AppProviders = ({ children }) => {
    return <CartProvider>{children}</CartProvider>;
};

export default AppProviders;
