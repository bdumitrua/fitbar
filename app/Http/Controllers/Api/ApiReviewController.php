<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\ReviewRequest;
use App\Models\Category;
use App\Models\Product;
use App\Models\Review;
use App\Services\ReviewService;

class ApiReviewController extends Controller
{
    private $reviewService;

    public function __construct(ReviewService $reviewService)
    {
        $this->reviewService = $reviewService;
    }

    public function index()
    {
        return $this->handleServiceCall(function () {
            return $this->reviewService->index();
        });
    }

    public function getProductReviews(Product $product)
    {
        return $this->handleServiceCall(function () use ($product) {
            return $this->reviewService->getProductReviews($product);
        });
    }

    public function getAverageRating(Product $product)
    {
        return $this->handleServiceCall(function () use ($product) {
            return $this->reviewService->getAverageRating($product);
        });
    }

    public function getCategoryReviews(Category $category)
    {
        return $this->handleServiceCall(function () use ($category) {
            return $this->reviewService->getCategoryReviews($category);
        });
    }

    public function me()
    {
        return $this->handleServiceCall(function () {
            return $this->reviewService->me();
        });
    }

    public function store(ReviewRequest $request, Product $product)
    {
        return $this->handleServiceCall(function () use ($request, $product) {
            return $this->reviewService->store($request, $product);
        });
    }

    public function update(ReviewRequest $request, Review $review)
    {
        return $this->handleServiceCall(function () use ($request, $review) {
            return $this->reviewService->update($request, $review);
        });
    }

    public function destroy(Review $review)
    {
        return $this->handleServiceCall(function () use ($review) {
            return $this->reviewService->destroy($review);
        });
    }
}
