import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axiosInstance from "../../../../utils/axios/instance";

const OrderCardProduct = ({ productId }) => {
    const [data, setData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axiosInstance.get(
                    `/products/show/${productId}`
                );
                console.log(response.data);
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
                <p>Загрузка...</p>
            )}
        </>
    );
};

export default OrderCardProduct;
