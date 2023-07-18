<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\User;
use App\Models\UserFavorite;
use Illuminate\Support\Facades\Auth;

class UserFavoriteController extends Controller
{
    // Получение всех товаров из избранных
    public function index()
    {
        $user = User::find(Auth::id());

        return [
            'message' => $user->favorites,
            'code' => 200
        ];
    }

    // Добавление товара в избранное
    public function store(Product $product)
    {
        $user = User::find(Auth::id());

        // Проверка наличия товара в избранных
        if ($user->favorites()->where('product_id', $product->id)->exists()) {
            return [
                'error' => 'Product already in favorites',
                'code' => 405
            ];
        }

        // Создание новой записи в избранных
        UserFavorite::create([
            'user_id' => $user->id,
            'product_id' => $product->id
        ]);

        return [
            'message' => 'Product added to favorites',
            'code' => 200
        ];
    }

    // Удаление товара из избранного
    public function destroy(Product $product)
    {
        $user = User::find(Auth::id());

        // Проверка наличия товара в избранных
        $favorite = $user->favorites()->where('product_id', $product->id)->first();
        if (!$favorite) {
            return [
                'error' => 'Product not in favorites',
                'code' => 405
            ];
        }

        // Удаление записи из избранных
        $favorite->delete();

        return [
            'message' => 'Product removed from favorites',
            'code' => 200
        ];
    }
}
