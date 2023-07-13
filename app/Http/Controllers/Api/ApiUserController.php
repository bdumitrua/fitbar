<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\UserRequest;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\ValidationException;

class ApiUserController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:api');
    }

    public function getme()
    {
        return User::find(Auth::id())->load('roles', 'orders', 'reviews', 'addresses', 'cart');
    }

    public function update(UserRequest $request)
    {
        $user = User::find(Auth::id());
        if (User::where('email', $request->email)->count() > 0 && $user->email != $request->email) {
            throw ValidationException::withMessages([
                'Данная почта уже занята другим пользователем.'
            ], 421);
        }

        $path = '';
        // загрузка фото, если оно предоставлено
        if ($request->hasFile('photo')) {
            $path = $request->file('photo')->store('profiles', 'public');
        }

        $user->update([
            'name' => $request->name,
            'email' => $request->email,
            'phone' => $request->phone,
            'photo' => $path,
        ]);

        // возвращаем обновленного пользователя
        return response()->json([
            'status' => 'success',
            'user' => $user
        ]);
    }
}
