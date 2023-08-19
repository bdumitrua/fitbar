import { useEffect, useState } from "react";
import ProductRating from "../../../components/ProductRating/ProductRating";
import axiosInstance from "../../../utils/axios/instance";
import { useMainContext } from "../../../utils/providers/main.provider";
import "../ProductPage.scss";
import ProductReviewButtons from "./ProductReviewButtons";

const ProductReviews = ({ reviews }) => {
    const { formatDate } = useMainContext();
    const [data, setData] = useState(null);

    const handleLike = async (reviewId) => {
        try {
            await axiosInstance.post(`/reviews/votes/like/${reviewId}`);
        } catch (error) {
            console.error("Ошибка при лайке отзыва", error);
        }
    };

    const handleDislike = async (reviewId) => {
        try {
            await axiosInstance.post(`/reviews/votes/dislike/${reviewId}`);
        } catch (error) {
            console.error("Ошибка при дизлайке отзыва", error);
        }
    };

    const handleRemoveVote = async (reviewId) => {
        try {
            await axiosInstance.delete(`/reviews/votes/remove/${reviewId}`);
        } catch (error) {
            console.error("Ошибка при отмене оценки отзыва", error);
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axiosInstance.get(`/reviews/votes/`);
                console.log(response.data.votes);
                setData(response.data.votes);
            } catch (error) {
                console.error("Произошла ошибка при выполнении запроса", error);
            }
        };

        fetchData();
    }, []);

    return (
        <div className="product-page__reviews">
            {reviews && data ? (
                reviews.map((review) => (
                    <div className="product-page__review" key={review.id}>
                        <div className="product-page__review-header">
                            <img
                                src="https://via.placeholder.com/50x50.png"
                                alt=""
                                className="product-page__review-avatar"
                            />
                            <p className="product-page__review-name">Иван И.</p>
                            <div className="product-page__review-header-right">
                                <ProductRating rating={review.rating} />
                                <p className="product-page__review-date">
                                    {formatDate(review.created_at)}
                                </p>
                            </div>
                        </div>
                        <div className="product-page__review-opinion">
                            Мнение о товаре:{" "}
                            <p className="grey">{review.recommendation}</p>
                        </div>
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
                        <ProductReviewButtons
                            reviewId={review.id}
                            onLike={handleLike}
                            onDislike={handleDislike}
                            onRemoveVote={handleRemoveVote}
                            likes={review.helpful_yes}
                            dislikes={review.helpful_no}
                            isVote={data.some(
                                (item) => item.review_id === review.id
                            )}
                        />
                    </div>
                ))
            ) : (
                <p>Еще нет отзывов</p>
            )}
        </div>
    );
};

export default ProductReviews;
