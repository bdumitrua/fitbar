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
            // Генерация самих ролей в 'roles'
            RoleSeeder::class,
            // Юзеры в сидере получают роли
            UserSeeder::class,

            CategorySeeder::class,
            // Продукты получают категории
            ProductSeeder::class,
            // Отзывы оставляются на продукты от имени пользователей
            ReviewSeeder::class,
        ]);
    }
}
