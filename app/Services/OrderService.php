<?php

namespace App\Services;

use App\Models\Cart;
use App\Models\Order;
use App\Models\OrderProduct;
use App\Models\Product;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpKernel\Exception\HttpException;

class OrderService
{
    // Получение всех заказов текущего пользователя
    public function index()
    {
        return Auth::user()->orders;
    }

    // Получение информации о конкретном заказе
    public function show(Order $order)
    {
        // Проверяем, принадлежит ли заказ текущему пользователю
        if (Auth::id() !== $order->user_id) {
            throw new HttpException(Response::HTTP_FORBIDDEN, 'Access denied');
        }

        return $order;
    }

    // Создание нового заказа
    public function store()
    {
        // Получаем корзину пользователя
        $cart = Auth::user()->cart;

        // Проверяем, есть ли что-то в корзине
        if (count($cart) == 0) {
            throw new HttpException(Response::HTTP_CONFLICT, 'Cart is empty');
        }

        // Формируем массив продуктов и считаем общую стоимость заказа
        $total = 0;
        foreach ($cart as $item) {
            $product = Product::find($item['product_id']);

            if (!$product) {
                throw new HttpException(Response::HTTP_NOT_FOUND, 'Product ' . $item['product_id'] . ' not found');
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

        return $order;
    }
}
