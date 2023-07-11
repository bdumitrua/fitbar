<?php

namespace Database\Factories;

use App\Models\Product;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Review>
 */
class ReviewFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'user_id' => function () {
                return User::all()->random(); // случайный пользователь
            },

            'product_id' => function () {
                return Product::all()->random(); // случайный продукт
            },

            'created_at' => fake()->dateTime(), // случайная дата создания
            'rating' => fake()->numberBetween(1, 5), // случайный рейтинг
            'recommendation' => fake()->randomElement(['Рекомендую', 'Не рекомендую']), // случайное общее мнение
            'pros' => fake()->sentence(), // случайные достоинства
            'cons' => fake()->sentence(), // случайные недостатки
            'comment' => fake()->paragraph(), // случайный комментарий
            'helpful_yes' => fake()->numberBetween(0, 100), // случайное количество положительных оценок
            'helpful_no' => fake()->numberBetween(0, 100), // случайное количество отрицательных оценок
        ];
    }
}
