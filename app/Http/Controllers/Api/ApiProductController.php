<?php

namespace App\Http\Controllers\Api;

use App\Helpers\FileHelper;
use App\Http\Controllers\ProductController;
use App\Http\Requests\ProductRequest;
use App\Models\Product;

class ApiProductController extends ProductController
{
    /**
     * Получить все продукты
     */
    public function index()
    {
        $response = parent::index();

        return parent::MainResponseToJSON($response);
    }

    /**
     * Получить продукт (по id)
     */
    public function show(Product $product)
    {
        $response = parent::show($product);

        return parent::MainResponseToJSON($response);
    }

    /**
     * Получить похожие продукты (продукты той-же категории с небольшим отличием по цене (+-30%))
     */
    public function similar(Product $product)
    {
        $response = parent::similar($product);

        return parent::MainResponseToJSON($response);
    }

    /**
     * Создать продукт
     */
    public function store(ProductRequest $request)
    {
        $response = parent::store($request);

        return parent::MainResponseToJSON($response);
    }

    /**
     * Изменить продукт по id
     */
    public function update(ProductRequest $request, Product $product)
    {
        $response = parent::update($request, $product);

        return parent::MainResponseToJSON($response);
    }

    /**
     * Удалить продукт
     */
    public function destroy(Product $product)
    {
        $response = parent::destroy($product);

        return parent::MainResponseToJSON($response);
    }
}
