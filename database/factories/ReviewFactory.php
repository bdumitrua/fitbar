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
            'user_id' => User::all()->random(),
            'product_id' => Product::all()->random(),
            'rating' => fake()->numberBetween(2, 5),
            'recommendation' => fake()->randomElement(['Не рекомендую', 'Рекомендую']),
            'pros' => fake()->word(10, true),
            'cons' => fake()->word(10, true),
            'comment' => fake()->word(60, true),
        ];
    }
}
