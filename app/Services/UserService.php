<?php

namespace App\Services;

use App\Helpers\FileHelper;
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

        $path = null;
        $folder = 'profiles';
        if ($request->hasFile('photo')) {
            $path = FileHelper::saveImage($request->file('photo'), $folder);
        }

        $user->update([
            'name' => $request->name ?? $user->name,
            'email' => $user->email,
            'phone' => $request->phone ?? $user->phone,
            'photo' => $path ?? $user->photo,
            'date_of_birth' => $request->date_of_birth ?? $user->date_of_birth
        ]);
    }
}
