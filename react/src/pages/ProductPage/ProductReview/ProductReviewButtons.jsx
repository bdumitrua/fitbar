import "../ProductPage.scss";

const ProductReviewButtons = ({
    reviewId,
    onDislike,
    onLike,
    likes,
    dislikes,
}) => {
    const handleDislike = () => {
        onDislike(reviewId);
    };

    const handleLike = () => {
        onLike(reviewId);
    };

    return (
        <div className="product-page__review-helpful-buttons">
            <button
                onClick={handleLike}
                className="product-page__review-helpful-button"
            >{`Да ${likes}`}</button>
            <button
                onClick={handleDislike}
                className="product-page__review-helpful-button"
            >{`Нет ${dislikes}`}</button>
        </div>
    );
};

export default ProductReviewButtons;
