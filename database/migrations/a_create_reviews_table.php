<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('reviews', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('user_id');
            $table->unsignedBigInteger('product_id');
            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
            $table->foreign('product_id')->references('id')->on('products')->onDelete('cascade');
            $table->integer('rating')->default(5);  // оценка от 1 до 5
            $table->enum('recommendation', ['Не рекомендую', 'Рекомендую']);
            $table->text('pros')->nullable(); // достоинства
            $table->text('cons')->nullable(); // недостатки
            $table->text('comment')->nullable();
            $table->integer('helpful_yes')->default(0);
            $table->integer('helpful_no')->default(0);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('reviews');
    }
};
