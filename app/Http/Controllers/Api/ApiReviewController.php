<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\ReviewRequest;
use App\Models\Category;
use App\Models\Product;
use App\Models\Review;
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

    // TODO
    // Проверить, не оставлял ли пользователь уже отзыв на этот товар (можно исправить связь в таблице тогда уж)
    public function store(ReviewRequest $request, Product $product)
    {
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

    // TODO 
    // Проверить тот же пользователь удаляет или нет
    public function update(Request $request, Review $review)
    {
        $review->update([
            'rating' => $request->rating,
            'recommendation' => $request->recommendation,
            'pros' => $request->pros,
            'cons' => $request->cons,
            'comment' => $request->comment
        ]);

        return response()->json([
            'status' => 'success',
            'message' => 'Review successfully updated',
            'review' => $review,
        ]);
    }

    // TODO
    // Проверить мой ли отзыв
    public function destroy(Review $review)
    {
        $review->delete();

        return response()->json([
            'status' => 'success',
            'message' => 'Review successfully deleted',
        ]);
    }
}
