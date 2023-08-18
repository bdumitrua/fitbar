import { useState } from "react";
import ProductRating from "../../components/ProductRating/ProductRating";

const ProductReview = ({ productId }) => {
    const [data, setData] = useState();

    return (
        <div className="product-page__review">
            ProductReview
            <ProductRating rating={1} />
        </div>
    );
};

export default ProductReview;
