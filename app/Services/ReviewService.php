<?php

namespace App\Services;

use App\Http\Requests\ReviewRequest;
use App\Models\Category;
use App\Models\Product;
use App\Models\Review;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpKernel\Exception\HttpException;

class ReviewService
{
    public function index()
    {
        return Review::all();
    }

    public function getProductReviews(Product $product)
    {
        return Review::where('product_id', $product->id)->get();
    }

    public function getAverageRating(Product $product)
    {
        $averageRating = Review::where('product_id', $product->id)->avg('rating');

        return round($averageRating, 1);
    }

    public function getCategoryReviews(Category $category)
    {
        $productIds = $category->products()->pluck('id');

        return Review::whereIn('product_id', $productIds)->get();
    }

    public function me()
    {
        $user = User::find(Auth::id());

        return $user->reviews;
    }

    public function store(ReviewRequest $request, Product $product)
    {
        if ($product->reviews()->where('user_id', Auth::id())->count() >= 1) {
            throw new HttpException(Response::HTTP_CONFLICT, 'You already reviewed about this product');
        }

        Review::create([
            'user_id' => Auth::id(),
            'product_id' => $product->id,
            'rating' => $request->rating,
            'recommendation' => $request->recommendation,
            'pros' => $request->pros,
            'cons' => $request->cons,
            'comment' => $request->comment,
        ]);
    }

    public function update(ReviewRequest $request, Review $review)
    {
        $user = User::find(Auth::id());

        $reviewUpdateStatus = $user->reviews()->where('id', $review->id)->update([
            'rating' => $request->rating,
            'recommendation' => $request->recommendation,
            'pros' => $request->pros,
            'cons' => $request->cons,
            'comment' => $request->comment
        ]);

        if (!$reviewUpdateStatus) {
            throw new HttpException(Response::HTTP_NOT_FOUND, 'Review not found');
        }
    }

    public function destroy(Review $review)
    {
        $user = User::find(Auth::id());
        $reviewDeleteStatus = $user->reviews()->where('id', $review->id)->delete();

        if (!$reviewDeleteStatus) {
            throw new HttpException(Response::HTTP_NOT_FOUND, 'Review not found');
        }
    }
}
