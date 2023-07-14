<?php

namespace Database\Seeders;

use App\Models\Review;
use App\Models\ReviewVote;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ReviewVoteSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run()
    {
        // Получаем всех пользователей и отзывы
        $users = User::all();
        $reviews = Review::all();

        // Проходим по каждому отзыву
        foreach ($reviews as $review) {
            // Выбираем случайное количество пользователей, которые проголосуют
            $voters = $users->random(rand(0, $users->count() / 4));

            // Каждый выбранный пользователь голосует
            foreach ($voters as $voter) {
                ReviewVote::create([
                    'user_id' => $voter->id,
                    'review_id' => $review->id,
                    // Случайно выбираем, положительный это отзыв или отрицательный
                    'vote' => rand(0, 1),
                ]);
            }
        }
    }
}
