<?php

namespace App\Services;

use App\Models\Review;
use App\Models\ReviewVote;
use App\Models\User;
use Illuminate\Support\Facades\Auth;

class ReviewVoteService
{
    public function index()
    {
        $user = User::find(Auth::id());

        return $user->reviewVotes;
    }

    public function like(Review $review)
    {
        $user = User::find(Auth::id());

        ReviewVote::updateOrCreate(
            [
                'user_id' => $user->id,
                'review_id' => $review->id
            ],
            ['vote' => 1]
        );
    }

    public function dislike(Review $review)
    {
        $user = User::find(Auth::id());

        ReviewVote::updateOrCreate(
            [
                'user_id' => $user->id,
                'review_id' => $review->id
            ],
            ['vote' => 0]
        );
    }

    public function destroy(Review $review)
    {
        $user = User::find(Auth::id());

        $user->reviewVotes()->where('review_id', $review->id)->delete();
    }
}
