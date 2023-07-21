<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\CategoryController;
use App\Http\Controllers\Controller;
use App\Http\Requests\CategoryRequest;
use App\Models\Category;
use App\Services\CategoryService;

class ApiCategoryController extends Controller
{
    private $categoryService;

    public function __construct(CategoryService $categoryService)
    {
        $this->categoryService = $categoryService;
    }

    public function index()
    {
        return $this->handleServiceCall(function () {
            return $this->categoryService->index();
        });
    }

    // Получение всех товаров по category_id
    public function getProductsByCategoryId($id)
    {
        return $this->handleServiceCall(function () use ($id) {
            return $this->categoryService->getProductsByCategoryId($id);
        });
    }

    // Получение всех товаров по slug
    public function getProductsBySlug($slug)
    {
        return $this->handleServiceCall(function () use ($slug) {
            return $this->categoryService->getProductsBySlug($slug);
        });
    }

    // Создание категории
    public function store(CategoryRequest $request)
    {
        return $this->handleServiceCall(function () use ($request) {
            return $this->categoryService->store($request);
        });
    }

    // Изменение категории
    public function update(CategoryRequest $request, Category $category)
    {
        return $this->handleServiceCall(function () use ($request, $category) {
            return $this->categoryService->update($request, $category);
        });
    }

    // Удаление категории
    public function destroy(Category $category)
    {
        return $this->handleServiceCall(function () use ($category) {
            return $this->categoryService->destroy($category);
        });
    }
}
