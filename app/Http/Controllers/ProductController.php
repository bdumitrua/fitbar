<?php

namespace App\Http\Controllers;

use App\Helpers\FileHelper;
use App\Http\Requests\ProductRequest;
use App\Models\Product;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    /**
     * Получить все продукты
     */
    public function index()
    {
        return [
            'message' => Product::all(),
            'code' => 200
        ];
    }

    /**
     * Получить продукт (по id)
     */
    public function show(Product $product)
    {
        return [
            'message' => $product,
            'code' => 200
        ];
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

        return [
            'message' => $similarProducts,
            'code' => 200
        ];
    }

    /**
     * Создать продукт
     */
    public function store(ProductRequest $request)
    {
        $path = FileHelper::saveImageFromUrl($request->image, 'products');

        if (Product::where('name', $request->name)->exists()) {
            return [
                'error' => 'Product with this name already exists',
                'code' => 405
            ];
        }

        $product = Product::create([
            'image' => $path,
            'name' => $request->name,
            'price' => $request->price,
            'short_description' => $request->short_description,
            'long_description' => $request->long_description,
            'category_id' => $request->category_id,
        ]);

        return [
            'message' => $product,
            'code' => 200
        ];
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

        return [
            'message' => $product,
            'code' => 200
        ];
    }

    /**
     * Удалить продукт
     */
    public function destroy(Product $product)
    {
        $product->delete();

        return [
            'message' => 'Product deleted',
            'code' => 200
        ];
    }
}
