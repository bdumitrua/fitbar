<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\CategoryController;
use App\Http\Requests\CategoryRequest;
use App\Models\Category;

class ApiCategoryController extends CategoryController
{
    public function index()
    {
        $response = parent::index();

        return parent::MainResponseToJSON($response);
    }

    // Получение всех товаров по category_id
    public function getProductsByCategoryId($id)
    {
        $response = parent::getProductsByCategoryId($id);

        return parent::MainResponseToJSON($response);
    }

    // Получение всех товаров по slug
    public function getProductsBySlug($slug)
    {
        $response = parent::getProductsBySlug($slug);

        return parent::MainResponseToJSON($response);
    }

    // Создание категории
    public function store(CategoryRequest $request)
    {
        $response = parent::store($request);

        return parent::MainResponseToJSON($response);
    }

    // Изменение категории
    public function update(CategoryRequest $request, Category $category)
    {
        $response = parent::update($request, $category);

        return parent::MainResponseToJSON($response);
    }

    // Удаление категории
    public function destroy(Category $category)
    {
        $response = parent::destroy($category);

        return parent::MainResponseToJSON($response);
    }
}
