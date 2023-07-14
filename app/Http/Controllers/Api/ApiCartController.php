<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\CartRequest;
use App\Models\Cart;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\ValidationException;

class ApiCartController extends Controller
{
    public function index()
    {
        $user = User::find(Auth::id());

        return response()->json([
            'cart' => $user->cart
        ], 200);
    }

    public function store($id)
    {
        $user = User::find(Auth::id());
        $cart = $user->cart()->where('product_id', $id)->first();
        if ($cart) {
            throw ValidationException::withMessages([
                'message' => "This product is already in cart"
            ]);
        }

        Cart::create([
            'user_id' => Auth::id(),
            'product_id' => $id
        ]);

        return response()->json(['message' => 'Product added to cart successfully'], 200);
    }

    public function increase($id)
    {
        $user = User::find(Auth::id());
        $cart = $user->cart()->where('product_id', $id)->first();

        if (!$cart) {
            throw ValidationException::withMessages([
                'message' => "There is no product with this id in the cart"
            ]);
        }

        if ($cart->quantity > 99) {
            throw ValidationException::withMessages([
                'message' => "Quantity can't be more than 99"
            ]);
        }

        $cart->update([
            'quantity' => $cart->quantity + 1
        ]);

        return response()->json(['message' => 'Product quantity increased successfully'], 200);
    }
    public function decrease($id)
    {
        $user = User::find(Auth::id());
        $cart = $user->cart()->where('product_id', $id)->first();

        if (!$cart) {
            throw ValidationException::withMessages([
                'message' => "There is no product with this id in the cart"
            ]);
        }

        if ($cart->quantity <= 1) {
            throw ValidationException::withMessages([
                'message' => "Quantity can't be less than 1"
            ]);
        }
        $cart->update([
            'quantity' => $cart->quantity - 1
        ]);

        return response()->json(['message' => 'Product quantity decreased successfully'], 200);
    }

    public function update(CartRequest $request)
    {
        $request->validate([
            'quantity' => 'required|integer|min:1',
        ]);

        $user = User::find(Auth::id());
        $cart = $user->cart()->where('product_id', $request->product_id)->first();

        if (!$cart) {
            return response()->json(['message' => 'Cart item not found'], 404);
        }

        $cart->update($request->only(['quantity']));
        return response()->json(['message' => 'Cart updated successfully'], 200);
    }

    public function destroy($id)
    {
        $user = User::find(Auth::id());
        $cart = $user->cart()->where('product_id', $id)->first();

        if (!$cart) {
            return response()->json(['message' => 'Cart item not found'], 404);
        }

        $cart->delete();
        return response()->json(['message' => 'Product removed from cart successfully'], 200);
    }
}
