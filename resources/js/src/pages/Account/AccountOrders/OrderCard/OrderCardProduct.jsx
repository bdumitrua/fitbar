import Loader from "@/components/Loader/Loader";
import axiosInstance from "@/utils/axios/instance";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const OrderCardProduct = ({ productId }) => {
    const [data, setData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axiosInstance.get(
                    `/products/show/${productId}`
                );
                setData(response.data);
            } catch (error) {
                console.error("Error", error);
            }
        };

        fetchData();
    }, [productId]);

    return (
        <>
            {data ? (
                <Link to={`/products/${productId}`}>
                    <img
                        src={data.image}
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
