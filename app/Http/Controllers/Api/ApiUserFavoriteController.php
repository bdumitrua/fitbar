<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Product;
use App\Models\User;
use App\Models\UserFavorite;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ApiUserFavoriteController extends Controller
{
    // Получение всех товаров из избранных
    public function index()
    {
        $user = User::find(Auth::id());
        $favorites = $user->favorites;

        return response()->json([
            'favorites' => $favorites
        ], 200);
    }

    // Добавление товара в избранное
    public function store(Product $product)
    {
        $user = User::find(Auth::id());

        // Проверка наличия товара в избранных
        if ($user->favorites()->where('product_id', $product->id)->exists()) {
            return response()->json([
                'message' => 'Product already in favorites'
            ], 400);
        }

        // Создание новой записи в избранных
        $favorite = UserFavorite::create([
            'user_id' => $user->id,
            'product_id' => $product->id
        ]);

        return response()->json([
            'message' => 'Product added to favorites',
            'favorite' => $favorite
        ], 201);
    }

    // Удаление товара из избранного
    public function destroy(Product $product)
    {
        $user = User::find(Auth::id());

        // Проверка наличия товара в избранных
        $favorite = $user->favorites()->where('product_id', $product->id)->first();
        if (!$favorite) {
            return response()->json([
                'message' => 'Product not in favorites'
            ], 400);
        }

        // Удаление записи из избранных
        $favorite->delete();

        return response()->json([
            'message' => 'Product removed from favorites'
        ], 200);
    }
}
