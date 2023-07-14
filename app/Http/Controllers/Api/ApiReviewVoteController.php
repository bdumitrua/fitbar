<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Product;
use App\Models\Review;
use App\Models\ReviewVote;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ApiReviewVoteController extends Controller
{
    public function index()
    {
        $user = User::find(Auth::id());

        return response()->json([
            'votes' => $user->reviewVotes
        ]);
    }

    public function like(Review $review)
    {
        // Получаем текущего пользователя
        $user = User::find(Auth::id());

        // Создаем отзыв 'like'
        ReviewVote::updateOrCreate(
            [
                'user_id' => $user->id,
                'review_id' => $review->id
            ],
            ['vote' => 1]
        );

        return response()->json([
            'message' => 'Successfully voted like for product.'
        ], 200);
    }

    public function dislike(Review $review)
    {
        // Получаем текущего пользователя
        $user = User::find(Auth::id());

        // Создаем отзыв 'dislike'
        ReviewVote::updateOrCreate(
            [
                'user_id' => $user->id,
                'review_id' => $review->id
            ],
            ['vote' => 0]
        );

        return response()->json([
            'message' => 'Successfully voted dislike for product.'
        ], 200);
    }

    public function destroy(Review $review)
    {
        // Получаем текущего пользователя
        $user = User::find(Auth::id());

        $user->reviewVotes()->where('review_id', $review->id)->delete();

        return response()->json($user->reviewVotes);
    }
}
