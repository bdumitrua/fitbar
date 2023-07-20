<?php

namespace App\Services;

use App\Models\Product;
use App\Models\User;
use App\Models\UserFavorite;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpKernel\Exception\HttpException;

class UserFavoriteService
{
    // Получение всех товаров из избранных
    public function index()
    {
        $user = User::find(Auth::id());

        return $user->favorites;
    }

    // Добавление товара в избранное
    public function store(Product $product)
    {
        $user = User::find(Auth::id());

        if ($user->favorites()->where('product_id', $product->id)->exists()) {
            throw new HttpException(Response::HTTP_CONFLICT, 'Product already in favorites');
        }

        UserFavorite::create([
            'user_id' => $user->id,
            'product_id' => $product->id
        ]);
    }

    // Удаление товара из избранного
    public function destroy(Product $product)
    {
        $user = User::find(Auth::id());

        $favorite = $user->favorites()->where('product_id', $product->id)->first();
        if (!$favorite) {
            throw new HttpException(Response::HTTP_NOT_FOUND, 'Product not found in favorites');
        }

        $favorite->delete();
    }
}
