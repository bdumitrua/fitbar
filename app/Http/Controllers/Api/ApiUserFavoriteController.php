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
    public function store($product_id)
    {
        $user = User::find(Auth::id());

        if (!Product::find($product_id)) {
            return response()->json([
                'message' => 'Product not found'
            ], 400);
        }

        // Проверка наличия товара в избранных
        if ($user->favorites()->where('product_id', $product_id)->exists()) {
            return response()->json([
                'message' => 'Product already in favorites'
            ], 400);
        }

        // Создание новой записи в избранных
        $favorite = UserFavorite::create([
            'user_id' => $user->id,
            'product_id' => $product_id
        ]);

        return response()->json([
            'message' => 'Product added to favorites',
            'favorite' => $favorite
        ], 201);
    }

    // Удаление товара из избранного
    public function destroy($product_id)
    {
        $user = User::find(Auth::id());

        // Проверка наличия товара в избранных
        $favorite = $user->favorites()->where('product_id', $product_id)->first();
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
