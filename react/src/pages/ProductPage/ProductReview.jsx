import ProductRating from "../../components/ProductRating/ProductRating";
import { useMainContext } from "../../utils/providers/main.provider";

const ProductReviews = ({ reviews }) => {
    const { formatDate } = useMainContext();

    return (
        <div className="product-page__reviews">
            {reviews ? (
                reviews.map((review) => (
                    <div className="product-page__review" key={review.id}>
                        <div className="product-page__review-header">
                            <img
                                src="https://via.placeholder.com/50x50.png"
                                alt=""
                                className="product-page__review-avatar"
                            />
                            <p className="product-page__review-name">Иван И.</p>
                            <ProductRating rating={review.rating} />
                            <p className="product-page__review-date">
                                {formatDate(review.created_at)}
                            </p>
                        </div>
                        <p className="product-page__review-opinion">{`Мнение о товаре: ${review.recommendation}`}</p>
                        <p className="product-page__review-comments-title">
                            Достоинства
                        </p>
                        <p className="product-page__review-comments">
                            {review.pros}
                        </p>
                        <p className="product-page__review-comments-title">
                            Недостатки
                        </p>
                        <p className="product-page__review-comments">
                            {review.cons}
                        </p>
                        <p className="product-page__review-comments-title">
                            Комментарий
                        </p>
                        <p className="product-page__review-comments">
                            {review.comment}
                        </p>
                        <p className="product-page__review_helpful">
                            Вам помог этот отзыв?
                        </p>
                    </div>
                ))
            ) : (
                <p>Еще нет отзывов</p>
            )}
        </div>
    );
};

export default ProductReviews;
