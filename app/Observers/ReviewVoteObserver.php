<?php

namespace App\Observers;

use App\Models\Review;
use App\Models\ReviewVote;

class ReviewVoteObserver
{
    /**
     * Handle the review vote "created" event.
     *
     * @param  \App\Models\ReviewVote  $reviewVote
     * @return void
     */
    public function created(ReviewVote $reviewVote)
    {
        $this->updateReviewHelpfulCounts($reviewVote->review);
    }

    /**
     * Handle the review vote "updated" event.
     *
     * @param  \App\Models\ReviewVote  $reviewVote
     * @return void
     */
    public function updated(ReviewVote $reviewVote)
    {
        $this->updateReviewHelpfulCounts($reviewVote->review);
    }

    /**
     * Handle the review vote "deleted" event.
     *
     * @param  \App\Models\ReviewVote  $reviewVote
     * @return void
     */
    public function deleted(ReviewVote $reviewVote)
    {
        $this->updateReviewHelpfulCounts($reviewVote->review);
    }

    /**
     * Update the helpful_yes and helpful_no counts for a review.
     *
     * @param  \App\Models\Review  $review
     * @return void
     */
    private function updateReviewHelpfulCounts(Review $review)
    {
        $review->update([
            'helpful_no' => $review->votes()->where('vote', 0)->count(),
            'helpful_yes' => $review->votes()->where('vote', 1)->count(),
        ]);
    }
}
