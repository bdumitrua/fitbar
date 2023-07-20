<?php

namespace App\Services;

use App\Http\Requests\CategoryRequest;
use App\Models\Category;
use Illuminate\Support\Str;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpKernel\Exception\HttpException;

class CategoryService
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
            throw new HttpException(Response::HTTP_NOT_FOUND, 'Category not found');
        }

        return $category->products;
    }

    // Получение всех товаров по slug
    public function getProductsBySlug($slug)
    {
        $category = Category::where('slug', $slug)->first();

        if (!$category) {
            throw new HttpException(Response::HTTP_NOT_FOUND, 'Category not found');
        }

        return $category->products;
    }

    // Создание категории
    public function store(CategoryRequest $request)
    {
        if (Category::where('name', $request->name)->count() > 0) {
            throw new HttpException(Response::HTTP_CONFLICT, 'Category with this name already exists');
        }

        Category::create([
            'name' => $request->name,
            'slug' => Str::slug($request->name)
        ]);
    }

    // Изменение категории
    public function update(CategoryRequest $request, Category $category)
    {
        $category->update([
            'name' => $request->name,
            'slug' => Str::slug($request->name)
        ]);
    }

    // Удаление категории
    public function destroy(Category $category)
    {
        $category->delete();
    }
}
