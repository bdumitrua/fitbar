<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run()
    {
        $this->call([
            RoleSeeder::class,
            // Зависит от ролей
            UserSeeder::class,

            CategorySeeder::class,
            // Зависит от категорий
            ProductSeeder::class,

            // Зависит от пользователей и продуктов
            ReviewSeeder::class,

            // Зависит от пользователей и продуктов
            UserFavoriteSeeder::class
        ]);
    }
}
