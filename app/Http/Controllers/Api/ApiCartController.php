<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Cart;
use App\Models\Product;
use App\Models\User;
use App\Services\CartService;
use Illuminate\Http\Request;
use Symfony\Component\HttpKernel\Exception\HttpException;

class ApiCartController extends Controller
{
    private $cartService;

    public function __construct(CartService $cartService)
    {
        $this->cartService = $cartService;
    }

    public function index()
    {
        return $this->handleServiceCall(function () {
            return $this->cartService->index();
        });
    }

    public function store(Product $product)
    {
        return $this->handleServiceCall(function () use ($product) {
            return $this->cartService->store($product);
        });
    }

    public function increase(Product $product)
    {
        return $this->handleServiceCall(function () use ($product) {
            return $this->cartService->increase($product);
        });
    }
    public function decrease(Product $product)
    {
        return $this->handleServiceCall(function () use ($product) {
            return $this->cartService->decrease($product);
        });
    }

    public function update(Request $request, Product $product)
    {
        return $this->handleServiceCall(function () use ($request, $product) {
            return $this->cartService->update($request, $product);
        });
    }

    public function destroy(Product $product)
    {
        return $this->handleServiceCall(function () use ($product) {
            return $this->cartService->destroy($product);
        });
    }
}
