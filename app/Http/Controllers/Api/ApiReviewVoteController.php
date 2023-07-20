<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Review;
use App\Services\ReviewVoteService;

class ApiReviewVoteController extends Controller
{
    private $reviewVoteService;

    public function __construct(ReviewVoteService $reviewVoteService)
    {
        $this->reviewVoteService = $reviewVoteService;
    }

    public function index()
    {
        return $this->handleServiceCall(function () {
            return $this->reviewVoteService->index();
        });
    }

    public function like(Review $review)
    {
        return $this->handleServiceCall(function () use ($review) {
            return $this->reviewVoteService->like($review);
        });
    }

    public function dislike(Review $review)
    {
        return $this->handleServiceCall(function () use ($review) {
            return $this->reviewVoteService->like($review);
        });
    }

    public function destroy(Review $review)
    {
        return $this->handleServiceCall(function () use ($review) {
            return $this->reviewVoteService->like($review);
        });
    }
}
