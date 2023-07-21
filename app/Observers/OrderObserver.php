<?php

namespace App\Observers;

use App\Models\Order;

class OrderObserver
{
    public function created(Order $order)
    {
        $this->increaseProductSales($order);
    }

    public function updated(Order $order)
    {
        $this->increaseProductSales($order);
    }

    public function deleted(Order $order)
    {
        $this->decreaseProductSales($order);
    }

    protected function increaseProductSales(Order $order)
    {
        foreach ($order->products as $product) {
            $category = $product->category;

            // увеличиваем количество продаж для товара
            $product->increment('orders_count');

            // увеличиваем количество продаж для связанной категории
            $category->increment('orders_count');
        }
    }

    protected function decreaseProductSales(Order $order)
    {
        foreach ($order->products as $product) {
            $category = $product->category;

            // уменьшаем количество продаж для товара
            $product->decrement('orders_count');

            // уменьшаем количество продаж для связанной категории
            $category->decrement('orders_count');
        }
    }
}
