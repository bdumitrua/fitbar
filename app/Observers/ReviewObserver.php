<?php

namespace App\Observers;

use App\Models\Review;

class ReviewObserver
{
    public function created(Review $review)
    {
        $this->updateProductRating($review);
    }

    public function updated(Review $review)
    {
        $this->updateProductRating($review);
    }

    public function deleted(Review $review)
    {
        $this->updateProductRating($review);
    }

    protected function updateProductRating(Review $review)
    {
        $product = $review->product;
        $rating = $product->reviews->average('rating');
        $product->update(['rating' => $rating]);
    }
}
