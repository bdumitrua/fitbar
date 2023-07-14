<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Cart;
use App\Models\Order;
use App\Models\OrderProduct;
use App\Models\Product;
use App\Models\User;
use Illuminate\Support\Facades\Auth;

class ApiOrderController extends Controller
{
    // Получение всех заказов текущего пользователя
    public function index()
    {
        $orders = Auth::user()->orders;

        return response()->json([
            'status' => 'success',
            'orders' => $orders
        ], 200);
    }

    // Получение информации о конкретном заказе
    public function show($id)
    {
        $order = Order::find($id);

        // Проверяем, принадлежит ли заказ текущему пользователю
        if ($order && Auth::id() !== $order->user_id) {
            return response()->json([
                'status' => 'error',
                'message' => 'Access denied'
            ], 403);
        }

        return response()->json([
            'status' => 'success',
            'order' => $order
        ], 200);
    }

    // Создание нового заказа
    public function store()
    {
        // Получаем корзину пользователя
        $cart = Auth::user()->cart;
        // Проверяем, есть ли что-то в корзине
        if (empty($cart)) {
            return response()->json([
                'status' => 'error',
                'message' => 'Cart is empty'
            ], 400);
        }

        // Формируем массив продуктов и считаем общую стоимость заказа
        $total = 0;
        foreach ($cart as $item) {
            $product = Product::find($item['product_id']);
            if (!$product) {
                return response()->json([
                    'status' => 'error',
                    'message' => 'Product not ' . $item['product_id'] . ' found'
                ], 404);
            }

            $total += $product->price * $item['quantity'];
        }

        // Создаем новый заказ
        $order = Order::create([
            'user_id' => Auth::id(),
            'total_quantity' => count($cart),
            'total_price' => $total,
        ]);

        // Добавляем продукты в заказ
        foreach ($cart as $item) {
            $product = Product::find($item['product_id']);
            OrderProduct::create([
                'order_id' => $order->id,
                'product_id' => $product->id,
                'quantity' => $item['quantity'],
                'price' => $product->price
            ]);
        }

        // Очищаем корзину
        Cart::where('user_id', Auth::id())->delete();

        return response()->json([
            'status' => 'success',
            'order' => $order
        ], 200);
    }
}
