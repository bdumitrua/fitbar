<?php

namespace App\Services;

use App\Http\Requests\OrderStatusRequest;
use App\Models\Cart;
use App\Models\Order;
use App\Models\OrderProduct;
use App\Models\Product;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpKernel\Exception\HttpException;

class OrderService
{
    // Получение всех заказов текущего пользователя
    public function index()
    {
        return User::find(Auth::id())->orders()->paginate(10);
    }

    // Получение всех заказов для админки
    public function all()
    {
        $statusOrder = [
            'pending',
            'processing',
            'shipped',
            'delivered',
            'cancelled',
        ];

        // Сортировка заказов по статусу в заданном порядке
        return Order::orderByRaw('FIELD(status, "' . implode('","', $statusOrder) . '")')->paginate(10);
    }

    // Получение информации о конкретном заказе
    public function show(Order $order)
    {
        $user = Auth::user();
        $order->products = $order->products()->pluck('product_id')->all();

        // Проверяем, принадлежит ли заказ текущему пользователю
        if ($user->maxRole >= 3) {
            return $order;
        }

        if ($user->id !== $order->user->id) {
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

            $product->category->increment('orders_count');
            $product->increment('orders_count');

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

    public function update(OrderStatusRequest $request, Order $order)
    {
        $order->update([
            'status' => $request->status
        ]);
    }
}
