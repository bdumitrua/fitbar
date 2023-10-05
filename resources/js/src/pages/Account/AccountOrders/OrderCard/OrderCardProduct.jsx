import Loader from "@/components/Loader/Loader";
import { Link } from "react-router-dom";

const OrderCardProduct = ({ product }) => {
    return (
        <>
            {product ? (
                <Link to={`/products/${product}`}>
                    <img
                        src={product.image}
                        alt=""
                        className="order-card__product-image"
                    />
                </Link>
            ) : (
                <Loader />
            )}
        </>
    );
};

export default OrderCardProduct;
