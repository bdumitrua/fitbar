<?php

namespace Database\Seeders;

use App\Models\Category;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class CategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // список категорий
        $categories = [
            'Жиры',
            'Витамины',
            'Аминокислоты',
            'Батончики и снэки',
            'Протеин',
            'Креатин',
            'Напитки',
            'Предтрен',
        ];

        // создание категорий
        foreach ($categories as $categoryName) {
            Category::create(['name' => $categoryName, 'slug' => Str::slug($categoryName)]);
        }
    }
}
