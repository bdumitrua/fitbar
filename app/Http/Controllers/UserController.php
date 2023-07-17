<?php

namespace App\Http\Controllers;

use App\Http\Requests\UserRequest;
use App\Models\User;
use Illuminate\Support\Facades\Auth;

class UserController extends Controller
{
    public function me()
    {
        return [
            'message' => User::find(Auth::id())->load('roles', 'orders', 'reviews', 'addresses', 'cart'),
            'code' => 200
        ];
    }

    public function update(UserRequest $request)
    {
        $user = User::find(Auth::id());
        if (User::where('email', $request->email)->count() > 0 && $user->email != $request->email) {
            return [
                'error' => 'Данная почта уже занята другим пользователем.',
                'code' => 421
            ];
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
        return [
            'error' => $user,
            'code' => 200
        ];
    }
}
