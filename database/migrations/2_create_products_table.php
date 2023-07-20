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
        Schema::create('products', function (Blueprint $table) {
            $table->id();
            $table->string('image'); // Фото
            $table->string('name'); // Название товара
            $table->decimal('price', 8, 2); // Цена
            $table->text('short_description'); // Краткое описание
            $table->string('taste')->default('Обычный'); // Вкус продукта
            $table->string('weight')->default('100 г.'); // Вес/объём упаковки
            $table->longText('long_description'); // Длинное описание
            $table->unsignedBigInteger('category_id'); // Категория
            $table->integer('orders_count')->default(0); // Кол-во покупок
            $table->decimal('rating', 8, 2)->default(0)->min(0)->max(5); // Рейтинг
            $table->timestamps();

            $table->foreign('category_id')->references('id')->on('categories')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('products');
    }
};
