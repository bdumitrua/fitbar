<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Controllers\UserFavoriteController;
use App\Models\Product;
use App\Models\User;
use App\Models\UserFavorite;
use App\Services\UserFavoriteService;
use Illuminate\Support\Facades\Auth;

class ApiUserFavoriteController extends Controller
{
    private $userFavoriteService;

    public function __construct(UserFavoriteService $userFavoriteService)
    {
        $this->userFavoriteService = $userFavoriteService;
    }

    // Получение всех товаров из избранных
    public function index()
    {
        return $this->handleServiceCall(function () {
            return $this->userFavoriteService->index();
        });
    }

    // Добавление товара в избранное
    public function store(Product $product)
    {
        return $this->handleServiceCall(function () use ($product) {
            return $this->userFavoriteService->store($product);
        });
    }

    // Удаление товара из избранного
    public function destroy(Product $product)
    {
        return $this->handleServiceCall(function () use ($product) {
            return $this->userFavoriteService->destroy($product);
        });
    }
}
