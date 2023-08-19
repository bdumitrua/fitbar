import { CartProvider } from "./utils/providers/cart.provider";
import { MainProvider } from "./utils/providers/main.provider";

const AppProviders = ({ children }) => {
    return (
        <MainProvider>
            <CartProvider>{children}</CartProvider>;
        </MainProvider>
    );
};

export default AppProviders;
