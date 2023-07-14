<?php

namespace Database\Seeders;

use App\Models\Product;
use App\Models\User;
use App\Models\UserFavorite;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class UserFavoriteSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $users = User::all();
        $products = Product::all();

        foreach ($users as $user) {
            $randomProducts = $products->random(rand(2, 6))->pluck('id');

            foreach ($randomProducts as $productId) {
                UserFavorite::factory()->create([
                    'user_id' => $user->id,
                    'product_id' => $productId,
                ]);
            }
        }
    }
}
