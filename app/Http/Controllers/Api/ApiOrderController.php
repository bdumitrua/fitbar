<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\OrderStatusRequest;
use App\Models\Order;
use App\Services\OrderService;

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

    // Получение всех заказов для админки
    public function all()
    {
        return $this->handleServiceCall(function () {
            return $this->orderService->all();
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

    // Изменение статуса заказа
    public function update(OrderStatusRequest $request, Order $order)
    {
        return $this->handleServiceCall(function () use ($request, $order) {
            return $this->orderService->update($request, $order);
        });
    }
}
