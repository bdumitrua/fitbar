<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Controllers\OrderController;
use App\Models\Cart;
use App\Models\Order;
use App\Models\OrderProduct;
use App\Models\Product;
use App\Models\User;
use App\Services\OrderService;
use Illuminate\Support\Facades\Auth;

class ApiOrderController extends Controller
{
    private $orderService;

    public function __construct(OrderService $orderService)
    {
        $this->orderService = $orderService;
    }
    // Получение всех заказов текущего пользователя
    public function index()
    {
        return $this->handleServiceCall(function () {
            return $this->orderService->index();
        });
    }

    // Получение информации о конкретном заказе
    public function show(Order $order)
    {
        return $this->handleServiceCall(function () use ($order) {
            return $this->orderService->show($order);
        });
    }

    // Создание нового заказа
    public function store()
    {
        return $this->handleServiceCall(function () {
            return $this->orderService->store();
        });
    }
}
