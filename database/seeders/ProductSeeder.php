<?php

namespace Database\Seeders;

use App\Models\Category;
use App\Models\Product;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class ProductSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */

    public function run()
    {
        // список категорий
        $categories = [
            'Протеин',
            'Витамины',
            'Жиры',
            'Аминокислоты',
            'Креатин',
            'Энергетики',
        ];

        // создание категорий
        foreach ($categories as $categoryName) {
            Category::create(['name' => $categoryName, 'slug' => Str::slug($categoryName)]);
        }

        Product::factory(30)->create(); // создать 30 случайных товаров
    }
}
