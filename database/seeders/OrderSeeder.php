<?php

namespace Database\Seeders;

use App\Models\Order;
use App\Models\OrderProduct;
use App\Models\Product;
use App\Models\User;
use Illuminate\Database\Seeder;

class OrderSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */

    // Получаем всех пользователей и продукты

    public function run(): void
    {
        $users = User::all();
        $products = Product::all();

        Order::factory()
            ->count(20)
            ->create(function () use ($users) {
                return ['user_id' => $users->random()->id];
            })
            ->each(function ($order) use ($products) {
                $orderProducts = OrderProduct::factory()
                    ->count(random_int(2, 7))
                    ->for($order)
                    ->create(function () use ($products) {
                        $product = $products->random();
                        return [
                            'product_id' => $product->id,
                            'price' => $product->price
                        ];
                    });

                $total_price = $orderProducts->sum(function ($orderProduct) {
                    return $orderProduct->price * $orderProduct->quantity;
                });

                $total_quantity = $orderProducts->sum('quantity');

                $order->update(['total_price' => $total_price, 'total_quantity' => $total_quantity]);
            });
    }
}
