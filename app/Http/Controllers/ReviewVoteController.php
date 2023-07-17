<?php

namespace App\Http\Controllers;

use App\Models\Review;
use App\Models\ReviewVote;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ReviewVoteController extends Controller
{
    public function index()
    {
        $user = User::find(Auth::id());

        return [
            'message' => $user->reviewVotes,
            'code' => 200
        ];
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

        return [
            'message' => 'Successfully voted like review.',
            'code' => 200
        ];
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

        return [
            'message' => 'Successfully voted dislike review.',
            'code' => 200
        ];
    }

    public function destroy(Review $review)
    {
        // Получаем текущего пользователя
        $user = User::find(Auth::id());

        $user->reviewVotes()->where('review_id', $review->id)->delete();

        return [
            'message' => 'Review vote successfully removed',
            'code' => 200
        ];
    }
}
