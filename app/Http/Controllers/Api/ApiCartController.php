<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\CartController;
use App\Models\Cart;
use App\Models\Product;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\ValidationException;

class ApiCartController extends CartController
{
    public function index()
    {
        $response = parent::index();

        return parent::MainResponseToJSON($response);
    }

    public function store(Product $product)
    {
        $response = parent::store($product);

        return parent::MainResponseToJSON($response);
    }

    public function increase(Product $product)
    {
        $response = parent::increase($product);

        return parent::MainResponseToJSON($response);
    }
    public function decrease(Product $product)
    {
        $response = parent::decrease($product);

        return parent::MainResponseToJSON($response);
    }

    public function update(Request $request, Product $product)
    {
        $response = parent::update($request, $product);

        return parent::MainResponseToJSON($response);
    }

    public function destroy(Product $product)
    {
        $response = parent::destroy($product);

        return parent::MainResponseToJSON($response);
    }
}
