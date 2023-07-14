<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\CategoryRequest;
use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class ApiCategoryController extends Controller
{
    public function index()
    {
        return Category::all();
    }

    // Получение всех товаров по category_id
    public function getProductsByCategoryId($id)
    {
        $category = Category::find($id);

        if (!$category) {
            return response()->json(['message' => 'Category not found'], 404);
        }

        $products = $category->products;

        return response()->json(['products' => $products], 200);
    }

    // Получение всех товаров по slug
    public function getProductsBySlug($slug)
    {
        $category = Category::where('slug', $slug)->first();

        if (!$category) {
            return response()->json(['message' => 'Category not found'], 404);
        }

        $products = $category->products;

        return response()->json(['products' => $products], 200);
    }

    // Создание категории
    public function store(CategoryRequest $request)
    {
        $category = Category::create([
            'name' => $request->name,
            'slug' => Str::slug($request->name)
        ]);

        return response()->json(['category created: ' => $category], 201);
    }

    public function update(CategoryRequest $request, $id)
    {
        $category = Category::find($id);

        if (!$category) {
            return response()->json(['message' => 'Category not found'], 404);
        }

        $category->update([
            'name' => $request->name,
            'slug' => Str::slug($request->name)
        ]);

        return response()->json(['category updated: ' => $category], 200);
    }

    // Удаление категории
    public function destroy($id)
    {
        $category = Category::find($id);

        if (!$category) {
            return response()->json(['message' => 'Category not found'], 404);
        }

        $category->delete();

        return response()->json(null, 204);
    }
}
