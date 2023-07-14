<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\ReviewRequest;
use App\Models\Category;
use App\Models\Product;
use App\Models\Review;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ApiReviewController extends Controller
{
    public function index()
    {
        $reviews = Review::all();
        return response()->json($reviews);
    }

    public function getProductReviews(Product $product)
    {
        $reviews = Review::where('product_id', $product->id)->get();
        return response()->json([
            'product_id' => $product->id,
            'reviews' => $reviews
        ]);
    }

    public function getAverageRating(Product $product)
    {
        $averageRating = Review::where('product_id', $product->id)->avg('rating');
        return response()->json([
            'product_id' => $product->id,
            'average_rating' => round($averageRating, 1)
        ]);
    }

    public function getCategoryReviews(Category $category)
    {
        $productIds = $category->products()->pluck('id');

        $averageRating = Review::whereIn('product_id', $productIds)->avg('rating');
        $reviews = Review::whereIn('product_id', $productIds)->get();

        return response()->json([
            'category_name' => $category->name,
            'category_rating' => $averageRating,
            'reviews' => $reviews
        ]);
    }

    public function me()
    {
        $user = User::find(Auth::id());
        return response()->json($user->reviews, 200);
    }

    public function store(ReviewRequest $request, Product $product)
    {
        if ($product->reviews()->where('user_id', Auth::id())->count() >= 1) {
            return response()->json([
                'message' => 'You already reviewed about this product'
            ], 403);
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

        return response()->json([
            'status' => 'success',
            'message' => 'Review successfully created',
            'review' => $review,
        ]);
    }

    public function update(Request $request, Review $review)
    {
        $user = User::find(Auth::id());
        $review = $user->reviews()->where('id', $review->id)->update([
            'rating' => $request->rating,
            'recommendation' => $request->recommendation,
            'pros' => $request->pros,
            'cons' => $request->cons,
            'comment' => $request->comment
        ]);

        if (!$review) {
            return response()->json([
                'message' => 'access denied'
            ], 403);
        }

        return response()->json([
            'status' => 'success',
            'message' => 'Review successfully updated'
        ], 200);
    }

    public function destroy(Review $review)
    {
        $user = User::find(Auth::id());
        $review = $user->reviews()->where('id', $review->id)->delete();

        if (!$review) {
            return response()->json([
                'message' => 'access denied'
            ], 403);
        }

        return response()->json([
            'status' => 'success',
            'message' => 'Review successfully deleted'
        ], 200);
    }
}
