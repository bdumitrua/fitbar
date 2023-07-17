<?php

namespace App\Http\Controllers;

use App\Models\Cart;
use App\Models\Order;
use App\Models\OrderProduct;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class OrderController extends Controller
{
    // Получение всех заказов текущего пользователя
    public function index()
    {
        return [
            'message' => Auth::user()->orders,
            'code' => 200
        ];
    }

    // Получение информации о конкретном заказе
    public function show(Order $order)
    {
        // Проверяем, принадлежит ли заказ текущему пользователю
        if (Auth::id() !== $order->user_id) {
            return [
                'error' => 'Access denied',
                'code' => 403
            ];
        }

        return [
            'message' => $order,
            'code' => 200
        ];
    }

    // Создание нового заказа
    public function store()
    {
        // Получаем корзину пользователя
        $cart = Auth::user()->cart;

        // Проверяем, есть ли что-то в корзине
        if (count($cart) == 0) {
            return [
                'error' => 'Cart is empty',
                'code' => 405
            ];
        }

        // Формируем массив продуктов и считаем общую стоимость заказа
        $total = 0;
        foreach ($cart as $item) {
            $product = Product::find($item['product_id']);
            if (!$product) {
                return [
                    'error' => 'Product ' . $item['product_id'] . ' not found',
                    'code' => 404
                ];
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

        return [
            'message' => $order,
            'code' => 200
        ];
    }
}
