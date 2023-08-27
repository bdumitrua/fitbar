import { useState } from "react";
import "../ProductPage.scss";

const ProductReviewButtons = ({
    reviewId,
    onDislike,
    onLike,
    isVote,
    onRemoveVote,
    likes,
    dislikes,
}) => {
    const [voteLike, setVoteLike] = useState(false);
    const [voteDislike, setVoteDislike] = useState(false);

    const handleDislike = () => {
        onDislike(reviewId);
        setVoteDislike(() => !voteDislike);
    };

    const handleLike = () => {
        onLike(reviewId);
        setVoteLike(() => !voteLike);
    };

    const handleRemoveVote = () => {
        onRemoveVote(reviewId);
    };

    return (
        <div className="product-page__review-helpful-buttons">
            <button
                onClick={isVote === false ? handleLike : handleRemoveVote}
                className="product-page__review-helpful-button"
            >{`Да ${voteLike === false ? likes : likes + 1}`}</button>
            <button
                onClick={isVote === false ? handleDislike : handleRemoveVote}
                className="product-page__review-helpful-button"
            >{`Нет ${voteDislike === false ? dislikes : dislikes + 1}`}</button>
        </div>
    );
};

export default ProductReviewButtons;
