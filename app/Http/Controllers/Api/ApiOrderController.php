<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Controllers\OrderController;
use App\Models\Cart;
use App\Models\Order;
use App\Models\OrderProduct;
use App\Models\Product;
use App\Models\User;
use Illuminate\Support\Facades\Auth;

class ApiOrderController extends OrderController
{
    // Получение всех заказов текущего пользователя
    public function index()
    {
        $response = parent::index();

        return parent::MainResponseToJSON($response);
    }

    // Получение информации о конкретном заказе
    public function show(Order $order)
    {
        $response = parent::show($order);

        return parent::MainResponseToJSON($response);
    }

    // Создание нового заказа
    public function store()
    {
        $response = parent::store();

        return parent::MainResponseToJSON($response);
    }
}
