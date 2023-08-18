import { useState } from "react";
import ProductRating from "../../components/ProductRating/ProductRating";

const ProductReview = () => {
    const [data, setData] = useState();

    return (
        <div className="product-page__review">
            ProductReview
            <ProductRating rating={data.rating} />
        </div>
    );
};

export default ProductReview;
