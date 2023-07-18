<?php

namespace App\Http\Controllers;

use App\Models\Cart;
use App\Models\Product;
use App\Models\User;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\ValidationException;

class CartController extends Controller
{
    public function index()
    {
        $user = User::find(Auth::id());

        return [
            'message' => $user->cart,
            'code' => 200
        ];
    }

    public function store(Product $product)
    {
        $cart = $this->productInCart($product);

        if ($cart) {
            return [
                'error' => "This product is already in cart",
                'code' => 405
            ];
        }

        Cart::create([
            'user_id' => Auth::id(),
            'product_id' => $product->id
        ]);

        return [
            'message' => 'Product added to cart successfully',
            'code' => 200
        ];
    }

    public function increase(Product $product)
    {
        $cart = $this->productInCart($product);

        if (!$cart) {
            return [
                'error' => "There is no product with this id in the cart",
                'code' => 405
            ];
        }

        if ($cart->quantity > 99) {
            return [
                'error' => "Quantity can't be more than 99",
                'code' => 405
            ];
        }

        $cart->update([
            'quantity' => $cart->quantity + 1
        ]);

        return [
            'message' => 'Product quantity increased successfully',
            'code' => 200
        ];
    }
    public function decrease(Product $product)
    {
        $cart = $this->productInCart($product);

        if (!$cart) {
            return [
                'error' => "There is no product with this id in the cart",
                'code' => 405
            ];
        }

        if ($cart->quantity <= 1) {
            return [
                'error' => "Quantity can't be less than 1",
                'code' => 405
            ];
        }

        $cart->update([
            'quantity' => $cart->quantity - 1
        ]);

        return [
            'message' => 'Product quantity decreased successfully',
            'code' => 200
        ];
    }

    public function update(Request $request, Product $product)
    {
        $request->validate([
            'quantity' => 'required|integer|min:1',
        ]);

        $cart = $this->productInCart($product);

        if (!$cart) {
            return [
                'error' => "Cart item not found",
                'code' => 404
            ];
        }

        $cart->update([
            'quantity' => $request->quantity,
            'product_id' => $product->id
        ]);

        return [
            'message' => 'Cart updated successfully',
            'code' => 200
        ];
    }

    public function destroy(Product $product)
    {
        $cart = $this->productInCart($product);

        if (!$cart) {
            return [
                'error' => "Cart item not found",
                'code' => 404
            ];
        }

        $cart->delete();

        return [
            'message' => 'Product removed from cart successfully',
            'code' => 200
        ];
    }

    protected function productInCart(Product $product)
    {
        $user = User::find(Auth::id());
        return $user->cart()->where('product_id', $product->id)->first();
    }
}
