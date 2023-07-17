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
        $response = parent::index();

        return parent::MainResponseToJSON($response);
    }

    public function getProductReviews(Product $product)
    {
        $response = parent::getProductReviews($product);

        return parent::MainResponseToJSON($response);
    }

    public function getAverageRating(Product $product)
    {
        $response = parent::getAverageRating($product);

        return parent::MainResponseToJSON($response);
    }

    public function getCategoryReviews(Category $category)
    {
        $response = parent::getCategoryReviews($category);

        return parent::MainResponseToJSON($response);
    }

    public function me()
    {
        $response = parent::me();

        return parent::MainResponseToJSON($response);
    }

    public function store(ReviewRequest $request, Product $product)
    {
        $response = parent::store($request, $product);

        return parent::MainResponseToJSON($response);
    }

    public function update(ReviewRequest $request, Review $review)
    {
        $response = parent::update($request, $review);

        return parent::MainResponseToJSON($response);
    }

    public function destroy(Review $review)
    {
        $response = parent::destroy($review);

        return parent::MainResponseToJSON($response);
    }
}
