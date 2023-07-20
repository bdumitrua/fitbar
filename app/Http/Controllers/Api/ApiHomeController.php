<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Services\HomeService;
use Illuminate\Http\Request;

class ApiHomeController extends Controller
{
    private $homeService;

    public function __construct(HomeService $homeService)
    {
        $this->homeService = $homeService;
    }

    public function bestsallers()
    {
        return $this->handleServiceCall(function () {
            return $this->homeService->bestsallers();
        });
    }

    public function categories()
    {
        return $this->handleServiceCall(function () {
            return $this->homeService->getMainCategoriesProducts();
        });
    }
}
