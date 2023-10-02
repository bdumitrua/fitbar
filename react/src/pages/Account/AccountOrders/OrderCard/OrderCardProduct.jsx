import { Link } from "react-router-dom";
import Loader from "../../../../components/Loader/Loader";

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
