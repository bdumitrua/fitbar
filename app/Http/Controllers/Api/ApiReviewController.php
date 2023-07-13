<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\ReviewRequest;
use App\Models\Category;
use App\Models\Review;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ApiReviewController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:api');
    }

    public function index()
    {
        $reviews = Review::all();
        return response()->json($reviews);
    }

    public function getProductReviews($id)
    {
        $reviews = Review::where('product_id', $id)->get();
        return response()->json([
            'product_id' => $id,
            'reviews' => $reviews
        ]);
    }

    public function getAverageRating($id)
    {
        $averageRating = Review::where('product_id', $id)->avg('rating');
        return response()->json([
            'product_id' => $id,
            'average_rating' => round($averageRating, 1)
        ]);
    }

    public function getCategoryReviews($id)
    {
        $productIds = Category::find($id)->products()->pluck('id');
        $averageRating = Review::whereIn('product_id', $productIds)->avg('rating');
        $reviews = Review::whereIn('product_id', $productIds)->get();
        return response()->json([
            'category_name' => Category::find($id)->name,
            'category_rating' => $averageRating,
            'reviews' => $reviews
        ]);
    }

    public function store(ReviewRequest $request)
    {
        $review = Review::create([
            'user_id' => Auth::id(),
            'product_id' => $request->product_id,
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

    public function update(Request $request, $id)
    {
        $review = Review::where('id', $id)->where('user_id', Auth::id())->first();

        if (!$review) {
            return response()->json([
                'status' => 'error',
                'message' => 'Review not found',
            ], 404);
        }

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

    public function destroy($id)
    {
        $review = Review::where('id', $id)->where('user_id', Auth::id())->first();

        if (!$review) {
            return response()->json([
                'status' => 'error',
                'message' => 'Review not found',
            ], 404);
        }

        $review->delete();

        return response()->json([
            'status' => 'success',
            'message' => 'Review successfully deleted',
        ]);
    }
}
