import starEmpty from "@/assets/images/star-empty.svg";
import starFilled from "@/assets/images/star-filled.svg";

import "../ProductCard/ProductCard.scss";

const ProductRating = ({ rating }) => {
    const roundedRating = Math.floor(rating);

    const totalStars = 5;

    const stars = [];
    for (let i = 1; i <= totalStars; i++) {
        const isFilled = i <= roundedRating;
        const starIconSrc = isFilled ? starFilled : starEmpty;
        const altText = isFilled ? "Filled Star" : "Empty Star";

        stars.push(
            <div key={i} className="product-card__rating">
                <img src={starIconSrc} alt={altText} />
            </div>
        );
    }

    return <div className="product__rating">{stars}</div>;
};

export default ProductRating;
