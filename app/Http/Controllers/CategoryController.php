<?php

namespace App\Http\Controllers;

use App\Http\Requests\CategoryRequest;
use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class CategoryController extends Controller
{
    public function index()
    {
        return [
            'message' => Category::all(),
            'code' => 200
        ];
    }

    // Получение всех товаров по category_id
    public function getProductsByCategoryId($id)
    {
        $category = Category::find($id);

        if (!$category) {
            return [
                'error' => 'Category not found',
                'code' => 404
            ];
        }

        return [
            'message' => $category->products,
            'code' => 200
        ];
    }

    // Получение всех товаров по slug
    public function getProductsBySlug($slug)
    {
        $category = Category::where('slug', $slug)->first();

        if (!$category) {
            return [
                'error' => 'Category not found',
                'code' => 404
            ];
        }

        return [
            'message' => $category->products,
            'code' => 200
        ];
    }

    // Создание категории
    public function store(CategoryRequest $request)
    {
        if (Category::where('name', $request->name)->count() > 0) {
            return [
                'error' => 'Category with this name already exists',
                'code' => 405
            ];
        }

        $category = Category::create([
            'name' => $request->name,
            'slug' => Str::slug($request->name)
        ]);

        return [
            'message' => 'Category ' . $category->name . ' created',
            'code' => 200
        ];
    }

    // Изменение категории
    public function update(CategoryRequest $request, Category $category)
    {
        $category->update([
            'name' => $request->name,
            'slug' => Str::slug($request->name)
        ]);

        return [
            'message' => 'Category ' . $category->name . ' updated',
            'code' => 200
        ];
    }

    // Удаление категории
    public function destroy(Category $category)
    {
        $category->delete();

        return [
            'message' => 'Category ' . $category->name . ' was deleted',
            'code' => 200
        ];
    }
}
