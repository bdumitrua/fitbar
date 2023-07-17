<?php

namespace App\Http\Controllers;

use App\Http\Requests\ReviewRequest;
use App\Models\Category;
use App\Models\Product;
use App\Models\Review;
use App\Models\User;
use Illuminate\Support\Facades\Auth;

class ReviewController extends Controller
{
    public function index()
    {
        return [
            'message' => Review::all(),
            'code' => 200
        ];
    }

    public function getProductReviews(Product $product)
    {
        return [
            'message' => Review::where('product_id', $product->id)->get(),
            'code' => 200
        ];
    }

    public function getAverageRating(Product $product)
    {
        $averageRating = Review::where('product_id', $product->id)->avg('rating');

        return [
            'message' => round($averageRating, 1),
            'code' => 200
        ];
    }

    public function getCategoryReviews(Category $category)
    {
        $productIds = $category->products()->pluck('id');
        $reviews = Review::whereIn('product_id', $productIds)->get();

        return [
            'message' => $reviews,
            'code' => 200
        ];
    }

    public function me()
    {
        $user = User::find(Auth::id());

        return [
            'message' => $user->reviews,
            'code' => 200
        ];
    }

    public function store(ReviewRequest $request, Product $product)
    {
        if ($product->reviews()->where('user_id', Auth::id())->count() >= 1) {
            return [
                'error' => 'You already reviewed about this product',
                'code' => 405
            ];
        }

        $review = Review::create([
            'user_id' => Auth::id(),
            'product_id' => $product->id,
            'rating' => $request->rating,
            'recommendation' => $request->recommendation,
            'pros' => $request->pros,
            'cons' => $request->cons,
            'comment' => $request->comment,
        ]);

        return [
            'message' => 'Review successfully created',
            'code' => 200
        ];
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
            return [
                'message' => 'access denied',
                'code' => 403
            ];
        }

        return [
            'message' => 'Review successfully updated',
            'code' => 200
        ];
    }

    public function destroy(Review $review)
    {
        $user = User::find(Auth::id());
        $reviewDeleteStatus = $user->reviews()->where('id', $review->id)->delete();

        if (!$reviewDeleteStatus) {
            return [
                'message' => 'access denied',
                'code' => 403
            ];
        }

        return [
            'message' => 'Review successfully deleted',
            'code' => 200
        ];
    }
}
