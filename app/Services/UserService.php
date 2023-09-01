<?php

namespace App\Services;

use App\Http\Requests\UserRequest;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpKernel\Exception\HttpException;

class UserService
{
    public function me()
    {
        return User::find(Auth::id())->load('roles', 'orders', 'reviews', 'addresses', 'cart');
    }

    public function update(UserRequest $request)
    {
        $user = User::find(Auth::id());
        if (User::where('email', $request->email)->count() > 0 && $user->email != $request->email) {
            throw new HttpException(Response::HTTP_CONFLICT, 'This email is taken');
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
    }
}