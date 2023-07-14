<?php

namespace Database\Seeders;

use App\Models\RoleUser;
use Illuminate\Database\Seeder;
use App\Models\User;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        // Создаем пользователей
        User::factory()->count(50)->create()->each(function ($user) {

            // Создаем роль для каждого пользователя
            RoleUser::create([
                'user_id' => $user->id,
                'role_id' => 1
            ]);
        });
    }
}
