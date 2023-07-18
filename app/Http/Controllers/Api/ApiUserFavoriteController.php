<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\UserFavoriteController;
use App\Models\Product;
use App\Models\User;
use App\Models\UserFavorite;
use Illuminate\Support\Facades\Auth;

class ApiUserFavoriteController extends UserFavoriteController
{
    // Получение всех товаров из избранных
    public function index()
    {
        $response = parent::index();

        return parent::MainResponseToJSON($response);
    }

    // Добавление товара в избранное
    public function store(Product $product)
    {
        $response = parent::store($product);

        return parent::MainResponseToJSON($response);
    }

    // Удаление товара из избранного
    public function destroy(Product $product)
    {
        $response = parent::destroy($product);

        return parent::MainResponseToJSON($response);
    }
}
