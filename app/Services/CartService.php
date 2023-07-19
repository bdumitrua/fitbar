<?php

namespace App\Services;

use App\Models\Cart;
use App\Models\Product;
use App\Models\User;
use Error;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\ValidationException;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpKernel\Exception\HttpException;

class CartService
{
    public function index()
    {
        $user = User::find(Auth::id());

        return $user->cart;
    }

    public function store(Product $product)
    {
        $cart = $this->productInCart($product);

        if ($cart) {
            throw new HttpException(Response::HTTP_BAD_REQUEST, 'This product is already in cart');
        }

        Cart::create([
            'user_id' => Auth::id(),
            'product_id' => $product->id
        ]);
    }

    public function increase(Product $product)
    {
        $cart = $this->productInCart($product);

        if (!$cart) {
            throw new HttpException(Response::HTTP_NOT_FOUND, 'There is no product with this id in the cart');
        }

        if ($cart->quantity > 99) {
            throw new HttpException(Response::HTTP_BAD_REQUEST, "Quantity can't be more than 99");
        }

        $cart->update([
            'quantity' => $cart->quantity + 1
        ]);
    }
    public function decrease(Product $product)
    {
        $cart = $this->productInCart($product);

        if (!$cart) {
            throw new HttpException(Response::HTTP_NOT_FOUND, 'There is no product with this id in the cart');
        }

        if ($cart->quantity > 99) {
            throw new HttpException(Response::HTTP_BAD_REQUEST, "Quantity can't be less than 1");
        }

        $cart->update([
            'quantity' => $cart->quantity - 1
        ]);
    }

    public function update(Request $request, Product $product)
    {
        $request->validate([
            'quantity' => 'required|integer|min:1',
        ]);

        $cart = $this->productInCart($product);

        if (!$cart) {
            throw new HttpException(Response::HTTP_NOT_FOUND, 'There is no product with this id in the cart');
        }

        $cart->update([
            'quantity' => $request->quantity,
            'product_id' => $product->id
        ]);
    }

    public function destroy(Product $product)
    {
        $cart = $this->productInCart($product);

        if (!$cart) {
            throw new HttpException(Response::HTTP_NOT_FOUND, 'There is no product with this id in the cart');
        }

        $cart->delete();
    }

    private function productInCart(Product $product)
    {
        $user = User::find(Auth::id());
        return $user->cart()->where('product_id', $product->id)->first();
    }
}
