<?php

namespace App\Http\Controllers\Api;

use App\Helpers\FileHelper;
use App\Http\Controllers\Controller;
use App\Http\Controllers\ProductController;
use App\Http\Requests\ProductRequest;
use App\Models\Product;
use App\Services\ProductService;
use Illuminate\Http\Request;

class ApiProductController extends Controller
{
    private $productService;

    public function __construct(ProductService $productService)
    {
        $this->productService = $productService;
    }

    public function index()
    {
        return $this->handleServiceCall(function () {
            return $this->productService->index();
        });
    }

    public function search(Request $request)
    {
        return $this->handleServiceCall(function () use ($request) {
            return $this->productService->search($request);
        });
    }

    public function show(Product $product)
    {
        return $this->handleServiceCall(function () use ($product) {
            return $this->productService->show($product);
        });
    }

    /**
     * Получить похожие продукты (продукты той-же категории с небольшим отличием по цене (+-30%))
     */
    public function similar(Product $product)
    {
        return $this->handleServiceCall(function () use ($product) {
            return $this->productService->similar($product);
        });
    }
    public function store(ProductRequest $request)
    {
        return $this->handleServiceCall(function () use ($request) {
            return $this->productService->store($request);
        });
    }

    public function update(ProductRequest $request, Product $product)
    {
        return $this->handleServiceCall(function () use ($request, $product) {
            return $this->productService->update($request, $product);
        });
    }

    public function destroy(Product $product)
    {
        return $this->handleServiceCall(function () use ($product) {
            return $this->productService->destroy($product);
        });
    }
}
