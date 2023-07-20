<?php

namespace App\Services;

use App\Helpers\FileHelper;
use App\Http\Requests\ProductRequest;
use App\Models\Product;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpKernel\Exception\HttpException;

class ProductService
{
    /**
     * Получить все продукты
     */
    public function index()
    {
        return Product::all();
    }

    /**
     * Получить все бестсейллеры
     */
    public function bestsallers()
    {
        return Product::orderByDesc('orders_count')->take(8)->get();
    }

    /**
     * Получить продукт (по id)
     */
    public function show(Product $product)
    {
        return $product;
    }

    /**
     * Получить похожие продукты (продукты той-же категории с небольшим отличием по цене (+-30%))
     */
    public function similar(Product $product)
    {
        $lowerBound = $product->price * 0.7;
        $upperBound = $product->price * 1.3;

        $similarProducts = Product::where('category_id', $product->category_id)
            ->whereBetween('price', [$lowerBound, $upperBound])
            ->where('id', '!=', $product->id)
            ->get();

        return $similarProducts;
    }

    /**
     * Создать продукт
     */
    public function store(ProductRequest $request)
    {
        $path = FileHelper::saveImageFromUrl($request->image, 'products');

        if (Product::where('name', $request->name)->exists()) {
            throw new HttpException(Response::HTTP_CONFLICT, 'Product with this name already exists');
        }

        Product::create([
            'image' => $path,
            'name' => $request->name,
            'price' => $request->price,
            'short_description' => $request->short_description,
            'long_description' => $request->long_description,
            'category_id' => $request->category_id,
        ]);
    }

    /**
     * Изменить продукт по id
     */
    public function update(ProductRequest $request, Product $product)
    {
        $path = '';
        if ($request->hasFile('image')) {
            $path = FileHelper::saveImageFromUrl($request->image, 'products');
        } else {
            $path = $product->image;
        }

        $product->update([
            'image' => $path,
            'name' => $request->name,
            'price' => $request->price,
            'short_description' => $request->short_description,
            'long_description' => $request->long_description,
            'category_id' => $request->category_id
        ]);
    }

    /**
     * Удалить продукт
     */
    public function destroy(Product $product)
    {
        $product->delete();
    }
}
