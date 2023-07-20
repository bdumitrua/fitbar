<?php

namespace App\Services;

use App\Models\Category;
use App\Models\Product;

class HomeService
{
    //Получить 8 самых продаваемых продукта
    public function bestsallers()
    {
        return Product::orderByDesc('orders_count')->take(8)->get();
    }

    // Получение категорий и товаров для главной страницы
    public function getMainCategoriesProducts()
    {
        $categories = Category::orderByDesc('orders_count')->take(3)->get();

        $data = $categories->map(function ($category) {
            return [
                'category' => $category->name,
                'category_slug' => $category->slug,
                'products' => $category->products()
                    ->orderByDesc('orders_count')
                    ->take(4)
                    ->get(),
            ];
        });

        return $data;
    }
}
