<?php

namespace Database\Seeders;

use App\Models\Product;
use App\Models\Review;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ReviewSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Получаем всех пользователей и продукты
        $users = User::all();
        $products = Product::all();

        // Проходим по каждому продукту
        foreach ($products as $product) {
            // Выбираем случайное количество пользователей, которые оставят отзыв
            $reviewers = $users->random(rand(1, $users->count() / 4));

            // Каждый выбранный пользователь оставляет отзыв
            foreach ($reviewers as $reviewer) {
                // Генерируем случайный отзыв
                Review::create([
                    'user_id' => $reviewer->id,
                    'product_id' => $product->id,
                    'created_at' => fake()->dateTime(),
                    'rating' => fake()->numberBetween(1, 5),
                    'recommendation' => fake()->randomElement(['Не рекомендую', 'Рекомендую']),
                    'pros' => fake()->sentence(),
                    'cons' => fake()->sentence(),
                    'comment' => fake()->paragraph(),
                    'helpful_yes' => 0,
                    'helpful_no' => 0,
                ]);
            }
        }
    }
}
