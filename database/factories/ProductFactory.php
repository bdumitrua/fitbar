<?php

namespace Database\Factories;

use App\Models\Category;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Product>
 */
class ProductFactory extends Factory
{
    /** 
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'image' => fake()->imageUrl(), // случайное изображение
            'name' => fake()->words(3, true), // случайное название товара
            'price' => fake()->randomFloat(2, 1, 1000), // случайная цена
            'rating' => fake()->randomFloat(1, 0, 5), // случайный рейтинг
            'short_description' => fake()->words(15, true), // краткое описание
            'long_description' => fake()->words(150, true), // длинное описание
            'category_id' => function () {
                return Category::all()->random(); // случайная категория
            }
        ];
    }
}
