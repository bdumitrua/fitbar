<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Controllers\ReviewVoteController;
use App\Models\Product;
use App\Models\Review;
use App\Models\ReviewVote;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ApiReviewVoteController extends ReviewVoteController
{
    public function index()
    {
        $response = parent::index();

        return parent::MainResponseToJSON($response);
    }

    public function like(Review $review)
    {
        $response = parent::like($review);

        return parent::MainResponseToJSON($response);
    }

    public function dislike(Review $review)
    {
        $response = parent::dislike($review);

        return parent::MainResponseToJSON($response);
    }

    public function destroy(Review $review)
    {
        $response = parent::destroy($review);

        return parent::MainResponseToJSON($response);
    }
}
