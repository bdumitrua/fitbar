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
        $user = User::find(Auth::id());
        $user->role = $user->getMaxRoleAttribute() ?? 1;

        return $user;
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
            'date_of_birth' => $request->birth
        ]);
    }
}
