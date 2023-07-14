<?php

namespace App\Http\Controllers\Api;

use App\Helpers\FileHelper;
use App\Http\Controllers\Controller;
use App\Http\Requests\ProductRequest;
use App\Models\Product;

class ApiProductController extends Controller
{
    /**
     * Получить все продукты
     */
    public function index()
    {
        $products = Product::all();
        return response()->json($products, 200);
    }

    /**
     * Получить продукт (по id)
     */
    public function show($id)
    {
        $product = Product::find($id);

        if (!$product) {
            return response()->json([
                'message' => 'Product not found'
            ], 404);
        }

        return response()->json($product, 200);
    }

    /**
     * Получить похожие продукты (продукты той-же категории с небольшим отличием по цене (+-30%))
     */
    public function similar($id)
    {
        $product = Product::find($id);

        if (!$product) {
            return response()->json([
                'message' => 'Product not found'
            ], 404);
        }

        $lowerBound = $product->price * 0.7;
        $upperBound = $product->price * 1.3;

        $similarProducts = Product::where('category_id', $product->category_id)
            ->whereBetween('price', [$lowerBound, $upperBound])
            ->where('id', '!=', $product->id)
            ->get();

        return response()->json($similarProducts, 200);
    }

    /**
     * Создать продукт
     */
    public function store(ProductRequest $request)
    {
        $path = FileHelper::saveImageFromUrl($request->image, 'products');

        $product = Product::create([
            'image' => $path,
            'name' => $request->name,
            'price' => $request->price,
            'short_description' => $request->short_description,
            'long_description' => $request->long_description,
            'category_id' => $request->category_id,
        ]);

        return response()->json($product, 200);
    }

    /**
     * Изменить продукт по id
     */
    public function update(ProductRequest $request, $id)
    {
        $product = Product::find($id);

        $path = '';
        if ($request->hasFile('image')) {
            $path = FileHelper::saveImageFromUrl($request->image, 'products');
        } else {
            $path = $product->image;
        }

        if (!$product) {
            return response()->json([
                'message' => 'Product not found'
            ], 404);
        }

        $product->update([
            'image' => $path,
            'name' => $request->name,
            'price' => $request->price,
            'short_description' => $request->short_description,
            'long_description' => $request->long_description,
            'category_id' => $request->category_id
        ]);

        return response()->json($product, 200);
    }

    /**
     * Удалить продукт
     */
    public function destroy($id)
    {
        $product = Product::find($id);

        if (!$product) {
            return response()->json([
                'message' => 'Product not found'
            ], 404);
        }

        $product->delete();

        return response()->json([
            'message' => 'Product deleted'
        ], 200);
    }
}
