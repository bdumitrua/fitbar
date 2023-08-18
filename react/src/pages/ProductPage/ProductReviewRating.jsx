import starEmpty from "../../../images/star-empty.svg";
import starFilled from "../../../images/star-filled.svg";

import "../ProductCard.scss";

const ProductReviewRating = ({ rating }) => {
    const roundedRating = Math.round(rating);

    const totalStars = 5;
    const starSize = 16;

    const stars = [];
    for (let i = 1; i <= totalStars; i++) {
        const isFilled = i <= roundedRating;
        const starIconSrc = isFilled ? starFilled : starEmpty;
        const altText = isFilled ? "Filled Star" : "Empty Star";

        stars.push(
            <div
                key={i}
                style={{
                    display: "flex",
                    width: starSize,
                    height: starSize,
                }}
            >
                <img src={starIconSrc} alt={altText} />
            </div>
        );
    }

    return <div className="product__rating">{stars}</div>;
};

export default ProductReviewRating;
